import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { colors, commonStyles } from "@/theme";
import AppButton from "@/components/AppButton";
import { sendData } from "@/api";

// Sivu ei hae kirjausta backendista. Kirjauksen vanhat tiedot tulevat parametreina
// siltä sivulta, jossa käyttäjä painoi kirjausta (kalenteri tai kirjaussivu).
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
    if (sets === "" || reps === "") {
      Alert.alert("Sarjat ja toistot puuttuu");
      return;
    }

    const error = await sendData(`/api/logs/${params.id}`, "PUT", {
      sets: Number(sets),
      weight: weight === "" ? null : Number(weight), // tyhjä paino = kehonpainoliike
      reps: Number(reps),
      comment,
    });

    if (error) {
      Alert.alert("Tallennus epäonnistui", error);
      return;
    }
    router.back(); // takaisin edelliseen näkymään
  }

  async function deleteLog() {
    const error = await sendData(`/api/logs/${params.id}`, "DELETE");

    if (error) {
      Alert.alert("Poisto epäonnistui", error);
      return;
    }
    router.back();
  }

  return (
    <View style={[commonStyles.container, styles.gap]}>
      <Text style={commonStyles.title}>{params.name}</Text>

      <Text style={commonStyles.mutedText}>Sarjat</Text>
      <TextInput style={commonStyles.input} keyboardType="numeric" value={sets} onChangeText={setSets} />

      <Text style={commonStyles.mutedText}>Toistot</Text>
      <TextInput style={commonStyles.input} keyboardType="numeric" value={reps} onChangeText={setReps} />

      <Text style={commonStyles.mutedText}>Paino (kg)</Text>
      <TextInput style={commonStyles.input} keyboardType="numeric" value={weight} onChangeText={setWeight} />

      <Text style={commonStyles.mutedText}>Kommentti</Text>
      <TextInput style={commonStyles.input} value={comment} onChangeText={setComment} multiline />

      <AppButton title="Tallenna muutokset" onPress={saveChanges} />
      <AppButton title="Poista kirjaus" onPress={deleteLog} color={colors.danger} />
    </View>
  );
}

const styles = StyleSheet.create({
  gap: {
    gap: 12,
  },
});
