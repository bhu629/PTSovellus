// Muuttaa Date-olion tekstiksi muotoon "2026-11-11"
function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // tammikuu on 0, siksi + 1
  const day = String(date.getDate()).padStart(2, "0"); // "5" -> "05"
  return `${year}-${month}-${day}`;
}

// Palauttaa tämän päivän muodossa "2026-11-11"
export function getToday() {
  return formatDate(new Date());
}

// Lisää päiviä päivämäärään, esim. addDays("2026-11-11", -1) -> "2026-11-10"
export function addDays(dateString: string, days: number) {
  const date = new Date(dateString + "T12:00:00"); // keskipäivä, ettei aikavyöhyke siirrä päivää
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

// Muuttaa päivämäärän suomalaiseen muotoon näyttämistä varten, esim. "2026-11-11" -> "11.11.2026"
export function toFinnishDate(dateString: string) {
  const [year, month, day] = dateString.split("-"); // "2026-11-11" -> ["2026", "11", "11"]
  return `${day}.${month}.${year}`;
}
