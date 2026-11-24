import { StyleSheet } from "react-native";

// Kaikki sovelluksen värit ovat tässä. Kun muutat värin tässä, se muuttuu koko sovelluksessa.
export const colors = {
  background: "#121212", // taustaväri
  card: "#1E1E1E", // korttien ja kenttien väri
  border: "#2C2C2C", // reunaviivat
  primary: "#FF6B35", // korostusväri (napit, valittu päivä)
  text: "#FFFFFF", // päätekstit
  textMuted: "#9E9E9E", // vähemmän tärkeät tekstit
  danger: "#E53935", // poistonappi
};

// Ohjelman tason väri: aloittelija vihreä, keskitaso oranssi, edistynyt punainen
export const levelColors = {
  aloittelija: "#4CAF50",
  keskitaso: "#FFA726",
  edistynyt: "#E53935",
};

// react-native-calendars -kalenterin värit
export const calendarTheme = {
  calendarBackground: colors.card,
  dayTextColor: colors.text,
  monthTextColor: colors.text,
  textDisabledColor: "#555555",
  todayTextColor: colors.primary,
  arrowColor: colors.primary,
  selectedDayBackgroundColor: colors.primary,
  selectedDayTextColor: colors.text,
  dotColor: colors.primary,
  textSectionTitleColor: colors.textMuted, // viikonpäivien nimet
};

// Tyylit, joita käytetään monella sivulla
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.card,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  list: {
    gap: 8, // väli rivien välissä
  },
  mutedText: {
    color: colors.textMuted,
  },
  // kirjautumis- ja rekisteröintilomake
  form: {
    justifyContent: "center",
    gap: 12,
  },
  errorText: {
    color: colors.danger,
  },
  link: {
    color: colors.primary,
    textAlign: "center",
    marginTop: 8,
  },
});
