import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day17: Lesson = {
  id: 'day-17-doubt-questions',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 17,
  sectionId: 'week-3',
  level: 'beginner',
  topics: ['doubt', 'faith-basics'],
  readingMinutes: 4,
  passage: { book: 'JHN', chapter: 20, verseStart: 24, verseEnd: 29 },
  relatedPassages: [
    { book: 'PSA', chapter: 13 },
    { book: 'JUD', chapter: 1, verseStart: 22 },
  ],
  source: {
    contextChecked: { book: 'JHN', chapter: 20, verseStart: 19, verseEnd: 31 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Twijfel en vragen',
      summary:
        'Tomas wil zelf zien voordat hij gelooft. Vandaag lees je hoe Jezus met zijn twijfel omgaat, en wat dat zegt over eerlijke vragen in het geloof.',
      objective:
        'Je leert twijfel te benoemen en er met anderen over te praten, zonder dat je je ervoor hoeft te schamen.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Twijfel is geen verbanning uit het geloof. Eerlijke vragen kunnen een weg zijn naar een dieper vertrouwen, zeker als je ze deelt.',
          passageSummary:
            'Op de avond van de eerste paasdag verschijnt Jezus aan zijn leerlingen, maar Tomas is er dan niet bij. Als de anderen hem vertellen dat ze de Heer hebben gezien, antwoordt hij dat hij het pas gelooft als hij de wonden in zijn handen en zijn zij zelf heeft aangeraakt. Een week later zijn de leerlingen weer samen, nu met Tomas. Jezus komt binnen, groet hen met vrede en nodigt Tomas uit zijn wonden te onderzoeken. Tomas belijdt Jezus als zijn Heer en zijn God. Jezus zegt dat zij gelukkig zijn die geloven zonder te hebben gezien.',
          context:
            'Johannes beschrijft dit gebeuren aan het einde van zijn evangelie. De leerlingen zaten uit angst achter gesloten deuren, nadat Jezus was gekruisigd (Johannes 20:19). Tomas, ook Didymus genoemd, was een van de twaalf. Eerder in het evangelie was hij degene die bereid was met Jezus mee te gaan, ook al leek dat gevaarlijk (Johannes 11:16). Johannes zegt zelf dat hij dit verhaal heeft opgeschreven, zodat de lezers geloven (Johannes 20:30-31).',
          explanation: [
            'Tomas staat bekend als de ongelovige, maar dat doet hem tekort. Hij zegt niet dat hij het ongeloof koestert; hij vraagt wat de anderen al hebben gekregen: Jezus zien. Zijn vraag is eerlijk, en hij blijft bij de groep. Dat laatste is opvallend. Hij loopt niet weg met zijn twijfel, maar neemt haar mee naar de vriendengroep.',
            'Jezus reageert niet met een uitbrander. Hij komt terug en geeft Tomas wat hij nodig heeft. Dat betekent niet dat elke vraag zo wordt beantwoord, of dat God alles wat je wilt weten, laat zien. Het laat wel zien dat Jezus twijfel serieus neemt als een eerlijke zoektocht.',
            'De Bijbel kent ook meer dan genoeg gelovigen die worstelen. Psalm 13 begint met een klaagzang: hoelang nog, God? Toch eindigt de dichter met vertrouwen. Judas schrijft zelfs dat gelovigen medelijden moeten hebben met wie twijfelt (Judas 1:22). Twijfel is dus iets wat een gemeenschap mag dragen.',
            'Twijfel kan verschillende vormen aannemen: intellectuele vragen (klopt dit wel?), emotionele leegte (ik voel niets) of vragen vanuit pijn (waarom liet God dit gebeuren?). Probeer te onderscheiden waar jouw twijfel vandaan komt. Dat helpt om de juiste gesprekspartner te vinden: een vriend, een predikant of priester, een gespreksgroep of een therapeut.',
          ],
          example:
            'Yasmina is 22 en studeert in Utrecht. Op de kerkelijke studentenavond van haar vriendin vertelt ze dat ze niet weet of ze gelooft. Ze verwacht ongemakkelijke blikken. In plaats daarvan zegt iemand dat hij hetzelfde voelt sinds zijn opa overleed. Ze praten een uur, zonder dat iemand een antwoord hoeft te hebben. Yasmina loopt naar huis met dezelfde vragen, maar niet meer alleen.',
          traditionNote:
            'Tradities gaan verschillend om met twijfel en vragen. In sommige kerken is er veel ruimte voor discussie en studie, in andere staat de gemeenschappelijke belijdenis voorop. Alle tradities kennen een lange lijn van gelovigen die vragen stelden.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Welke vraag over God, geloof of de Bijbel houdt je bezig? Met wie zou je daar eerlijk over kunnen praten?',
            hint: 'Een vraag is geen aanklacht. Je hoeft er nu geen antwoord op te hebben.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Stel één vraag hardop',
            description:
              'Schrijf een vraag op die je al langer meedraagt. Bespreek haar vandaag of deze week met iemand die je vertrouwt, of zoek een gespreksgroep of een open kerkdienst. Als je liever niemand spreekt, schrijf haar dan alleen op.',
          },
          prayer:
            'God, als U er bent: ik heb vragen en ik zeg ze eerlijk. Laat mij niet doen alsof ik meer weet dan ik weet, en geef mij mensen met wie ik kan zoeken. Amen.',
        },
      ],
    },
  },
};
