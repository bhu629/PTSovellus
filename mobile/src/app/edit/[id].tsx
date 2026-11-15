import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { colors, commonStyles } from "@/theme";
import AppButton from "@/components/AppButton";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Yhden kirjauksen muokkaus ja poisto.
// Kirjauksen nykyiset tiedot tulevat parametreina edelliseltä sivulta.
export default function EditLogScreen() {
  const params = useLocalSearchParams<{
    id: string;
    sets: string;
    reps: string;
    weight: string;
    comment: string;
    name: string;
  }>();
  const [sets, setSets] = useState(params.sets);
  const [weight, setWeight] = useState(params.weight);
  const [reps, setReps] = useState(params.reps);
  const [comment, setComment] = useState(params.comment);

  async function saveChanges() {
    await fetch(`${API_URL}/api/logs/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sets: Number(sets),
        weight: weight === "" ? null : Number(weight),
        reps: Number(reps),
        comment: comment,
      }),
    });
    router.back(); // takaisin edelliseen näkymään
  }

  async function deleteLog() {
    await fetch(`${API_URL}/api/logs/${params.id}`, { method: "DELETE" });
    router.back();
  }

  return (
    <View style={[commonStyles.container, styles.gap]}>
      <Text style={commonStyles.title}>{params.name}</Text>

      <Text style={commonStyles.mutedText}>Sarjat</Text>
      <TextInput style={[commonStyles.input, styles.input]} keyboardType="numeric" value={sets} onChangeText={setSets} />

      <Text style={commonStyles.mutedText}>Toistot</Text>
      <TextInput style={[commonStyles.input, styles.input]} keyboardType="numeric" value={reps} onChangeText={setReps} />

      <Text style={commonStyles.mutedText}>Paino (kg)</Text>
      <TextInput style={[commonStyles.input, styles.input]} keyboardType="numeric" value={weight} onChangeText={setWeight} />

      <Text style={commonStyles.mutedText}>Kommentti</Text>
      <TextInput style={[commonStyles.input, styles.input]} value={comment} onChangeText={setComment} multiline />

      <AppButton title="Tallenna muutokset" onPress={saveChanges} />
      <AppButton title="Poista kirjaus" onPress={deleteLog} color={colors.danger} />
    </View>
  );
}

const styles = StyleSheet.create({
  gap: {
    gap: 12, // väli kaikkien osien välissä
  },
  input: {
    flex: 0, // ei venytetä kenttää koko näytön korkuiseksi
  },
});
