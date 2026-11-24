import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/theme";
import { AuthProvider, useAuth } from "@/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      {/* vaalea teksti puhelimen yläpalkkiin, koska tausta on tumma */}
      <StatusBar style="light" />
      <RootStack />
    </AuthProvider>
  );
}

function RootStack() {
  const { isLoading, isLoggedIn } = useAuth();

  // odotetaan, että token on luettu muistista. Muuten kirjautumissivu näkyisi hetken turhaan.
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background }, // otsikkopalkin tausta
        headerTintColor: colors.text, // otsikon ja takaisin-nuolen väri
        contentStyle: { backgroundColor: colors.background }, // sivujen tausta
      }}
    >
      {/* Sivut kirjautuneelle käyttäjälle. Jos guard on false, sivut eivät aukea ja käyttäjä menee kirjautumissivulle. */}
      <Stack.Protected guard={isLoggedIn}>
        {/* välilehdet (ohjelmat, kalenteri, vinkit). Niillä on oma otsikko. */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="program/[id]" options={{ title: "Ohjelma" }} />
        <Stack.Screen name="log/[exerciseId]" options={{ title: "Kirjaa treeni" }} />
        <Stack.Screen name="edit/[id]" options={{ title: "Muokkaa kirjausta" }} />
      </Stack.Protected>

      {/* Sivut käyttäjälle, joka ei ole kirjautunut */}
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" options={{ title: "Kirjaudu sisään" }} />
        <Stack.Screen name="register" options={{ title: "Rekisteröidy" }} />
      </Stack.Protected>
    </Stack>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
});
