# RealEstateCare - Inspectie-applicatie

Een mobiele webapplicatie voor inspecteurs van RealEstateCare, waarmee inspecties op locatie digitaal kunnen worden uitgevoerd. De app vervangt de papieren formulieren die voorheen werden gebruikt bij het opnemen van schade, achterstallig onderhoud, technische installaties en modificaties.

**Live demo:** https://eindopdracht-loi.netlify.app/
**Demo-inloggegevens:** `LOI-inspecteur@recare.nl` / `inspectie` → verificatiecode `123456`

---

## Gebruikte technologieën

De applicatie is gebouwd met **Vue 3** als JavaScript-framework, in combinatie met **Ionic Vue** voor de mobiele gebruikersinterface. Als ontwikkeltool is **Vite** gebruikt, en de applicatie is geschreven in **TypeScript**. Voor state management is **Pinia** ingezet. Routering verloopt via **Vue Router** (geïntegreerd via `@ionic/vue-router`).

| Technologie | Versie | Doel |
|---|---|---|
| Vue 3 | 3.5 | Applicatieraamwerk |
| Ionic Vue | 8.7 | Mobiele UI-componenten |
| Pinia | 3.0 | State management |
| Vue Router | 4.6 | Routing |
| Vite | 7.3 | Buildsysteem |
| TypeScript | 5.9 | Typeveiligheid |

---

## Installatie en lokaal starten

```bash
npm install
npm run dev
```

De applicatie is daarna bereikbaar via het adres dat in de terminal verschijnt (standaard `http://localhost:5173`).

## Functionaliteiten

### Vier verplichte schermen
- **Toegewezen inspecties** - openstaande inspecties opgehaald via de API, gesorteerd op datum, met een modal om het inspectieformulier te starten
- **Uitgevoerde inspecties** - afgeronde inspecties met detailweergave per categorie (schade, onderhoud, installaties, modificaties)
- **Kennisbank** - richtlijnen, FAQ en documentatiedownloads voor inspecteurs
- **Instellingen** - notificatie- en weergavevoorkeuren, uitlogfunctie

### Extra schermen
- **Dashboard** - overzichtstegels met badges voor openstaande inspecties en recente activiteit
- **Zoeken** - zoekfunctie over zowel inspecties als kennisbankdocumenten
- **Informatie** - app-informatie en technische details
- **Login + twee-factor verificatie** - gesimuleerde 2FA via een 6-cijferig invoerscherm

### Inspectieformulier (AssignedReportDetailView)
Het formulier is opgebouwd in drie stappen: invullen, opmerkingen en foto's, en een controlepagina. Het ondersteunt vier inspectietypes: schade, onderhoud, technische installaties en modificaties.

---

## Data en API

Inspectiegegevens worden asynchroon opgehaald via **JSONBin.io** (een externe website die een JSON-bestand host). De aanroep verloopt via `src/services/inspectionService.ts` met de Fetch API:

```ts
const response = await fetch(API_URL, {
  headers: { 'X-Master-Key': import.meta.env.VITE_API_KEY }
})
```

> ⚠️ **Bekende beperking:** de API-sleutel staat momenteel als omgevingsvariabele in `.env` en mag **niet** worden meegeleverd in de repository. In de productieversie dient de sleutel via een backend proxy te verlopen zodat deze nooit in de client-code terechtkomt.

De opgehaalde data wordt opgesplitst op `status`:
- `inProgress` → toegewezen inspecties (`assignedReports`)
- `completed` → uitgevoerde inspecties (`completedReports`)

---

## State management

De Pinia store (`inspectionStore`) beheert de volledige applicatiestatus:

```ts
state: () => ({
  assignedReports: [] as Inspection[],
  completedReports: [] as Inspection[],
  loading: false,
  loaded: false,
  error: '',
})
```

De store wordt bij elke app-start geladen vanuit `App.vue` via `inspectionStore.loadFromApi()`. Meerdere views gebruiken dezelfde storedata zonder de API opnieuw aan te roepen.

---

## Routing

