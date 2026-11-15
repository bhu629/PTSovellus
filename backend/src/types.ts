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

// Yksi kirjaus, esim. 3 sarjaa x 8 toistoa 80 kg:lla
export type LogEntry = {
    id: number;
    exerciseId: number;
    exerciseName: string;
    sets: number;
    weight: number | null; // null = koska voi olla kehonpainoliike
    reps: number;
    comment: string | null; // vapaaehtoinen kommentti
    createdAt: string; // muotoa "2026-11-11 18:30:00"
};
