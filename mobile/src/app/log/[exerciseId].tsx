import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useIsFocused, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { LogEntry } from "@/types";
import { getToday } from "@/date";
import { colors, commonStyles } from "@/theme";
import AppButton from "@/components/AppButton";
import DateSelector from "@/components/DateSelector";
import LogRow from "@/components/LogRow";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Kirjausnäkymä: syötetään sarjat, toistot, paino ja kommentti
export default function LogScreen() {
  const { exerciseId, name } = useLocalSearchParams<{ exerciseId: string; name: string }>();
  const [sets, setSets] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(getToday()); // päivä, jolle treeni kirjataan
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const isFocused = useIsFocused(); // true, kun tämä näkymä on näkyvissä

  // Haetaan kirjaukset kun näkymä tulee näkyviin (myös kun palataan muokkauksesta) tai päivä vaihtuu
  useEffect(() => {
    if (isFocused) {
      fetchLogs();
    }
  }, [isFocused, date]);

  // Haetaan valitun päivän kirjaukset ja otetaan mukaan vain tämän liikkeen kirjaukset
  async function fetchLogs() {
    const response = await fetch(`${API_URL}/api/logs?date=${date}`);
    const data: LogEntry[] = await response.json();
    setLogs(data.filter((log) => log.exerciseId === Number(exerciseId)));
  }

  async function saveLog() {
    if (sets === "" || reps === "") {
      Alert.alert("Sarjat ja toistot puuttuu");
      return;
    }

    await fetch(`${API_URL}/api/logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exerciseId: Number(exerciseId),
        sets: Number(sets),
        weight: weight === "" ? null : Number(weight), // tyhjä paino = kehonpainoliike
        reps: Number(reps),
        comment: comment,
        date: date,
      }),
    });

    // värähdys, kun kirjaus on tallennettu
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSets("");
    setReps("");
    setComment("");
    fetchLogs();
  }

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>{name}</Text>

      <DateSelector date={date} onChange={setDate} />

      <View style={styles.form}>
        <TextInput
          style={commonStyles.input}
          placeholder="Sarjat"
          placeholderTextColor={colors.textMuted}
          keyboardType="numeric"
          value={sets}
          onChangeText={setSets}
        />
        <TextInput
          style={commonStyles.input}
          placeholder="Toistot"
          placeholderTextColor={colors.textMuted}
          keyboardType="numeric"
          value={reps}
          onChangeText={setReps}
        />
        <TextInput
          style={commonStyles.input}
          placeholder="Paino (kg)"
          placeholderTextColor={colors.textMuted}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>
      <TextInput
        style={[commonStyles.input, styles.comment]}
        placeholder="Kommentti (vapaaehtoinen)"
        placeholderTextColor={colors.textMuted}
        value={comment}
        onChangeText={setComment}
        multiline // kommentti voi olla usean rivin mittainen
      />
      <AppButton title="Tallenna" onPress={saveLog} />

      <Text style={commonStyles.subtitle}>Päivän kirjaukset</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={commonStyles.list}
        ListEmptyComponent={<Text style={commonStyles.mutedText}>Ei vielä kirjauksia</Text>}
        renderItem={({ item, index }) => <LogRow log={item} label={`${index + 1}.`} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  comment: {
    flex: 0, 
    marginBottom: 12,
  },
  form: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
});
