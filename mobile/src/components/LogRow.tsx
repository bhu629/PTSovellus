import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { LogEntry } from "@/types";
import { colors } from "@/theme";

type Props = {
  log: LogEntry;
  label: string; // vasemmalla näkyvä teksti, esim. "1." tai liikkeen nimi
};

// Yksi kirjaus listassa. Painamalla avautuu muokkausnäkymä.
export default function LogRow({ log, label }: Props) {
  function openEdit() {
    router.push({
      pathname: "/edit/[id]",
      params: {
        id: log.id,
        sets: log.sets,
        reps: log.reps,
        weight: log.weight ?? "",
        comment: log.comment ?? "",
        name: log.exerciseName,
      },
    });
  }

  return (
    <Pressable style={styles.card} onPress={openEdit}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {log.sets} x {log.reps}, {log.weight ?? "-"} kg
        </Text>
      </View>

      {/* kommentti näytetään vain, jos sellainen on */}
      {log.comment && <Text style={styles.comment}>{log.comment}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: colors.text,
    flex: 1,
  },
  value: {
    color: colors.text,
    fontWeight: "bold",
  },
  comment: {
    color: colors.textMuted,
    fontStyle: "italic",
    marginTop: 6,
  },
});
