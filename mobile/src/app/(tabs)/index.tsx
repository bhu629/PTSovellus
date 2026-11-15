import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Program } from "@/types";
import { colors, levelColors } from "@/theme";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Etusivu: näytetään kaikki treeniohjelmat
export default function Index() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const response = await fetch(`${API_URL}/api/programs`);
        const data = await response.json();
        setPrograms(data); // tallennetaan data stateen
      } catch (e) {
        setError("Ohjelmien haku epäonnistui");
      } finally {
        setLoading(false);
      }
    }
    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }

  // näytetään ohjelmat kortteina
  return (
    <FlatList
      data={programs}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        // painamalla avataan ohjelman sivu
        <Pressable style={styles.card} onPress={() => router.push(`/program/${item.id}`)}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.infoRow}>
            {/* tason merkki, väri riippuu tasosta */}
            <Text style={[styles.badge, { backgroundColor: levelColors[item.level] }]}>{item.level}</Text>
            <Text style={styles.days}>{item.daysPerWeek} päivää / vko</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.text,
  },
  list: {
    padding: 16,
    gap: 12, 
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: colors.text,
    marginTop: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  badge: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: "hidden", 
  },
  days: {
    color: colors.text,
  },
});