Alle routes zijn gedefinieerd in `src/router/index.ts`. De structuur is:

```
/                       → redirect naar /login
/login                  → LoginView
/verify                 → VerifyView (2FA)
/tabs/dashboard         → DashboardView
/tabs/assigned          → AssignedReportsView
/tabs/assigned/:type    → AssignedReportDetailView
/tabs/completed         → CompletedReportsView
/tabs/knowledge         → KnowledgeBaseView
/tabs/settings          → SettingsView
/tabs/search            → SearchView
/tabs/info              → InfoView
/:pathMatch(.*)         → fallback naar /login
```

> ⚠️ **Bekende beperking:** er is nog geen `router.beforeEach` geïmplementeerd. Het is daardoor mogelijk om rechtstreeks naar een `/tabs/...`-route te navigeren zonder in te loggen. In een productieversie zou de inlogstatus via sessionStorage of een aparte Pinia auth-store worden bijgehouden, en zou de guard niet-ingelogde gebruikers doorsturen naar `/login`.

---

## Onderdelen die nog niet volledig werken

- **Donkere modus** - de toggle in Instellingen is aanwezig maar heeft nog geen effect; de Ionic CSS-variabelen voor dark mode zijn niet volledig uitgerold.
- **Notificaties** - de toggle is aanwezig in Instellingen maar er is geen backend of push-service gekoppeld.
- **Foto's uploaden** - het formulier toont een fototeller maar de daadwerkelijke upload naar een server is niet geïmplementeerd.
- **Route guard** - zie opmerking hierboven bij Routing.

---

# Verantwoording: security, usability, accessibility en style guides

## Security

Bij de ontwikkeling is rekening gehouden met een aantal beveiligingsaspecten, maar er zijn ook bewuste beperkingen vanwege de prototypestatus.

**Wat is toegepast:**
- Authenticatie via een gesimuleerd login- en 2FA-scherm (e-mailadres + wachtwoord, gevolgd door een 6-cijferige verificatiecode). Dit simuleert het principe van twee-factor authenticatie zoals beschreven in de case.
- Het wachtwoordveld heeft een toggle voor zichtbaarheid en het type-attribuut `password`, zodat het niet als platte tekst in de DOM staat.
- Input-validatie op het loginformulier: de knop is uitgeschakeld zolang e-mail of wachtwoord leeg zijn.
- De API-sleutel is verplaatst naar een `.env`-bestand en wordt via `import.meta.env` ingeladen, zodat deze niet hardcoded in de broncode staat.

**Wat ontbreekt of beperkt is (en waarom):**
- Er is geen echte authenticatiebackend; de inlogcheck is client-side. OWASP A07 (Identification and Authentication Failures) is daarmee niet volledig gedekt.
- Er is geen `router.beforeEach`-guard die niet-geauthenticeerde gebruikers blokkeert. Dit is een bekende tekortkoming die in een productiescenario verholpen zou worden.
- De API-sleutel is in dit prototype zichtbaar in de bundel; in productie zou deze via een server-side verlopen.
- Er is geen HTTPS-afdwinging, geen CSP-header en geen limiting; dit zijn maatregelen die op infrastructuurniveau worden toegepast en buiten het prototype vallen.

## Usability - heuristieken van Jakob Nielsen

Bij het ontwerp van de interface zijn de tien heuristieken van Nielsen als leidraad gebruikt. De meest relevante zijn hieronder uitgewerkt met concrete voorbeelden uit de applicatie:

**Heuristiek 1 - Zichtbaarheid van de systeemstatus**
Tijdens het laden van inspecties toont de app een `IonSpinner` met de tekst "Inspecties laden…". Bij een fout verschijnt een duidelijke foutmelding. Op het dashboard zijn badges zichtbaar die het aantal openstaande inspecties tonen.

**Heuristiek 2 - Gebruikerscontrole en vrijheid**
Elke pagina heeft een terugknop in de tab-balk onderaan. Modals kunnen worden gesloten via een duidelijke sluitknop. In het meerstaps-formulier kan de gebruiker via de "Vorige"-knop terugkeren naar een eerder ingevuld stap.

