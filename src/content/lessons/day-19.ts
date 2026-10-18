import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day19: Lesson = {
  id: 'day-19-temptation-self-control',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 19,
  sectionId: 'week-3',
  level: 'beginner',
  topics: ['habits', 'integrity'],
  readingMinutes: 4,
  passage: { book: 'MAT', chapter: 4, verseStart: 1, verseEnd: 11 },
  relatedPassages: [
    { book: '1CO', chapter: 10, verseStart: 13 },
    { book: 'HEB', chapter: 4, verseStart: 15, verseEnd: 16 },
  ],
  source: {
    contextChecked: { book: 'MAT', chapter: 3, verseStart: 13, verseEnd: 17 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Verleiding en zelfbeheersing',
      summary:
        'Ook Jezus werd op de proef gesteld. Vandaag kijk je hoe Hij met verleiding omging, en waarom genade, niet schaamte, de ruimte geeft om nee te zeggen.',
      objective:
        'Je herkent een patroon waar je moeite mee hebt en kiest één concrete stap naar zelfbeheersing.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Verleiding is geen bewijs dat je faalt. Jezus kent haar uit eigen ervaring, en je mag steun zoeken in plaats van het alleen te willen redden.',
          passageSummary:
            'Na zijn doop wordt Jezus door de Geest de woestijn in geleid, waar Hij veertig dagen en nachten vast en daarna honger krijgt. De verzoeker daagt Hem uit: maak van stenen brood, als Hij Gods Zoon is. Jezus antwoordt dat mensen niet alleen van brood leven. Daarna zet de verzoeker Hem op de tempelmuur en stelt voor te springen, want God zal Hem wel opvangen. Jezus weigert God op de proef te stellen. Ten slotte biedt de verzoeker Hem alle koninkrijken van de wereld aan als Hij zich neerbuigt. Jezus wijst dat af en zegt dat alleen God aanbeden wordt. Dan gaat de verzoeker weg en komen engelen Hem verzorgen.',
          context:
            'Dit gebeurt direct na Jezus’ doop in de Jordaan, waar Hij Gods Zoon wordt genoemd (Matteüs 3:13-17). De woestijn herinnert aan Israëls veertig jaar onderweg, waarin het volk ook op de proef werd gesteld. Jezus antwoordt steeds met woorden uit de boeken van Mozes, die Israël eraan herinneren op God te vertrouwen. Jezus noemt de verzoeker aan het eind van het gesprek satan.',
          explanation: [
            'Let op waar de verleidingen beginnen: bij een echte behoefte (honger), bij de wens om bevestigd te worden (spring maar) en bij macht. Ze zijn zelden grof. Verleiding beloont meestal iets wat op zichzelf niet verkeerd is, maar op de verkeerde manier of op het verkeerde moment.',
            'Jezus weerstaat niet door een sterke wil alleen, maar door te leunen op wat Hij van God weet. Hij herhaalt niet een toverspreuk, maar blijft in relatie met zijn Vader. Dat geeft een praktische les: zelfbeheersing groeit meestal niet door harder je tanden op elkaar te zetten, maar door te weten waarvoor je kiest en door steun te organiseren.',
            'Je staat er niet alleen voor. De brief aan de Hebreeën zegt dat Jezus ons in alle opzichten kent, ook in verleiding, en dat we daarom vrijmoedig naar zijn troon van genade mogen gaan voor hulp (Hebreeën 4:15-16). Paulus voegt eraan toe dat God niemand toelaat dat hij boven zijn krachten wordt beproefd, en dat er telkens een uitweg is (1 Korintiërs 10:13). Dat is geen belofte dat het makkelijk wordt, maar een uitnodiging om de uitweg te zoeken, bijvoorbeeld door iemand te bellen.',
            'En als je valt? Dan is schaamte geen goede brandstof. Schaamte maakt klein en verbergt. Genade zegt: je bent nog steeds welkom, begin opnieuw, met een kleinere stap en met anderen erbij.',
          ],
          example:
            'Sven is 27 en werkt als monteur. Elke avond na het eten pakt hij zijn telefoon en is hij ineens twee uur verder in filmpjes en games. Hij schaamt zich en zweert elke ochtend dat het anders wordt. Deze week probeert hij iets anders: de telefoon gaat om negen uur in de gang aan de oplader, en hij spreekt met een collega af dat hij zondag vertelt hoe het ging. Hij vindt het stom, maar slaapt beter.',
          traditionNote:
            'In de orthodoxe en katholieke traditie speelt vasten een vaste rol bij de strijd tegen verleiding; veel protestanten benadrukken meer persoonlijk gebed en gemeenschap. Allemaal erkennen ze dat niemand dit alleen hoeft te doen.',
          careNote:
            'Gaat het om verslaving, zoals alcohol, drugs, gokken of porno, waar je steeds opnieuw in vervalt? Dan is dat geen zwakte van karakter of geloof. Je huisarts kan je helpen en doorverwijzen naar passende zorg. Gokschulden of andere geldproblemen? Je gemeente biedt gratis schuldhulpverlening. Bij direct gevaar bel je 112.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Waar word jij het vaakst op de proef gesteld? Welke behoefte zit eronder, en wie zou je daarover kunnen vertellen?',
            hint: 'Zoek een eerlijke beschrijving, geen oordeel over jezelf.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Kies één kleine stap',
            description:
              'Kies één patroon dat je wilt veranderen en bedenk één concrete stap: een app verwijderen, een andere route nemen, een vriend inlichten. Doe die stap vandaag. Mislukt het morgen, begin dan gewoon opnieuw.',
          },
          prayer:
            'God, U kent mijn zwakke plekken en U wijst mij niet af. Geef mij de moed om hulp te vragen, en de genade om opnieuw te beginnen. Amen.',
        },
      ],
    },
  },
};
