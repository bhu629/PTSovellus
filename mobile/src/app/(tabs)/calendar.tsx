import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "expo-router";
import { Calendar } from "react-native-calendars";
import { LogEntry } from "@/types";
import { getToday, toFinnishDate } from "@/date";
import { calendarTheme, commonStyles } from "@/theme";
import LogRow from "@/components/LogRow";
import { getJson } from "@/api";


export default function CalendarScreen() {
  const [month, setMonth] = useState(getToday().slice(0, 7)); // "2026-11-11" -> "2026-11"
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [logs, setLogs] = useState<LogEntry[]>([]); // koko kuukauden kirjaukset
  const [error, setError] = useState<string | null>(null);
  const isFocused = useIsFocused(); // true, kun tämä välilehti on näkyvissä

  // Haetaan kuukauden kirjaukset, kun välilehti avataan tai kuukausi vaihtuu
  useEffect(() => {
    async function fetchLogs() {
      try {
        setLogs(await getJson<LogEntry[]>(`/api/logs?month=${month}`));
        setError(null);
      } catch {
        setError("Kirjausten haku epäonnistui");
      }
    }

    if (isFocused) {
      fetchLogs();
    }
  }, [isFocused, month]);

  // Merkitään kalenteriin päivät, joilla on treenattu
  const markedDates: Record<string, { marked?: boolean; selected?: boolean }> = {};
  for (const log of logs) {
    const date = log.createdAt.slice(0, 10); // "2026-11-11 18:30:00" -> "2026-11-11"
    markedDates[date] = { marked: true };
  }
  // valittu päivä näkyy eri värillä, mutta treenipiste jää näkyviin
  markedDates[selectedDate] = { ...markedDates[selectedDate], selected: true };

  // Valitun päivän kirjaukset
  const dayLogs = logs.filter((log) => log.createdAt.slice(0, 10) === selectedDate);

  return (
    <View style={commonStyles.container}>
      <Calendar
        style={styles.calendar}
        theme={calendarTheme}
        firstDay={1} // viikko alkaa maanantaista
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        onMonthChange={(day) => setMonth(day.dateString.slice(0, 7))}
      />

      <Text style={commonStyles.subtitle}>Treeni {toFinnishDate(selectedDate)}</Text>
      {error && <Text style={commonStyles.errorText}>{error}</Text>}
      <FlatList
        data={dayLogs}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={commonStyles.list}
        ListEmptyComponent={<Text style={commonStyles.mutedText}>Ei treeniä tänä päivänä</Text>}
        renderItem={({ item }) => <LogRow log={item} label={item.exerciseName} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 12,
  },
});