**Heuristiek 3 - Consistentie en standaarden**
Alle pagina's gebruiken dezelfde `AppHeader`-component met de huisstijlkleur, dezelfde iconenset (Ionicons) en dezelfde navigatiestructuur onderaan het scherm.

**Heuristiek 4 - Foutpreventie**
De inlogknop is uitgeschakeld zolang de invoervelden niet zijn ingevuld. In het inspectieformulier toont de laatste stap een overzichtspagina ("Controle") waarop de ingevoerde gegevens kunnen worden gecontroleerd voordat ze worden opgeslagen.

**Heuristiek 5 - Herkenning boven herinnering**
Via het dashboard zijn alle functies direct zichtbaar als tegels. De gebruiker hoeft niet te onthouden waar iets staat; de navigatiestructuur is altijd zichtbaar.

**Heuristiek 6 - Hulp bij het herkennen, diagnosticeren en herstellen van fouten**
Bij een onjuist wachtwoord verschijnt een duidelijke foutmelding: "Onjuist e-mailadres of wachtwoord. Probeer het opnieuw." Bij een mislukte 2FA-code: "Ongeldige code. Probeer het opnieuw."

**Heuristiek 7 - Hulp en documentatie**
De kennisbank biedt richtlijnen, een FAQ en documentatiedownloads specifiek voor inspecteurs.

## Accessibility - WCAG 2.1 niveau A

De applicatie voldoet gedeeltelijk aan WCAG 2.1 niveau A. Hieronder een overzicht per criterium:

| Criterium | Status | Toelichting |
|---|---|---|
| 1.1.1 Niet-tekstuele content | ✅ | Het logo heeft een `alt`-attribuut; iconen zijn decoratief via Ionicons |
| 1.3.1 Informatie en relaties | ✅ | Ionic-componenten gebruiken semantische HTML-elementen |
| 1.4.1 Gebruik van kleur | ✅ | Kleur wordt niet als enige middel gebruikt; tekst en iconen ondersteunen de betekenis |
| 2.1.1 Toetsenbord | ⚠️ | Knoppen en links zijn focusbaar, maar de tab-volgorde is niet volledig getest en geoptimaliseerd |
| 2.4.2 Paginatitel | ✅ | Elke view heeft een duidelijke paginatitel in de toolbar |
| 3.3.1 Foutidentificatie | ✅ | Foutmeldingen bij login en 2FA zijn tekstueel beschreven |
| 4.1.2 Naam, rol, waarde | ⚠️ | Ionic-componenten bieden standaard ARIA-ondersteuning; knoppen in `AppHeader` hebben `aria-label`-attributen, maar niet alle interactieve elementen zijn volledig voorzien van ARIA |

Wat nog ontbreekt voor volledig niveau A: uitgebreide ondersteuning voor schermlezers (met name dynamische inhoud in modals), volledige toetsenbordnavigatie door formulieren.

## Style guides en best practices

Bij de ontwikkeling zijn de officiële Vue 3 stijlrichtlijnen en de Ionic Vue-documentatie als leidraad gebruikt:

- **Componentstructuur**: elk component volgt het Single File Component (SFC)-patroon met `<template>`, `<script setup lang="ts">` en `<style scoped>`.
- **Composition API**: de applicatie maakt consequent gebruik van de Vue 3 Composition API met `<script setup>`, wat de voorkeur heeft boven de Options API voor nieuwe projecten.
- **TypeScript**: alle modellen, store-state en props zijn getypeerd via interfaces in `src/models/`.
- **Scheiding van verantwoordelijkheden**: data-ophaling zit in `src/services/`, state in `src/stores/`, en presentatielogica in `src/views/` en `src/components/`. Dit volgt het MVC-patroon waarbij de service de modellaag, de store de controllerlaag en de views de presentatielaag vormen.
- **Naamgeving**: componenten volgen de PascalCase-conventie; bestanden zijn consistent benoemd.
- **Linting**: de configuratie bevat `eslint-plugin-vue` en `oxlint` voor automatische stijlcontrole.
