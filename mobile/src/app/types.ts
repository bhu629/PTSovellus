export type Exercise = {
    id: number;
    name: string;
    sets: number;
    reps: string; // toistot tekstinä, koska voi olla esim "5-8"
};

export type WorkoutDay = {
    id: number;
    name: string;
    exercises: Exercise[]; // lista liikkeistä
};

export type Program = {
    id: number;
    name: string;
    description: string;
    level: "aloittelija" | "keskitaso" | "edistynyt";
    daysPerWeek: number;
    days: WorkoutDay[]; // lista treenipäiviä
};
