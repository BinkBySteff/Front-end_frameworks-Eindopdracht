# RealEstateCare Inspectie App
Deze applicatie is ontwikkeld als eindopdracht voor de module Front-end Frameworks. De app helpt inspecteurs bij het digitaal uitvoeren van inspecties op locatie. Hiermee wordt het eerdere gebruik van papieren formulieren vervangen door een mobiele applicatie.

De applicatie is ontwikkeld met Vue.js in combinatie met Vite als ontwikkeltool. Voor de gebruikersinterface is gebruikgemaakt van het Ionic framework, waarmee de interface is ontwikkeld die geschikt is voor mobiele apparaten. De app maakt gebruik van een JSON Web API om inspectiegegevens op te halen die via GitHub wordt gehost.

## Functionaliteiten
De applicatie bevat de volgende onderdelen:

Dashboard
Het dashboard biedt een overzicht van de inspecties. Hier worden het aantal toegewezen inspecties, het aantal uitgevoerde inspecties, de kennisbank en de instellingen weergegeven.

Toegewezen inspecties
In dit overzicht staan de inspecties die nog uitgevoerd moeten worden.

Uitgevoerde inspecties
Hier worden inspecties weergegeven die al zijn afgerond.

Kennisbank
De kennisbank bevat tips en documentatie voor inspecteurs.

Instellingen
Hier kunnen applicatie-instellingen worden aangepast zoals het aan of uitzetten van notificatie en donkere modus.

## Gebruikte technologieën
Voor de ontwikkeling van de applicatie zijn de volgende technieken gebruikt:

Vue.js  
JavaScript framework voor het ontwikkelen van de gebruikersinterface.

Ionic Vue  
Framework voor het bouwen van mobiele applicaties met Vue.

Vite  
Tool die de applicatie optimaliseert.

Node.js en npm  
Worden gebruikt om de benodigde onderdelen van het project te installeren.

Pinia  
Een bibliotheek voor Vue waarmee inspectiegegevens worden opgeslagen.

JSON Web API  
Wordt gebruikt om inspectiegegevens op te halen uit een extern JSON-bestand.

## Installatie
Om de applicatie lokaal te starten moeten eerst de onderdelen worden geïnstalleerd:

- npm install

- npm run dev

De applicatie wordt daarna gestart. In het venster van de terminal of cmd verschijnt een lokaal webadres. Door naar dit adres te gaan in de browser wordt de applicatie geopend.

## Structuur van het project
Het project bevat de volgende belangrijke mappen:

src/views  
Bevat de verschillende pagina's van de applicatie.

src/components  
Interfacecomponenten.

src/services  
Bevat codes voor het ophalen van gegevens uit de API.

src/stores  
Bevat de Pinia store waarin inspectiegegevens worden opgeslagen.

## Data-opslag
Inspectiegegevens worden opgehaald via een JSON API die via GitHub gehost wordt. Deze gegevens worden vervolgens opgeslagen in een centrale store met behulp van Pinia. Daardoor kunnen meerdere onderdelen van de applicatie dezelfde gegevens gebruiken zonder de API opnieuw te hoeven laden.

# Security, usability, accessibility en best practices
Bij het ontwikkelen van deze applicatie is rekening gehouden met enkele basispunten voor gebruiksvriendelijkheid en toegankelijkheid. Hierbij zijn onder andere de heuristieken van Jakob Nielsen gebruikt als richtlijn. Deze vuistregels beschrijven hoe een interface duidelijk en logisch kan worden opgebouwd. Daarnaast is gekeken naar de richtlijnen voor digitale toegankelijkheid volgens WCAG 2.1.

Bronnen:
- https://uxfactor.nl/10-vuistregels-voor-gebruiksvriendelijkheid/
- https://www.ilionx.com/themas/digitale-toegankelijkheid/

# Security
Binnen dit prototype zijn beperkte beveiligingsmaatregelingen toegepast. De applicatie haalt inspectiegegevens op via een JSON Web API. Omdat het om een prototype gaat zonder gebruikersaccounts of gevoelige gegevens, is geen authenticatie of extra beveiliging toegevoegd. In een echte applicatie zouden maatregelen nodig zijn, zoals gebruikersauthenticatie.

# Usability
Bij het ontwerp van de interface is gekeken naar enkele heuristieken van Jakob Nielsen. Zo toont het dashboard direct het aantal openstaande en afgeronde inspecties. Daarnaast is gekozen voor een eenvoudige navigatiestructuur. In de applicatie is rekening gehouden met een toolbar onderaan het scherm. Via deze toolbar kunnen gebruikers eenvoudig terugkeren naar het dashboard. De knop ‘Terug’, die tevens onderaan het scherm staat, geeft gebruikers altijd de mogelijkheid om een pagina te verlaten wanneer zij op een scherm terechtkomen waar zij niet willen zijn. Hierdoor blijft de navigatie overzichtelijk en duidelijk voor de gebruiker.

# Accessibility
Bij de ontwikkeling is deels rekening gehouden met toegankelijkheid. Zo zijn duidelijke iconen gebruikt en zijn knoppen, teksten en andere elementen overal in de app hetzelfde vormgegeven. Toch zijn nog niet alle toegankelijkheidsaspecten uitgewerkt, zoals ondersteuning voor schermlezers of uitgebreide toetsenbordnavigatie. Tevens werkt de donkere modus en notificatie in deze versie niet.

# Style guides en best practices
Tijdens de ontwikkeling zijn de basispunten van Vue gevolgd. De applicatie is opgebouwd uit onderdelen en heeft een duidelijke structuur met aparte mappen voor views, components, services en stores. Voor het beheren van de gegevens wordt gebruikgemaakt van Pinia.
