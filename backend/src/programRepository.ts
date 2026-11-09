// Ohjelmien haku tietokannasta
import { db } from "./db";
import { Program, WorkoutDay } from "./types";

// Tietokannan rivit (sarakkeiden nimet kuten taulussa)
type ProgramRow = {
  id: number;
  name: string;
  description: string;
  level: Program["level"];
  days_per_week: number;
};

type ExerciseRow = {
  id: number;
  day_id: number;
  day_name: string;
  name: string;
  sets: number;
  reps: string;
};

function findProgramRow(programId: number): ProgramRow | undefined {
  return db.prepare("SELECT * FROM programs WHERE id = ?").get(programId) as ProgramRow | undefined;
}

function findExerciseRows(programId: number): ExerciseRow[] {
  return db.prepare("SELECT * FROM exercises WHERE program_id = ? ORDER BY id").all(programId) as ExerciseRow[];
}

// Ryhmitellään liikkeet treenipäivittäin
function groupExercisesByDay(exerciseRows: ExerciseRow[]): WorkoutDay[] {
  const days: WorkoutDay[] = [];

  for (const exerciseRow of exerciseRows) {
    let day = days.find((existingDay) => existingDay.id === exerciseRow.day_id);

    if (!day) {
      day = { id: exerciseRow.day_id, name: exerciseRow.day_name, exercises: [] };
      days.push(day);
    }

    day.exercises.push({
      id: exerciseRow.id,
      name: exerciseRow.name,
      sets: exerciseRow.sets,
      reps: exerciseRow.reps,
    });
  }

  return days;
}

export function getProgramById(programId: number): Program | undefined {
  const programRow = findProgramRow(programId);
  if (!programRow) return undefined;

  return {
    id: programRow.id,
    name: programRow.name,
    description: programRow.description,
    level: programRow.level,
    daysPerWeek: programRow.days_per_week,
    days: groupExercisesByDay(findExerciseRows(programId)),
  };
}

export function getAllPrograms(): Program[] {
  const programIds = db.prepare("SELECT id FROM programs ORDER BY id").all() as { id: number }[];
  return programIds.map(({ id }) => getProgramById(id)!);
}
