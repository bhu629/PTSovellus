import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TipSection } from "@/tips";
import { colors } from "@/theme";

// Yksi vinkkikortti: otsikko ikonilla ja vinkit listana
export default function TipCard({ section }: { section: TipSection }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name={section.icon} size={20} color={colors.primary} />
        <Text style={styles.title}>{section.title}</Text>
      </View>

      {section.tips.map((tip) => (
        <View key={tip} style={styles.tipRow}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.tipText}>{tip}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  tipRow: {
    flexDirection: "row",
    gap: 8,
  },
  bullet: {
    color: colors.primary,
    fontSize: 15,
    lineHeight: 21,
  },
  tipText: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    lineHeight: 21,
  },
});
