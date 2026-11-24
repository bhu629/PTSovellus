# PTApp

PTApp on mobiilisovellus. Sillä voi seurata omia kuntosalitreenejä. Käyttäjä valitsee treeniohjelman. Sitten hän kirjaa sarjat: painon, toistot ja kommentin. Vanhat treenit näkyvät kalenterissa.

## Käytetyt teknologiat

- **React Native** on kirjasto, jolla tehdään mobiilisovelluksia JavaScriptillä tai TypeScriptillä. Samalla koodilla sovellus toimii sekä Androidilla että iPhonella.
- **Expo** on työkalu React Nativeen. Sen avulla sovelluksen voi testata puhelimessa Expo Go -sovelluksella. Expossa on myös valmiita osia puhelimen ominaisuuksiin, esimerkiksi värinä ja turvallinen tallennus.
- **Expo Router** hoitaa navigoinnin. Jokainen tiedosto `app/`-kansiossa on oma sivu.
- **TypeScript** on JavaScript, jossa on tyypit. Se löytää virheitä jo ennen kuin sovellus käynnistyy. Sitä käytetään sekä mobiilissa että backendissa.
- **Node.js** ajaa JavaScript-koodia tietokoneella. Backend toimii Node.js:n päällä.
- **Express** on Node.js-kirjasto, jolla tehdään REST-rajapinta. Mobiili lähettää HTTP-pyyntöjä, ja Express vastaa JSON-muodossa.
- **SQLite** on tietokanta, joka on yksi tiedosto (`ptapp.db`). Erillistä tietokantapalvelinta ei tarvita, joten se sopii hyvin pieneen projektiin.
- **bcrypt** tekee salasanasta tiivisteen (hash). Tietokantaan ei tallenneta oikeaa salasanaa.
- **ESLint** tarkistaa koodin ja varoittaa virheistä ja huonoista tavoista.
