import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Program } from "@/types";
import { colors } from "@/theme";
import { getJson } from "@/api";

// Ohjelman sivu: näytetään treenipäivät ja niiden liikkeet
export default function ProgramScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProgram() {
      try {
        setProgram(await getJson<Program>(`/api/programs/${id}`));
      } catch {
        setError("Ohjelman haku epäonnistui");
      }
    }
    fetchProgram();
  }, [id]);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.description}>{error}</Text>
      </View>
    );
  }

  if (!program) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{program.name}</Text>
      <Text style={styles.description}>{program.description}</Text>

      {program.days.map((day) => (
        <View key={day.id} style={styles.day}>
          <Text style={styles.dayName}>{day.name}</Text>

          {day.exercises.map((exercise) => (
            // kun käyttäjä painaa liikettä, kirjaussivu aukeaa
            <Pressable
              key={exercise.id}
              style={styles.exercise}
              onPress={() =>
                router.push({
                  pathname: "/log/[exerciseId]",
                  params: { exerciseId: exercise.id, name: exercise.name },
                })
              }
            >
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.sets}>
                {exercise.sets} x {exercise.reps}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: 16,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    color: colors.text,
  },
  day: {
    marginTop: 24,
    gap: 8, 
  },
  dayName: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  exercise: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 14,
  },
  exerciseName: {
    color: colors.text,
    flex: 1,
  },
  sets: {
    color: colors.text,
    fontWeight: "bold",
  },
});
