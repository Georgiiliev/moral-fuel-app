import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day20: Lesson = {
  id: 'day-20-hope-perseverance',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 20,
  sectionId: 'week-3',
  level: 'beginner',
  topics: ['hope', 'trust'],
  readingMinutes: 4,
  passage: { book: 'ROM', chapter: 5, verseStart: 1, verseEnd: 5 },
  relatedPassages: [
    { book: 'HEB', chapter: 12, verseStart: 1, verseEnd: 3 },
    { book: 'LAM', chapter: 3, verseStart: 19, verseEnd: 26 },
  ],
  source: {
    contextChecked: { book: 'ROM', chapter: 5, verseStart: 1, verseEnd: 11 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Hoop en volharding',
      summary:
        'Hoe houd je vol als het lang tegenzit? Vandaag lees je hoe Paulus hoop beschrijft als iets wat groeit in moeilijke tijd, zonder te doen alsof lijden mooi is.',
      objective:
        'Je kunt uitleggen wat christelijke hoop is en hoe die helpt volhouden.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Christelijke hoop is geen optimisme over hoe het afloopt, maar vertrouwen op een God die liefheeft en erbij blijft, ook in wat nog niet goed is.',
          passageSummary:
            'Paulus schrijft aan de christenen in Rome dat ze door geloof in vrede met God leven, dankzij Jezus. Daardoor hebben ze toegang tot Gods genade en mogen ze zich verheugen in de hoop op Gods heerlijkheid. Hij gaat nog een stap verder: ze mogen zelfs verblijd zijn in hun benauwdheden, omdat benauwdheid volharding voortbrengt, volharding bewezen karakter en bewezen karakter hoop. Die hoop wordt niet beschaamd, want Gods liefde is in hun hart uitgegoten door de heilige Geest.',
          context:
            'Romeinen is een brief van Paulus aan een gemeente die hij nog niet had bezocht, in de hoofdstad van het Romeinse rijk. In de eerste hoofdstukken legt hij uit dat mensen niet door eigen prestaties, maar door geloof in Jezus met God in het reine komen (Romeinen 3-4). Hoofdstuk 5 trekt daar de gevolgen uit: wie gerechtvaardigd is, leeft in vrede met God. Dat vormt de basis waaruit de hoop volgt.',
          explanation: [
            'Het begint met vrede met God. Dat is niet het resultaat van doorzettingsvermogen, maar het gevolg van wat God al gedaan heeft. Daarom kan hoop hier iets anders zijn dan positief denken: ze rust op een relatie die al staat.',
            'Het woord over verblijd zijn in benauwdheden is gevoelig. Paulus zegt niet dat lijden goed is, en ook niet dat je blij moet zijn dat het gebeurt. Veel uitleggers lezen dit als: de hoop is zo stevig dat ze ook in moeilijke tijd blijft staan. Het gaat dus om hoop die doorloopt, niet om pijn die ontkend wordt. Dat past bij mensen die eerlijk zijn over hun verdriet, zoals de dichter van Klaagliederen, die zijn ellende schildert en toch zegt dat Gods goedertierenheid nooit ophoudt (Klaagliederen 3:19-26).',
            'Volharding is meer dan op je tanden bijten. De brief aan de Hebreeën beschrijft het leven als een wedloop, met een wolk van getuigen om je heen, waarin je blijft kijken naar Jezus, die het kruis doorstond (Hebreeën 12:1-3). Je loopt niet alleen en niet op eigen kracht.',
            'Het kan ook zijn dat je nu helemaal geen hoop voelt. Dan hoef je haar niet te forceren. Hoop kan beginnen met een klein vooruitzicht: een mens die naar je omkijkt, een volgende stap, een gebed van drie woorden. Bij aanhoudende somberheid hoort ook gewone zorg.',
          ],
          example:
            'Lotte is 41 en werkt al twee jaar aan haar herstel na een burn-out. Er zijn weken dat het goed gaat en dagen dat ze niets kan. Ze merkt dat het helpt om elke avond één zin te schrijven over wat er die dag wel lukte: een wandeling, een telefoontje met haar zus. Haar hoop is niet groot, maar er is genoeg voor morgen. Haar begeleider en haar huisarts maken daar deel van uit.',
          traditionNote:
            'Tradities leggen verschillend uit hoe gelovigen groeien in karakter en hoop: sommige leggen de nadruk op Gods werk door sacramenten en kerk, andere op persoonlijk geloof en gebed. Allemaal zeggen ze dat hoop een gave is, geen prestatie.',
          careNote:
            'Voel je je al langere tijd hopeloos of leeg? Praat daarover met je huisarts. Heb je gedachten aan zelfdoding, bel dan 113 Zelfmoordpreventie (113 of gratis 0800-0113). Bij direct gevaar bel je 112.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Waar heb je het afgelopen jaar volgehouden terwijl je dat niet wilde? Wat of wie hielp je daarbij, ook als het klein was?',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Schrijf één zin hoop op',
            description:
              'Schrijf aan het eind van de dag één zin over iets wat er goed of dragelijk was, hoe klein ook. Bewaar die zinnen een week, zonder verplichting. Lukt het niet, dan is dat ook goed.',
          },
          prayer:
            'God, ik ben moe van het volhouden. Als U er bent, laat mij dat merken in iets kleins. Geef mij genoeg voor vandaag. Amen.',
        },
      ],
    },
  },
};
