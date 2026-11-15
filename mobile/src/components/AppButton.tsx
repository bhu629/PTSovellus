import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@/theme";

type Props = {
  title: string;
  onPress: () => void;
  color?: string; // oletuksena korostusväri
};

// Oma nappi, koska React Nativen Button näyttää Androidilla aina samalta eikä sitä voi muotoilla
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
