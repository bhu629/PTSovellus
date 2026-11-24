import { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, TextInput, Vibration, View } from "react-native";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppButton from "@/components/AppButton";
import { colors } from "@/theme";

const STEP = 1; // − ja + napit muuttavat aikaa 1 sekunnin

// Muuttaa sekunnit minuuteiksi, esim. 90 -> "1:30"
function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;
  if (restSeconds < 10) {
    return minutes + ":0" + restSeconds;
  }
  return minutes + ":" + restSeconds;
}

// Lepoajastin. Käyttäjä valitsee tauon pituuden sekunteina. Puhelin värisee, kun tauko loppuu.
export default function RestTimer() {
  const [seconds, setSeconds] = useState("90"); // tauon pituus (tekstikentän arvo)
  const [remaining, setRemaining] = useState(0); // jäljellä oleva aika sekunteina
  const isRunning = remaining > 0; // ajastin on käynnissä, kun aikaa on jäljellä

  // Joka sekunti aika vähenee yhdellä.
  // Kun viimeinen sekunti loppuu, puhelin värisee 1 sekunnin.
  useEffect(() => {
    if (remaining <= 0) return;

    const timeout = setTimeout(() => {
      if (remaining === 1) {
        Vibration.vibrate(1000);
      }
      setRemaining(remaining - 1);
    }, 1000);

    // jos käyttäjä painaa Lopeta, odottava sekunti perutaan
    return () => clearTimeout(timeout);
  }, [remaining]);

  // Näyttö pysyy päällä niin kauan, kun ajastin on käynnissä
  useEffect(() => {
    if (!isRunning) return;

    activateKeepAwakeAsync();
    return () => {
      deactivateKeepAwake();
    };
  }, [isRunning]);

  function startTimer() {
    Keyboard.dismiss();
    setRemaining(Number(seconds));
  }

  function changeSeconds(amount: number) {
    setSeconds(String(Math.max(0, Number(seconds) + amount)));
  }

  // Kun ajastin on käynnissä, näytetään jäljellä oleva aika ja Lopeta-nappi
  if (isRunning) {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="timer-outline" size={32} color={colors.primary} />
          <Text style={styles.time}>{formatTime(remaining)}</Text>
        </View>
        <AppButton title="Lopeta" color={colors.border} onPress={() => setRemaining(0)} />
      </View>
    );
  }

  // Muuten näytetään tauon pituuden valinta
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Pressable style={styles.adjust} onPress={() => changeSeconds(-STEP)}>
          <Text style={styles.adjustText}>−</Text>
        </Pressable>
        <TextInput
          style={[styles.time, styles.input]}
          value={seconds}
          onChangeText={(text) => setSeconds(text.replace(/\D/g, ""))} // vain numerot
          keyboardType="number-pad"
        />
        <Text style={styles.unit}>s</Text>
        <Pressable style={styles.adjust} onPress={() => changeSeconds(STEP)}>
          <Text style={styles.adjustText}>+</Text>
        </Pressable>
      </View>
      <AppButton title="Aloita tauko" onPress={startTimer} />
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
