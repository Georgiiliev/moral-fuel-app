import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day23: Lesson = {
  id: 'day-23-reading-the-bible',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 23,
  sectionId: 'week-4',
  level: 'beginner',
  topics: ['bible', 'habits', 'doubt'],
  readingMinutes: 4,
  passage: { book: 'ACT', chapter: 8, verseStart: 26, verseEnd: 39 },
  relatedPassages: [
    { book: '2TI', chapter: 3, verseStart: 14, verseEnd: 17 },
    { book: 'PSA', chapter: 119, verseStart: 105 },
  ],
  source: {
    contextChecked: { book: 'ACT', chapter: 8, verseStart: 1, verseEnd: 40 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'De Bijbel lezen',
      summary:
        'Een Ethiopische hoveling zit in zijn wagen een oude tekst te lezen en begrijpt het niet. Zijn verhaal laat zien dat je de Bijbel niet alleen hoeft te lezen, en dat vragen stellen erbij hoort.',
      objective:
        'Je kiest een manier van lezen en een vertaling die bij je passen, en je weet wat je kunt doen als je iets niet begrijpt.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'De Bijbel is bedoeld om samen met anderen en met vragen gelezen te worden. Je hoeft niet alles meteen te begrijpen om te beginnen.',
          passageSummary:
            'Een leerling genaamd Filippus krijgt de opdracht om een weg in de woestijn te volgen. Daar ziet hij een hoge Ethiopische ambtenaar in zijn wagen zitten, hardop lezend uit de profeet Jesaja. Filippus vraagt of hij begrijpt wat hij leest. De man antwoordt dat hij dat niet kan zonder dat iemand het hem uitlegt, en nodigt Filippus uit om naast hem te komen zitten. Vanuit die tekst vertelt Filippus hem het goede nieuws over Jezus. Even later ziet de man water langs de weg en vraagt of hij gedoopt kan worden. Dat gebeurt, en hij reist verheugd verder.',
          context:
            'Het verhaal speelt kort na de dood van Jezus, toen het geloof zich vanuit Jeruzalem begon te verspreiden (Handelingen 8:1-4). De man komt uit Ethiopië, een gebied ten zuiden van Egypte, en is op weg terug van een bezoek aan Jeruzalem. Hij leest uit het boek Jesaja, een oude profetische tekst over iemand die onrecht ondergaat zonder zich te verzetten (Jesaja 53). Veel uitleggers gaan ervan uit dat hij met een boekrol las; er waren in die tijd geen gedrukte boeken.',
          explanation: [
            'Het meest opvallende is de eerlijkheid van de man. Hij leest, loopt vast en zegt dat gewoon. Veel mensen die voor het eerst in de Bijbel lezen herkennen dat: een deel is mooi, een deel klinkt vreemd en een deel roept vragen op. Dat is geen teken dat je het verkeerd doet. Het is een normaal begin.',
            'Filippus legt niets op. Hij vraagt eerst en gaat dan naast de man zitten. Zo kun je ook zelf lezen: met iemand die je vertrouwt, in een gesprekskring of via een uitleg die je helpt. Een Bijbelgedeelte kan veel winnen als je het in zijn context leest, dus wie schreef het, voor wie en waarom.',
            'Paulus schrijft aan Timoteüs dat de Schrift nuttig is om te onderwijzen en te corrigeren en om iemand toe te rusten voor goed werk (2 Timoteüs 3:14-17). In Psalm 119:105 wordt Gods woord vergeleken met een lamp voor de voeten: geen zoeklicht dat alles in één keer toont, maar licht voor de eerstvolgende stap.',
            'Een paar praktische keuzes helpen. Begin niet bij Genesis 1 en lees niet alles op volgorde door als dat je tegenhoudt. Veel mensen starten met een evangelie, zoals Marcus of Lucas. Lees kort, een of twee delen per dag. Stel bij elk stuk drie vragen: wat staat er, wat betekent het in zijn context, en wat laat het mij zien?',
          ],
          example:
            'Daan studeert in Utrecht en heeft nooit in een Bijbel gelezen. Hij begint met Marcus, een hoofdstuk per avond op zijn telefoon, voor het slapengaan. Bij hoofdstuk drie begrijpt hij iets niet en zet hij een vraagteken in zijn notitie-app. Een week later vraagt hij het aan een collega die in een kerk komt. Samen praten ze er tien minuten over. De vraag blijft niet liggen, en hij leest door.',
          traditionNote:
            'Protestanten erkennen 66 boeken als Bijbel. Katholieken en orthodoxen erkennen daarnaast enkele boeken die ze deuterocanoniek noemen, zoals Wijsheid en Tobit; hun Bijbels zijn dus dikker. Ook zijn er veel vertalingen: de ene volgt het oorspronkelijke Hebreeuws en Grieks zo letterlijk mogelijk, de andere is bedoeld om vlot te lezen. Het helpt om een vertaling te kiezen die je begrijpt, en soms twee naast elkaar te lezen.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Wat zou je het liefst aan iemand vragen over wat je tot nu toe hebt gelezen, en wie zou je dat kunnen vragen?',
            hint: 'Het mag ook een vraag zijn die je ongemakkelijk vindt of waarvan je denkt dat die niet mag.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Lees tien minuten en schrijf één vraag op',
            description:
              'Kies een evangelie of een psalm en lees ongeveer tien minuten. Schrijf één ding op dat je opviel en één vraag die bij je opkomt. Heb je geen idee waar je moet beginnen? Probeer Marcus 1.',
          },
          prayer:
            'God, als U er bent: help mij te begrijpen wat ik lees, en geef me geduld met wat ik nog niet snap. Amen.',
        },
      ],
    },
  },
};
