import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@/theme";

type Props = {
  title: string;
  onPress: () => void;
  color?: string; // jos väriä ei anneta, käytetään korostusväriä
};

// Oma nappi, koska React Nativen omaa Button-nappia ei voi muotoilla Androidilla
export default function AppButton({ title, onPress, color = colors.primary }: Props) {
  return (
    <Pressable style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
});
