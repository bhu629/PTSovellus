import { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, TextInput, Vibration, View } from "react-native";
import * as Haptics from "expo-haptics";
import { useKeepAwake } from "expo-keep-awake";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppButton from "@/components/AppButton";
import { colors } from "@/theme";

const STEP = 1; // −/+ muuttaa aikaa 1 sekunnin

// Pitää näytön päällä niin kauan kuin tämä on näkyvissä
function KeepAwake() {
  useKeepAwake();
  return null;
}

// 90 -> "1:30"
function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

// Palautumisajastin: käyttäjä asettaa tauon sekunteina, ja puhelin värisee, kun tauko loppuu
export default function RestTimer() {
  const [seconds, setSeconds] = useState("90"); // tauon pituus (tekstikentän arvo)
  const [endTime, setEndTime] = useState<number | null>(null); // milloin tauko loppuu, null = ei käynnissä
  const [now, setNow] = useState(0); // nykyhetki, päivitetään ajastimen käydessä

  // Ajastimen käydessä päivitetään kelloa ja lopetetaan, kun aika on täynnä
  useEffect(() => {
    if (endTime === null) return;
    const interval = setInterval(() => {
      setNow(Date.now());
      if (Date.now() >= endTime) {
        setEndTime(null);
        Vibration.vibrate([0, 400, 200, 400]);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }, 250);
    return () => clearInterval(interval); // pysäytetään, kun ajastin loppuu
  }, [endTime]);

  function start() {
    Keyboard.dismiss();
    setNow(Date.now());
    setEndTime(Date.now() + Number(seconds) * 1000);
  }

  function change(amount: number) {
    setSeconds(String(Math.max(0, Number(seconds) + amount)));
  }

  // Ajastimen käydessä näytetään jäljellä oleva aika ja Lopeta-nappi
  if (endTime !== null) {
    const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));
    return (
      <View style={styles.card}>
        <KeepAwake />
        <View style={styles.row}>
          <Ionicons name="timer-outline" size={32} color={colors.primary} />
          <Text style={styles.time}>{formatTime(remaining)}</Text>
        </View>
        <AppButton title="Lopeta" color={colors.border} onPress={() => setEndTime(null)} />
      </View>
    );
  }

  // Muuten näytetään tauon pituuden valinta
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Pressable style={styles.adjust} onPress={() => change(-STEP)}>
          <Text style={styles.adjustText}>−</Text>
        </Pressable>
        <TextInput
          style={[styles.time, styles.input]}
          value={seconds}
          onChangeText={(text) => setSeconds(text.replace(/\D/g, ""))} // vain numerot
          keyboardType="number-pad"
        />
        <Text style={styles.unit}>s</Text>
        <Pressable style={styles.adjust} onPress={() => change(STEP)}>
          <Text style={styles.adjustText}>+</Text>
        </Pressable>
      </View>
      <AppButton title="Aloita tauko" onPress={start} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 14, marginTop: 12, gap: 12 },
  row: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 12 },
  time: { color: colors.text, fontSize: 32, fontWeight: "bold", textAlign: "center" },
  input: { minWidth: 80, borderBottomWidth: 2, borderBottomColor: colors.primary, padding: 0 },
  unit: { color: colors.textMuted, fontSize: 20 },
  adjust: { width: 44, height: 44, borderRadius: 10, backgroundColor: colors.border, alignItems: "center", justifyContent: "center" },
  adjustText: { color: colors.text, fontSize: 22, fontWeight: "bold" },
});
