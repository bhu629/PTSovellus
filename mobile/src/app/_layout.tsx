import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/theme";

export default function RootLayout() {
  return (
    <>
      {/* vaalea teksti puhelimen yläpalkkiin, koska tausta on tumma */}
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background }, // otsikkopalkin tausta
          headerTintColor: colors.text, // otsikon ja takaisin-nuolen väri
          contentStyle: { backgroundColor: colors.background }, // sivujen tausta
        }}
      >
        {/* välilehdet (ohjelmat + kalenteri), niillä on oma otsikko */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="program/[id]" options={{ title: "Ohjelma" }} />
        <Stack.Screen name="log/[exerciseId]" options={{ title: "Kirjaa treeni" }} />
        <Stack.Screen name="edit/[id]" options={{ title: "Muokkaa kirjausta" }} />
      </Stack>
    </>
  );
}
