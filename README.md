# PTApp

PTApp on mobiilisovellus. Sillä voi seurata omia kuntosalitreenejä. Käyttäjä valitsee treeniohjelman. Sitten hän kirjaa sarjat: painon, toistot ja kommentin. Vanhat treenit näkyvät kalenterissa.

## Käytetyt teknologiat

| Teknologia | Kuvaus |
| --- | --- |
| React Native | Kirjasto, jolla tehdään mobiilisovelluksia JavaScriptillä tai TypeScriptillä. Samalla koodilla sovellus toimii sekä Androidilla että iPhonella. |
| Expo | Työkalu React Nativeen. Sen avulla sovelluksen voi testata puhelimessa tai emulaattorissa Expo Go -sovelluksella. Expossa on myös valmiita osia puhelimen ominaisuuksiin, esimerkiksi värinä ja näytön pitäminen päällä. |
| Expo Router | Hoitaa navigoinnin. Jokainen tiedosto `src/app/`-kansiossa on oma sivu. |
| TypeScript | JavaScript, jossa on tyypit. Löytää virheitä jo ennen kuin sovellus käynnistyy. Käytetään sekä mobiilissa että backendissa. |
| Node.js | Ajaa JavaScript-koodia tietokoneella. Backend toimii Node.js:n päällä. |
| Express | Node.js-kirjasto, jolla tehdään REST-rajapinta. Mobiili lähettää HTTP-pyyntöjä, ja Express vastaa JSON-muodossa. |
| SQLite | Tietokanta, joka on yksi tiedosto (`ptapp.db`). Erillistä tietokantapalvelinta ei tarvita, joten se sopii hyvin pieneen projektiin. |
| bcrypt | Tekee salasanasta tiivisteen (hash). Tietokantaan ei tallenneta oikeaa salasanaa. |
| expo-secure-store | Tallentaa kirjautumistokenin puhelimen salattuun muistiin. |
| react-native-calendars | Näyttää vanhat treenit kalenterissa. |
| expo-haptics ja Vibration | Antavat puhelimelle värinäpalautteen. |
| expo-keep-awake | Pitää näytön päällä lepoajastimen aikana. |
| @expo/vector-icons | Valmiit ikonit sovelluksen näkymiin. |
| ESLint | Tarkistaa koodin ja varoittaa virheistä ja huonoista tavoista. |
| Git ja GitHub | Versionhallinta. Backend ja mobiili ovat samassa repossa. |
