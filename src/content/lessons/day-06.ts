import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day06: Lesson = {
  id: 'day-06-what-is-faith',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 6,
  sectionId: 'week-1',
  level: 'beginner',
  topics: ['trust', 'doubt', 'prayer'],
  readingMinutes: 3,
  passage: { book: 'MRK', chapter: 9, verseStart: 14, verseEnd: 29 },
  relatedPassages: [{ book: 'HEB', chapter: 11, verseStart: 1 }],
  source: {
    contextChecked: { book: 'MRK', chapter: 9, verseStart: 14, verseEnd: 29 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Wat betekent geloven?',
      summary:
        'Een vader die tegelijk gelooft en twijfelt, en dat ook gewoon zegt. Geloof blijkt geen gevoel van zekerheid, maar vertrouwen waarin twijfel ruimte heeft.',
      objective:
        'Je kunt uitleggen dat geloof in de Bijbel vooral vertrouwen is, en dat twijfel daarin een plek mag hebben.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Geloven is vertrouwen, niet de afwezigheid van twijfel. Je mag met een half geloof bij God komen.',
          passageSummary:
            'Een vader brengt zijn zoon bij de leerlingen van Jezus. Volgens het verhaal wordt de jongen al sinds zijn jeugd geteisterd door een geest die hem stom maakt en hem aanvallen bezorgt. De leerlingen kunnen hem niet helpen. Als Jezus komt, vraagt de vader Hem om te helpen, als Hij iets kan. Jezus antwoordt dat alles mogelijk is voor wie gelooft. De vader roept uit dat hij gelooft, en vraagt Jezus tegelijk om hem te helpen in zijn ongeloof. Jezus geneest de jongen.',
          context:
            'Dit verhaal volgt direct op de gedaanteverandering op de berg, waar Petrus, Jakobus en Johannes Jezus in een ander licht zagen (Marcus 9:2-8). Beneden treffen ze een heel ander tafereel: een discussie, een wanhopige vader en leerlingen die niet kunnen helpen. Het contrast tussen de berg en het dal valt op: de glorie van Jezus staat naast de nood van gewone mensen.',
          explanation: [
            'De vader zegt twee dingen tegelijk: hij gelooft, en hij heeft hulp nodig bij zijn ongeloof. Jezus wijst hem daarom niet af. Hij helpt. Dat is bemoedigend: geloof hoeft niet volmaakt of zuiver te zijn om echt te zijn.',
            'In de Bijbel betekent geloven vooral vertrouwen: je verlaten op Iemand. De brief aan de Hebreeën beschrijft geloof als vertrouwen op wat je hoopt en overtuiging van wat je niet ziet (Hebreeën 11:1). Dat is geen zekerheid zoals bij een rekensom, maar zoals je een goede vriend vertrouwt.',
            'Geloof is ook geen kracht die je zelf groot genoeg moet maken om iets af te dwingen. In dit verhaal ligt de nadruk op Jezus, die helpt, niet op de hoeveelheid geloof van de vader.',
            'Het verhaal gaat over genezing, maar het belooft niet dat iedere ziekte verdwijnt als je maar genoeg gelooft. Christenen bidden om genezing en maken ook dankbaar gebruik van artsen en medicijnen.',
          ],
          example:
            'Je stapt in een vliegtuig. Je begrijpt niet precies hoe het blijft vliegen, en misschien ben je zenuwachtig. Toch stap je in, omdat je de piloot en de techniek vertrouwt. Geloof lijkt daarop: je hoeft niet alles te begrijpen of zonder angst te zijn om je toe te vertrouwen.',
          traditionNote:
            'Christenen spreken verschillend over de verhouding tussen geloof en goede werken. Protestantse tradities benadrukken dat een mens alleen door geloof wordt gerechtvaardigd; katholieke en orthodoxe tradities benadrukken dat geloof en een veranderd leven niet los van elkaar staan (zie ook Jakobus 2). Allemaal zien ze geloof als antwoord op Gods genade.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Waar vertrouw je op dit moment al een beetje, en waar heb je nog hulp nodig bij je twijfel?',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Spreek één eerlijke zin uit',
            description:
              'Zeg vandaag één keer, hardop of in stilte: ik wil vertrouwen, help mij waar ik twijfel. Bid je nog niet? Schrijf dan op waar je twijfel precies over gaat. Benoemen helpt.',
          },
          prayer:
            'Heer, ik geloof een beetje en ik twijfel ook. Help mij U te vertrouwen, ook als ik niet alles begrijp. Amen.',
        },
      ],
    },
  },
};
