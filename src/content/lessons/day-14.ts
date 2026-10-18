import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day14: Lesson = {
  id: 'day-14-review-daily-choices',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 14,
  sectionId: 'week-2',
  level: 'beginner',
  topics: ['reflection', 'habits'],
  readingMinutes: 3,
  passage: { book: 'MIC', chapter: 6, verseStart: 6, verseEnd: 8 },
  relatedPassages: [{ book: 'JAS', chapter: 1, verseStart: 22, verseEnd: 25 }],
  source: {
    contextChecked: { book: 'MIC', chapter: 6, verseStart: 1, verseEnd: 8 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Terugblik op dagelijkse keuzes',
      summary:
        'Een rustige terugblik op week 2. Micha geeft een korte samenvatting van wat God vraagt: recht doen, trouw liefhebben en nederig meegaan.',
      objective: 'Je benoemt wat je in week 2 hebt geleerd en wat je wilt vasthouden.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Geloof zie je terug in gewone keuzes, niet in grote gebaren. Terugkijken is geen beoordeling van jezelf, maar een manier om te zien wat er is gegroeid.',
          passageSummary:
            'De profeet Micha laat iemand vragen met welke offers hij voor God moet verschijnen: met duizenden rammen, stromen olie, of zelfs zijn eigen kind. Het antwoord is eenvoudig. Het is je allang verteld wat goed is en wat God van je vraagt: recht doen, trouw liefhebben en nederig met je God meegaan.',
          context:
            'Micha was een profeet uit de achtste eeuw voor Christus, in dezelfde tijd als Jesaja. Hoofdstuk 6 begint als een soort rechtszaak waarin God zijn volk herinnert aan wat Hij voor hen heeft gedaan (Micha 6:1-5). Daarna volgt de vraag van deze verzen. Het volk bracht veel offers, maar leefde ondertussen onrechtvaardig. Micha stelt daar een eenvoudig, helder beeld tegenover.',
          explanation: [
            'De vraag in deze tekst is herkenbaar: hoeveel moet ik doen om goed te zijn? Het antwoord is verrassend kort en wijst naar het gewone leven. Recht doen gaat over hoe je met anderen omgaat, trouw liefhebben over hoe je blijft staan in relaties, en nederig met God meegaan over hoe je durft te leven zonder alles zelf te regelen.',
            'Deze drie dingen zijn precies waar je de afgelopen week mee bezig was: liefde voor je naaste, geduld, vergeving met grenzen, dankbaarheid, eerlijkheid en dienen. Je hoeft dat niet allemaal te hebben bereikt. Jakobus schrijft dat het gaat om de woorden niet alleen te horen maar ook te doen, en vergelijkt het met iemand die in de spiegel kijkt en vergeet hoe hij eruitziet (Jakobus 1:22-25).',
            'Terugblikken werkt het best zonder oordeel. Je kunt jezelf vragen: waar zag ik iets van wat ik deze week leerde? Wat lukte niet, en wat zegt dat over wat ik nodig heb? Het gaat om opmerken, niet om afrekenen. Gods liefde hangt niet af van je cijfers.',
            'Kies daarna iets kleins om vast te houden. Een gewoonte die twee minuten kost, werkt vaak beter dan een groot voornemen.',
          ],
          example:
            'Op zondagavond zit Mila, student in Groningen, met een kop thee op de bank. Ze bladert door haar agenda van de week. Ze ziet dat ze drie keer een berichtje stuurde naar een oude vriendin, dat ze één keer eerlijk zei dat ze iets niet af had, en dat ze zich twee keer ergerde aan haar huisgenoot. Ze besluit niets groots. Ze kiest alleen: volgende week blijf ik er langer rustig bij als ik me erger.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Waar zag je deze week, in een gewone keuze, iets van wat je hebt geleerd? Wat wil je daarvan vasthouden?',
            hint: 'Begin met wat wel lukte, ook als het klein was. Wat niet lukte, mag je daarna zonder oordeel noteren.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Kies één ding voor volgende week',
            description:
              'Kies uit week 2 één houding of gewoonte die je wilt vasthouden en schrijf die op een plek waar je hem ziet. Houd het klein en vriendelijk. Mist een dag, dan begin je gewoon opnieuw.',
          },
          prayer:
            'God, dank voor wat ik deze week heb geleerd en voor wat ik heb mogen ontvangen. Help mij het gewone leven te leven met aandacht, zonder angst om te falen. Amen.',
        },
      ],
    },
  },
};
