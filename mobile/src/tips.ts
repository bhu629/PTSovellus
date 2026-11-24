// Vinkit-sivun tekstit. Ne ovat omassa tiedostossa, jotta niitä on helppo muokata.
import Ionicons from "@expo/vector-icons/Ionicons";

export type TipSection = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap; // ikonin nimi Ioniconsissa, esim. "water-outline"
  tips: string[];
};

type TipCategory = {
  key: string;
  label: string; // valintanapin teksti
  intro: string; // lyhyt teksti kategorian alussa
  sections: TipSection[];
};

export const tipCategories: TipCategory[] = [
  {
    key: "general",
    label: "Yleiset",
    intro: "Hyvän ruokavalion perusta on sama tavoitteesta riippumatta. Kun nämä ovat kunnossa, painon muuttaminen on paljon helpompaa.",
    sections: [
      {
        title: "Ravintosuositukset",
        icon: "nutrition-outline",
        tips: [
          "Syö kasviksia, hedelmiä ja marjoja vähintään 500 g päivässä (noin 5–6 kourallista).",
          "Valitse täysjyväviljaa: ruisleipää, kaurapuuroa ja täysjyväpastaa.",
          "Syö kalaa 2–3 kertaa viikossa ja suosi kasviöljyjä ja pähkinöitä voin sijaan.",
          "Rajoita punaista lihaa, makkaroita ja leikkeleitä sekä sokeria ja suolaa.",
          "Treenaavalle sopiva proteiinimäärä on noin 1,2–2 g painokiloa kohden päivässä.",
        ],
      },
      {
        title: "Ateriarytmi",
        icon: "time-outline",
        tips: [
          "Syö säännöllisesti, esimerkiksi 3–5 kertaa päivässä, niin nälkä ei pääse yllättämään.",
          "Kokoa ateria lautasmallilla: puolet kasviksia, neljännes proteiinia ja neljännes hiilihydraattia.",
          "Syö 1–3 tuntia ennen treeniä kevyt ateria, jossa on hiilihydraattia ja proteiinia.",
          "Syö treenin jälkeen kunnollinen ateria, jossa on proteiinia palautumista varten.",
        ],
      },
      {
        title: "Neste",
        icon: "water-outline",
        tips: [
          "Juo vettä noin 1–1,5 litraa päivässä ruoan lisäksi, treenipäivinä enemmän.",
          "Vaalea virtsa on hyvä merkki siitä, että nestettä on riittävästi.",
          "Vältä sokeroituja juomia, sillä niistä kertyy helposti paljon huomaamattomia kaloreita.",
        ],
      },
    ],
  },
  {
    key: "lose",
    label: "Pudotus",
    intro: "Paino putoaa, kun kulutat enemmän energiaa kuin saat ruoasta. Maltillinen tahti säilyttää lihakset ja tulokset.",
    sections: [
      {
        title: "Seuraa kaloreita",
        icon: "stats-chart-outline",
        tips: [
          "Selvitä ensin oma kulutuksesi: kirjaa syömisesi 1–2 viikon ajan ja seuraa samalla painoa.",
          "Kirjaa päivän kalorit sovellukseen, esimerkiksi Fineli-tietokantaa käyttävään tai muuhun ruokapäiväkirjaan.",
          "Sopiva energiavaje on noin 300–500 kcal päivässä, jolloin paino putoaa noin 0,25–0,5 kg viikossa.",
          "Punnitse ruoat aluksi, sillä annoskoot arvioidaan helposti alakanttiin.",
          "Muista laskea myös juomat, kastikkeet, öljyt ja välipalat.",
        ],
      },
      {
        title: "Ruokavalio",
        icon: "restaurant-outline",
        tips: [
          "Pidä proteiinin saanti korkeana (noin 1,6–2 g/kg), niin lihasmassa säilyy ja nälkä pysyy kurissa.",
          "Täytä lautanen kasviksilla: niissä on vähän energiaa, mutta ne täyttävät hyvin.",
          "Älä karsi kokonaisia ruokaryhmiä, vaan pienennä annoksia ja vähennä herkkuja.",
          "Suunnittele ateriat etukäteen, niin vältät nälkäisenä tehdyt heräteostokset.",
        ],
      },
      {
        title: "Seuranta ja treeni",
        icon: "scale-outline",
        tips: [
          "Punnitse itsesi aamulla samoissa olosuhteissa ja seuraa viikon keskiarvoa, älä yksittäisiä lukemia.",
          "Mittaa myös vyötärönympärys, sillä se kertoo muutoksesta vaa'an lisäksi.",
          "Jatka voimaharjoittelua, jotta pudotat rasvaa etkä lihasta.",
          "Lisää arkiliikuntaa: kävely ja portaat kuluttavat yllättävän paljon.",
        ],
      },
    ],
  },
  {
    key: "gain",
    label: "Nousu",
    intro: "Lihasmassaa kasvattaessa tarvitset hieman ylimääräistä energiaa, riittävästi proteiinia ja nousujohteista voimaharjoittelua.",
    sections: [
      {
        title: "Energia ja kalorit",
        icon: "trending-up-outline",
        tips: [
          "Syö noin 250–500 kcal yli kulutuksesi.",
          "Tavoittele noin 0,5–1 kg nousua kuukaudessa. Nopeampi nousu on yleensä rasvaa.",
          "Seuraa kaloreita ja painoa, sillä moni syö luulemaansa vähemmän.",
          "Jos paino ei nouse kahteen viikkoon, lisää päivään noin 200 kcal.",
        ],
      },
      {
        title: "Ruokavalio",
        icon: "egg-outline",
        tips: [
          "Syö proteiinia noin 1,6–2 g/kg päivässä ja jaa se tasaisesti aterioille.",
          "Riittävä hiilihydraatti antaa energiaa raskaisiin treeneihin.",
          "Jos ruokahalu on pieni, lisää energiatiheitä ruokia: pähkinöitä, öljyä, maapähkinävoita ja kuivattuja hedelmiä.",
          "Lisää yksi välipala tai smoothie päivään, se on usein helpompaa kuin isommat ateriat.",
        ],
      },
      {
        title: "Treeni ja palautuminen",
        icon: "barbell-outline",
        tips: [
          "Lisää treenissä vähitellen painoja tai toistoja, sillä lihas kasvaa, kun sitä haastetaan.",
          "Kirjaa treenit sovellukseen, niin näet kehityksen.",
          "Nuku 7–9 tuntia, sillä lihakset kasvavat levossa.",
        ],
      },
    ],
  },
  {
    key: "maintain",
    label: "Ylläpito",
    intro: "Tavoite saavutettu, hienoa! Nyt tärkeintä on pitää tulos. Ylläpito on oma vaiheensa, ei paluuta vanhaan.",
    sections: [
      {
        title: "Painonpudotuksen jälkeen",
        icon: "flag-outline",
        tips: [
          "Älä palaa heti vanhoihin syömistottumuksiin, sillä se on yleisin syy painon palaamiseen.",
          "Nosta kaloreita vähitellen, noin 100–200 kcal viikossa, kunnes paino pysyy vakaana.",
          "Pieni 1–2 kg nousu heti dieetin jälkeen on yleensä nestettä ja ruoan painoa, ei rasvaa.",
          "Pidä proteiinin saanti edelleen korkeana, se auttaa hallitsemaan nälkää.",
        ],
      },
      {
        title: "Painonnousun jälkeen",
        icon: "fitness-outline",
        tips: [
          "Laske kalorit kulutuksen tasolle, jotta rasvaa ei kerry enempää.",
          "Jatka voimaharjoittelua samalla tasolla, jotta saavutettu lihasmassa säilyy.",
          "Halutessasi voit tehdä myöhemmin lyhyen kevyen pudotusjakson rasvan vähentämiseksi.",
        ],
      },
      {
        title: "Seuranta ylläpidossa",
        icon: "calendar-outline",
        tips: [
          "Punnitse itsesi edelleen esimerkiksi kerran viikossa ja seuraa trendiä.",
          "Päätä itsellesi raja, esimerkiksi ±2 kg. Jos se ylittyy, palaa hetkeksi tarkempaan seurantaan.",
          "Kaloreita ei tarvitse laskea joka päivä, mutta pistokoe silloin tällöin pitää annoskoot hallinnassa.",
        ],
      },
      {
        title: "Pysyvä elämäntapa",
        icon: "heart-outline",
        tips: [
          "Ylläpidä tapoja, jotka toimivat dieetin aikana: säännöllinen ateriarytmi, kasvikset ja riittävä proteiini.",
          "Salli herkut kohtuudella, sillä ehdottomat kiellot johtavat helposti retkahduksiin.",
          "Pidä liikunta osana arkea: treenaa vähintään 2–3 kertaa viikossa ja lisää arkiliikuntaa.",
          "Nuku riittävästi ja hallitse stressiä, sillä molemmat vaikuttavat nälkään ja jaksamiseen.",
          "Aseta uusi tavoite, esimerkiksi voimatavoite, jotta motivaatio säilyy.",
        ],
      },
    ],
  },
];

export const tipsDisclaimer =
  "Vinkit ovat yleisiä suosituksia eivätkä korvaa ammattilaisen neuvoja. Jos sinulla on sairauksia " +
  "tai erityisruokavalio, kysy lääkäriltä tai ravitsemusterapeutilta.";
