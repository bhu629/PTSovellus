import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "@/AuthContext";
import { colors, commonStyles } from "@/theme";
import AppButton from "@/components/AppButton";

// Kirjautuminen sähköpostilla ja salasanalla
export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    // jos kirjautuminen onnistuu, AuthContext vie käyttäjän ohjelmasivulle automaattisesti
    setError(await login(email, password));
  }

  return (
    <View style={[commonStyles.container, commonStyles.form]}>
      <Text style={commonStyles.title}>Tervetuloa takaisin</Text>

      <TextInput
        style={commonStyles.input}
        placeholder="Sähköposti"
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Salasana"
        placeholderTextColor={colors.textMuted}
        secureTextEntry // piilottaa salasanan
        value={password}
        onChangeText={setPassword}
      />

      {error && <Text style={commonStyles.errorText}>{error}</Text>}

      <AppButton title="Kirjaudu" onPress={handleLogin} />
      <Link href="/register" style={commonStyles.link}>
        Eikö sinulla ole tunnusta? Rekisteröidy täältä
      </Link>
    </View>
  );
}
