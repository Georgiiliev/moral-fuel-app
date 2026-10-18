import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day05: Lesson = {
  id: 'day-05-cross-resurrection',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 5,
  sectionId: 'week-1',
  level: 'beginner',
  topics: ['jesus', 'gospel', 'hope'],
  readingMinutes: 3,
  passage: { book: 'LUK', chapter: 24, verseStart: 1, verseEnd: 12 },
  relatedPassages: [
    { book: 'LUK', chapter: 23, verseStart: 44, verseEnd: 49 },
    { book: 'ROM', chapter: 5, verseStart: 8 },
  ],
  source: {
    contextChecked: { book: 'LUK', chapter: 24, verseStart: 1, verseEnd: 35 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Het kruis en de opstanding',
      summary:
        'Het lege graf stond aan het begin van het christelijk geloof. Vandaag lees je hoe de eerste getuigen het ontdekten, en waarom christenen er hun hoop op bouwen.',
      objective:
        'Je kunt vertellen wat er volgens Lucas op de eerste paasmorgen gebeurde, en waarom kruis en opstanding bij elkaar horen.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Het kruis laat zien hoe ver Gods liefde gaat. De opstanding laat zien dat de dood niet het laatste woord heeft.',
          passageSummary:
            'Vroeg op de eerste dag van de week gaan enkele vrouwen met geurige kruiden naar het graf van Jezus. De steen is weggerold en het lichaam is er niet. Twee mannen in stralende kleren vragen hun waarom ze de levende zoeken bij de doden: Hij is opgewekt, zoals Hij had gezegd. De vrouwen vertellen het aan de apostelen, maar die vinden het onzin en geloven hen niet. Petrus rent toch naar het graf, ziet alleen de linnen doeken liggen en gaat verwonderd naar huis.',
          context:
            'Lucas schreef zijn evangelie voor een zekere Teofilus, nadat hij zorgvuldig had onderzocht wat ooggetuigen hadden doorgegeven (Lucas 1:1-4). Het verhaal van het lege graf volgt op de kruisiging op vrijdag en op de sabbat, waarop de vrouwen volgens de wet rustten (Lucas 23:54-56). Daarom gaan ze pas op zondagochtend naar het graf.',
          explanation: [
            'Jezus stierf aan een Romeins kruis, een straf die bedoeld was om mensen te vernederen. Voor zijn volgelingen leek alles voorbij (Lucas 23:44-49). Lucas beschrijft geen leerlingen die vol vertrouwen op Pasen stonden te wachten, maar verbijsterde mensen die het eerst niet geloofden.',
            'Opvallend is dat vrouwen de eerste getuigen zijn. In die cultuur werd de getuigenis van vrouwen vaak minder serieus genomen. Wie een verhaal zou verzinnen om mensen te overtuigen, zou het waarschijnlijk niet zo vertellen. Veel lezers zien daarin een aanwijzing dat hier een herinnering eerlijk is doorgegeven.',
            'Christenen zien het kruis en de opstanding als één geheel. Paulus schrijft dat God zijn liefde laat zien doordat Christus voor ons stierf toen we nog zondaars waren (Romeinen 5:8). De opstanding zien christenen als Gods bevestiging van wie Jezus is, en als het begin van nieuw leven.',
            'De opstanding is volgens christenen ook niet alleen iets van toen. Ze bevat een belofte: dat lijden, onrecht en dood uiteindelijk niet het laatste woord hebben.',
          ],
          example:
            'Iemand die een groot verlies heeft meegemaakt, zegt soms: ik weet niet hoe het verder moet. De paasverhalen ontkennen dat verdriet niet. De vrouwen gaan naar een graf, niet naar een feest. Maar ze ontdekken een toekomst die ze niet zagen aankomen. Hoop is in de Bijbel geen optimisme, maar vertrouwen dat God nieuw leven kan geven waar alles ten einde leek.',
          traditionNote:
            'Christenen beschrijven met verschillende beelden wat er aan het kruis gebeurde: Jezus die de straf draagt in onze plaats, Jezus die het kwaad en de dood overwint, en Jezus die Gods liefde zichtbaar maakt. Veel tradities zien deze beelden als elkaar aanvullend.',
          careNote:
            'Rouw je, of voel je je al lange tijd somber? Praat erover met iemand die je vertrouwt of met je huisarts. Geloof en professionele hulp sluiten elkaar niet uit. Denk je aan zelfdoding, bel dan 113 of 0800-0113 (gratis).',
        },
        {
          kind: 'reflect',
          prompt: {
            question: 'Waar in je leven zou je hoop willen zien die verder gaat dan optimisme?',
            hint: 'Je kunt aan iets kleins denken of aan iets groots.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Sta stil bij een moment van verlies of hoop',
            description:
              'Neem vijf minuten om te wandelen of stil te zitten. Denk aan iets in je leven wat voorbij lijkt. Je hoeft het niet op te lossen; benoem het alleen eerlijk, voor jezelf of in gebed.',
          },
          prayer:
            'Heer Jezus, dank U dat U de weg van het kruis bent gegaan, en dat de dood niet het laatste woord had. Geef mij hoop waar ik die nu niet zie. Amen.',
        },
      ],
    },
  },
};
