import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useIsFocused } from "expo-router";
import { Calendar } from "react-native-calendars";
import { LogEntry } from "@/types";
import { getToday, toFinnishDate } from "@/date";
import { calendarTheme, commonStyles } from "@/theme";
import LogRow from "@/components/LogRow";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Kalenteri: treenipäivät merkitään pisteellä, päivää painamalla näkyy sen päivän treeni
export default function CalendarScreen() {
  const [month, setMonth] = useState(getToday().slice(0, 7)); // "2026-11-11" -> "2026-11"
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [logs, setLogs] = useState<LogEntry[]>([]); // koko kuukauden kirjaukset
  const isFocused = useIsFocused(); // true, kun tämä välilehti on näkyvissä

  // Haetaan kuukauden kirjaukset, kun välilehti avataan tai kuukausi vaihtuu
  useEffect(() => {
    if (isFocused) {
      fetchLogs();
    }
  }, [isFocused, month]);

  async function fetchLogs() {
    const response = await fetch(`${API_URL}/api/logs?month=${month}`);
    const data = await response.json();
    setLogs(data);
  }

  // Merkitään kalenteriin päivät, joilla on treenattu
  const markedDates: any = {};
  for (const log of logs) {
    const date = log.createdAt.slice(0, 10); // "2026-11-11 18:30:00" -> "2026-11-11"
    markedDates[date] = { marked: true };
  }
  markedDates[selectedDate] = { selected: true }; // valittu päivä korostetaan

  // Valitun päivän kirjaukset
  const dayLogs = logs.filter((log) => log.createdAt.slice(0, 10) === selectedDate);

  return (
    <View style={commonStyles.container}>
      <Calendar
        style={{ borderRadius: 12 }}
        theme={calendarTheme}
        firstDay={1} // viikko alkaa maanantaista
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        onMonthChange={(day) => setMonth(day.dateString.slice(0, 7))}
      />

      <Text style={commonStyles.subtitle}>Treeni {toFinnishDate(selectedDate)}</Text>
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
