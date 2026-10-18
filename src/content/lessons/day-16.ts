import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day16: Lesson = {
  id: 'day-16-anger',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 16,
  sectionId: 'week-3',
  level: 'beginner',
  topics: ['emotions', 'relationships', 'patience'],
  readingMinutes: 4,
  passage: { book: 'EPH', chapter: 4, verseStart: 25, verseEnd: 32 },
  relatedPassages: [
    { book: 'MRK', chapter: 3, verseStart: 1, verseEnd: 6 },
    { book: 'JAS', chapter: 1, verseStart: 19, verseEnd: 20 },
  ],
  source: {
    contextChecked: { book: 'EPH', chapter: 4, verseStart: 17, verseEnd: 32 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Omgaan met boosheid',
      summary:
        'Boosheid is niet automatisch verkeerd. Vandaag kijk je naar wat de Bijbel zegt over boosheid die iets rechtzet, en over boosheid die iemand kapotmaakt.',
      objective:
        'Je onderscheidt boosheid die beschermt van boosheid die beschadigt, en je weet waar je hulp vindt als het onveilig wordt.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Boosheid zegt vaak dat iets je raakt of niet klopt. Het gaat erom wat je ermee doet: laat je haar de leiding nemen, of luister je ernaar?',
          passageSummary:
            'Paulus schrijft aan christenen in Efeze over hun nieuwe manier van leven met elkaar. Ze moeten de waarheid spreken, omdat ze leden van één lichaam zijn. Boos worden mag, maar laat de zon niet ondergaan terwijl je nog kwaad bent, en geef de duivel geen ruimte. Wie stal, moet voortaan werken en iets overhouden voor wie het nodig heeft. Geen vuile taal, maar woorden die opbouwen. Verbittering, woede, geschreeuw en laster moeten verdwijnen. Wees vriendelijk en medelevend voor elkaar en vergeef elkaar, zoals God jullie in Christus vergeven heeft.',
          context:
            'Paulus schreef deze brief aan een gemeente van Joodse en niet-Joodse christenen, die samen een nieuwe gemeenschap moesten vormen. Eerder in hoofdstuk 4 roept hij hen op in liefde met elkaar om te gaan en de eenheid te bewaren. Het gedeelte voor onze passage gaat over het afleggen van het oude leven en het aandoen van het nieuwe (Efeziërs 4:17-24). De opdracht over boosheid hoort bij dat praktische vervolg.',
          explanation: [
            'Het is opvallend dat Paulus boosheid niet verbiedt. Hij schrijft dat je boos kunt worden zonder te zondigen. Boosheid is een signaal, zoals pijn dat is: er is iets dat je raakt, onrecht dat je ziet of een grens die is overschreden. Ook Jezus ziet in een synagoge een man met een verschrompelde hand, en kijkt met woede om zich heen, bedroefd om de hardheid van de aanwezigen. Daarna geneest Hij de man (Marcus 3:1-6). Boosheid over onrecht kan liefde in beweging zetten.',
            'Maar Paulus trekt een grens bij wat boosheid met je doet. Opkroppen laat haar rotten tot verbittering. Uitbarsten laat haar rondvliegen als scherven. Daarom zegt hij: laat de zon niet ondergaan terwijl je nog kwaad bent. Dat is geen regel dat je elke ruzie vóór middernacht moet oplossen, maar een uitnodiging om haar niet te laten sluimeren. Jakobus zegt iets verwants: wees snel om te luisteren, langzaam om te spreken en langzaam om kwaad te worden, want menselijke woede brengt Gods gerechtigheid niet voort (Jakobus 1:19-20).',
            'Praktisch betekent dit: benoem wat je voelt, vraag je af wat eronder zit (pijn, angst, onmacht) en zoek een manier om het te zeggen zonder de ander te verwonden. Vergeven, waarmee Paulus eindigt, komt daarna. Het is een langzaam proces, geen gebaar dat je boosheid verbiedt.',
          ],
          example:
            'Daan zit in de ouderraad van een basisschool, en na een vergadering maakt een andere ouder een denigrerende opmerking over zijn dochter. Hij zegt niets en rijdt kokend naar huis. De volgende dag besluit hij er niet mee te blijven rondlopen. Hij belt de ouder op en zegt rustig dat de opmerking hem raakte, en waarom. Het gesprek is ongemakkelijk, maar de boosheid heeft nu een richting gekregen in plaats van een uitbarsting.',
          traditionNote:
            'Veel christenen zien boosheid als een emotie die niet zelf zonde is. Tradities verschillen in hoe ze het gebruik ervan beoordelen en hoe ze over gerechtigheid, geweld en verzoening nadenken. Over de kern is men het eens: laat haar je niet beheersen.',
          careNote:
            'Raak je betrokken bij geweld, of ben je er bang voor, of dreig je zelf met geweld? Vergeving vraagt nooit dat je onveilig blijft. Veilig Thuis is gratis bereikbaar op 0800-2000. Bij direct gevaar bel je 112. Heb je moeite je boosheid onder controle te houden, bespreek dat dan met je huisarts.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Wat doe je meestal met boosheid: opkroppen, uitbarsten of er rustig over praten? En wat zou je willen veranderen?',
            hint: 'Denk aan een recente situatie. Wat zat er onder je boosheid?',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Geef je boosheid een naam',
            description:
              'Kies een situatie waarover je nog boos bent. Schrijf in één zin op wat je raakte en wat je nodig hebt. Je hoeft er vandaag niets mee te doen, behalve het eerlijk benoemen. Zeg het later zo mogelijk rustig tegen de betrokkene of tegen iemand die je vertrouwt.',
          },
          prayer:
            'God, ik ben boos en dat mag ik zeggen. Help mij te zien wat eronder zit, en te kiezen wat goed is voor mij en voor de ander. Amen.',
        },
      ],
    },
  },
};
