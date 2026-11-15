import { Tabs } from "expo-router";
import { Text } from "react-native";
import { colors } from "@/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        sceneStyle: { backgroundColor: colors.background }, // sivujen tausta
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border }, // alapalkki
        tabBarActiveTintColor: colors.primary, // valitun välilehden väri
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Treeniohjelmat", tabBarIcon: () => <Text>🏋️</Text> }}
      />
      <Tabs.Screen
        name="calendar"
        options={{ title: "Kalenteri", tabBarIcon: () => <Text>📅</Text> }}
      />
    </Tabs>
  );
}