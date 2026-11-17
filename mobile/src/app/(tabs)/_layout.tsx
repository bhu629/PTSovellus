import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
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
        options={{ title: "Treeniohjelmat", tabBarIcon: ({ color, size }) => <Ionicons name="barbell-outline" color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="calendar"
        options={{ title: "Kalenteri", tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="tips"
        options={{ title: "Vinkit", tabBarIcon: ({ color, size }) => <Ionicons name="bulb-outline" color={color} size={size} /> }}
      />
    </Tabs>
  );
}