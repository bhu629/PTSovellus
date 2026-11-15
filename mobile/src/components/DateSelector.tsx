import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { addDays, getToday, toFinnishDate } from "@/date";
import { calendarTheme, colors } from "@/theme";

type Props = {
  date: string; // valittu päivä, esim. "2026-11-11"
  onChange: (date: string) => void; // kutsutaan kun päivä vaihtuu
};

// Päivän valinta: nuolet edelliseen/seuraavaan päivään, päivämäärää painamalla aukeaa kalenteri
export default function DateSelector({ date, onChange }: Props) {
  const [showCalendar, setShowCalendar] = useState(false);
  const isToday = date === getToday();

  return (
    <View>
      <View style={styles.row}>
        <Pressable style={styles.arrow} onPress={() => onChange(addDays(date, -1))}>
          <Text style={styles.arrowText}>◀</Text>
        </Pressable>

        <Pressable onPress={() => setShowCalendar(!showCalendar)}>
          <Text style={styles.date}>{isToday ? "Tänään" : toFinnishDate(date)} 📅</Text>
        </Pressable>

        {/* tulevaisuuteen ei voi kirjata, joten nappi on pois käytöstä tänään */}
        <Pressable
          style={[styles.arrow, isToday && styles.disabled]}
          onPress={() => onChange(addDays(date, 1))}
          disabled={isToday}
        >
          <Text style={styles.arrowText}>▶</Text>
        </Pressable>
      </View>

      {showCalendar && (
        <Calendar
          style={styles.calendar}
          theme={calendarTheme}
          current={date}
          maxDate={getToday()} // tulevia päiviä ei voi valita
          firstDay={1} // viikko alkaa maanantaista
          markedDates={{ [date]: { selected: true } }}
          onDayPress={(day) => {
            onChange(day.dateString);
            setShowCalendar(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  arrow: {
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  disabled: {
    opacity: 0.3,
  },
  arrowText: {
    color: colors.primary,
    fontSize: 16,
  },
  date: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  calendar: {
    borderRadius: 12,
    marginBottom: 16,
  },
});
