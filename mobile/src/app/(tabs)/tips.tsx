import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { tipCategories, tipsDisclaimer } from "@/tips";
import { colors } from "@/theme";
import TipCard from "@/components/TipCard";

// Vinkit-sivu: ruokavinkit ja vinkit oman tavoitteen mukaan (painon pudotus, nousu tai ylläpito)
export default function TipsScreen() {
  const [selectedCategory, setSelectedCategory] = useState(tipCategories[0]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* kategorian valinta */}
      <View style={styles.tabs}>
        {tipCategories.map((category) => {
          const isSelected = category.key === selectedCategory.key;
          return (
            <Pressable
              key={category.key}
              style={[styles.tab, isSelected && styles.tabSelected]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>{category.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.intro}>{selectedCategory.intro}</Text>

      {selectedCategory.sections.map((section) => (
        <TipCard key={section.title} section={section} />
      ))}

      <Text style={styles.disclaimer}>{tipsDisclaimer}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  tabSelected: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.textMuted,
    fontWeight: "bold",
  },
  tabTextSelected: {
    color: colors.text,
  },
  intro: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 21,
    marginVertical: 4,
  },
  disclaimer: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 8,
  },
});
