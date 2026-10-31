import { Program } from "./types";

export const programs: Program[] = [
  {
    id: 1,
    name: "Full body",
    description: "Koko kehon treeni kolmesti viikossa. Sopii aloittelijalle.",
    level: "aloittelija",
    daysPerWeek: 3,
    days: [
      {
        id: 1,
        name: "Full body",
        exercises: [
          { id: 1, name: "Kyykky / Hack squat", sets: 3, reps: "5-8" },
          { id: 2, name: "Penkkipunnerrus", sets: 3, reps: "5-8" },
          { id: 3, name: "Vinopenkki Smith-laitteessa", sets: 3, reps: "8-10" },
          { id: 4, name: "Ylätalja", sets: 3, reps: "8-12" },
          { id: 5, name: "Romanialainen maastaveto", sets: 3, reps: "8-10" },
          { id: 6, name: "Lankku", sets: 3, reps: "30-45 s" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Ylä/Ala",
    description: "Ylä- ja alakroppa omina päivinään, neljä kertaa viikossa.",
    level: "keskitaso",
    daysPerWeek: 4,
    days: [
      {
        id: 2,
        name: "Yläkroppa",
        exercises: [
          { id: 7, name: "Penkkipunnerrus", sets: 4, reps: "6-8" },
          { id: 8, name: "Leuanveto", sets: 3, reps: "6-10" },
          { id: 9, name: "Pystypunnerrus", sets: 3, reps: "8-10" },
          { id: 10, name: "Kulmasoutu", sets: 3, reps: "8-10" },
          { id: 11, name: "Hauiskääntö käsipainoilla", sets: 3, reps: "10-12" },
          { id: 12, name: "Ojentajapunnerrus taljassa", sets: 3, reps: "10-12" },
        ],
      },
      {
        id: 3,
        name: "Alakroppa",
        exercises: [
          { id: 13, name: "Kyykky", sets: 4, reps: "6-8" },
          { id: 14, name: "Romanialainen maastaveto", sets: 3, reps: "8-10" },
          { id: 15, name: "Jalkaprässi", sets: 3, reps: "10-12" },
          { id: 16, name: "Bulgarialainen askelkyykky", sets: 3, reps: "8-10" },
          { id: 17, name: "Reiden koukistus", sets: 3, reps: "10-12" },
          { id: 18, name: "Pohjenousu", sets: 3, reps: "12-15" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Push/Pull/Legs",
    description: "Työntävät, vetävät ja jalat omina päivinään. Kierto toistetaan kahdesti viikossa.",
    level: "edistynyt",
    daysPerWeek: 6,
    days: [
      {
        id: 4,
        name: "Push",
        exercises: [
          { id: 19, name: "Penkkipunnerrus", sets: 4, reps: "5-6" },
          { id: 20, name: "Vinopenkkipunnerrus käsipainoilla", sets: 3, reps: "8-10" },
          { id: 21, name: "Pystypunnerrus", sets: 3, reps: "6-8" },
          { id: 22, name: "Vipunosto sivulle", sets: 4, reps: "12-15" },
          { id: 23, name: "Dipit", sets: 3, reps: "8-12" },
          { id: 24, name: "Ojentajapunnerrus taljassa", sets: 3, reps: "10-12" },
        ],
      },
      {
        id: 5,
        name: "Pull",
        exercises: [
          { id: 25, name: "Maastaveto", sets: 3, reps: "3-5" },
          { id: 26, name: "Painotettu leuanveto", sets: 4, reps: "6-8" },
          { id: 27, name: "Kulmasoutu", sets: 3, reps: "8-10" },
          { id: 28, name: "Alatalja", sets: 3, reps: "10-12" },
          { id: 29, name: "Face pull", sets: 3, reps: "12-15" },
          { id: 30, name: "Hauiskääntö tangolla", sets: 3, reps: "8-10" },
          { id: 31, name: "Vasarakääntö", sets: 3, reps: "10-12" },
        ],
      },
      {
        id: 6,
        name: "Legs",
        exercises: [
          { id: 32, name: "Kyykky", sets: 4, reps: "5-6" },
          { id: 33, name: "Romanialainen maastaveto", sets: 3, reps: "6-8" },
          { id: 34, name: "Jalkaprässi", sets: 3, reps: "10-12" },
          { id: 35, name: "Reiden ojennus", sets: 3, reps: "12-15" },
          { id: 36, name: "Reiden koukistus", sets: 3, reps: "10-12" },
          { id: 37, name: "Pohjenousu", sets: 4, reps: "10-15" },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Kotitreeni",
    description: "Kehonpainotreeni ilman välineitä. Sopii kotona tai matkoilla treenaamiseen.",
    level: "aloittelija",
    daysPerWeek: 3,
    days: [
      {
        id: 7,
        name: "Koko keho",
        exercises: [
          { id: 38, name: "Kehonpainokyykky", sets: 3, reps: "15-20" },
          { id: 39, name: "Punnerrus", sets: 3, reps: "8-15" },
          { id: 40, name: "Askelkyykky", sets: 3, reps: "10-12" },
          { id: 41, name: "Pöytäsoutu", sets: 3, reps: "8-12" },
          { id: 42, name: "Lantionnosto", sets: 3, reps: "15-20" },
          { id: 43, name: "Lankku", sets: 3, reps: "30-60 s" },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Voima 5x5",
    description: "Perusliikkeisiin keskittyvä voimaohjelma. Kaksi vuorottelevaa treeniä kolmesti viikossa.",
    level: "keskitaso",
    daysPerWeek: 3,
    days: [
      {
        id: 8,
        name: "Treeni A",
        exercises: [
          { id: 44, name: "Kyykky", sets: 5, reps: "5" },
          { id: 45, name: "Penkkipunnerrus", sets: 5, reps: "5" },
          { id: 46, name: "Kulmasoutu", sets: 5, reps: "5" },
          { id: 47, name: "Dipit", sets: 3, reps: "8-10" },
          { id: 48, name: "Vatsarutistus", sets: 3, reps: "12-15" },
        ],
      },
      {
        id: 9,
        name: "Treeni B",
        exercises: [
          { id: 49, name: "Kyykky", sets: 5, reps: "5" },
          { id: 50, name: "Pystypunnerrus", sets: 5, reps: "5" },
          { id: 51, name: "Maastaveto", sets: 1, reps: "5" },
          { id: 52, name: "Leuanveto", sets: 3, reps: "6-10" },
          { id: 53, name: "Hauiskääntö tangolla", sets: 3, reps: "8-10" },
        ],
      },
    ],
  },
];
