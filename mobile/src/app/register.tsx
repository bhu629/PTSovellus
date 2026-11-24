import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "@/AuthContext";
import { colors, commonStyles } from "@/theme";
import AppButton from "@/components/AppButton";

// Uuden käyttäjän luonti. Rekisteröinnin jälkeen käyttäjä on suoraan kirjautunut.
export default function RegisterScreen() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleRegister() {
    setError(await register(name, email, password));
  }

  return (
    <View style={[commonStyles.container, commonStyles.form]}>
      <Text style={commonStyles.title}>Luo tunnus</Text>

      <TextInput
        style={commonStyles.input}
        placeholder="Nimi"
        placeholderTextColor={colors.textMuted}
        value={name}
        onChangeText={setName}
      />
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
        placeholder="Salasana (vähintään 6 merkkiä)"
        placeholderTextColor={colors.textMuted}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error && <Text style={commonStyles.errorText}>{error}</Text>}

      <AppButton title="Rekisteröidy" onPress={handleRegister} />
      <Link href="/login" style={commonStyles.link}>
        Onko sinulla jo tunnus? Kirjaudu
      </Link>
    </View>
  );
}
