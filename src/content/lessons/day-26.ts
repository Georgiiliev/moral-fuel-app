import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day26: Lesson = {
  id: 'day-26-helping-others',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 26,
  sectionId: 'week-4',
  level: 'beginner',
  topics: ['service', 'relationships', 'faith-basics'],
  readingMinutes: 4,
  passage: { book: 'MAT', chapter: 25, verseStart: 31, verseEnd: 40 },
  relatedPassages: [
    { book: 'JAS', chapter: 2, verseStart: 14, verseEnd: 17 },
    { book: 'PRO', chapter: 19, verseStart: 17 },
  ],
  source: {
    contextChecked: { book: 'MAT', chapter: 25, verseStart: 31, verseEnd: 46 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Anderen helpen',
      summary:
        'In een beeld van het laatste oordeel zegt Jezus dat wat mensen doen voor wie honger heeft, vreemd is of in de gevangenis zit, hem zelf raakt. Hulp aan anderen is geen extra, maar een uiting van geloof.',
      objective:
        'Je kiest één concrete manier om deze week iemand op een respectvolle manier te helpen.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Geloof wordt zichtbaar in aandacht voor mensen in nood. Je helpt niet om Gods liefde te verdienen, maar omdat je die al hebt ontvangen.',
          passageSummary:
            'Jezus beschrijft hoe de Mensenzoon als koning komt en de volken bijeenroept, als een herder die schapen van bokken scheidt. Aan wie rechts staan zegt hij dat zij hem te eten en te drinken gaven toen hij honger en dorst had, onderdak boden toen hij vreemdeling was, kleding gaven, en hem bezochten toen hij ziek of gevangen was. Zij vragen verbaasd wanneer ze dat deden. Hij antwoordt dat alles wat ze voor de minsten van zijn broeders en zusters deden, ze voor hem hebben gedaan.',
          context:
            'Dit is het slot van Jezus’ onderwijs aan zijn leerlingen kort voor zijn lijden, na verhalen over waakzaam zijn en het gebruiken van wat je gekregen hebt (Matteüs 24-25). Het gedeelte is een beeldende vertelling; het laatste deel, waarin het gaat om wie links staat, volgt in Matteüs 25:41-46. Zorg voor de armen en vreemdelingen heeft diepe wortels in het Oude Testament.',
          explanation: [
            'Het meest ontroerende is dat niemand weet wat hij gedaan heeft. De mensen die hielpen, hadden niet in de gaten dat het bij Jezus aankwam. Ze hadden geen programma; ze zagen een mens met honger en gaven eten. Hulp die voortkomt uit echte aandacht ziet de ander als persoon en niet als project.',
            'Wie zijn de minsten? Veel uitleggers denken aan alle mensen in nood, anderen aan in het bijzonder de volgelingen van Jezus die hulp nodig hebben. Hoe je dat ook leest: de oproep is om te kijken naar wie in je buurt kwetsbaar is.',
            'Het gaat niet om verdienen. Jakobus schrijft dat geloof zonder daden dood is: wie tegen een hongerige zegt dat het wel goed komt maar niets geeft, heeft niets gedaan (Jakobus 2:14-17). En Spreuken zegt dat wie zich over de arme ontfermt, als het ware aan de Heer leent (Spreuken 19:17). Daden zijn geen ticket naar Gods liefde. Ze zijn wat die liefde oplevert.',
            'Respectvol helpen betekent vragen wat iemand nodig heeft, niet beslissen wat goed voor hem is. Het betekent ook eerlijk zijn over je eigen grenzen. Je kunt niet voor iedereen zorgen, en je hoeft ook niet alles te redden. Eén echt gebaar is meer waard dan veel goede voornemens.',
          ],
          example:
            'Fatma woont in een flat in Rotterdam-Zuid en merkt dat haar buurman, een alleenstaande man van tachtig, al weken zijn deur niet uit komt. Ze belt aan met een bord soep en vraagt of hij iets nodig heeft. Hij wil niet binnenkomen, maar vraagt of ze zijn boodschappen mee kan nemen. Ze doet dat voortaan op donderdag. Meer is het niet. Maar hij heeft nu iemand die aanbelt.',
          traditionNote:
            'Christenen leggen het verband tussen geloof en daden niet allemaal gelijk uit. Veel protestanten benadrukken dat mensen uit genade worden gered en dat goede werken daar de vrucht van zijn; katholieken en orthodoxen spreken vaak over het medewerken met Gods genade, onder meer in de zogenoemde werken van barmhartigheid. Alle tradities zijn het erover eens dat de liefde voor de naaste bij het geloof hoort.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Wie in je omgeving kan iets gebruiken, en wat zou je kunnen doen zonder jezelf te overvragen?',
            hint: 'Het hoeft niet groot te zijn. Soms is een berichtje, een maaltijd of een uurtje tijd al genoeg.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Eén gebaar voor één persoon',
            description:
              'Kies deze week één persoon: een buurman, een collega, een kennis. Vraag wat er nodig is, of bied iets kleins aan dat je ook echt kunt volhouden. Heb je geen idee wie? Dan kan een bijdrage aan een voedselbank of een lokaal initiatief ook.',
          },
          prayer:
            'God, open mijn ogen voor wie ik gemakkelijk voorbijloop. Geef mij het geduld om echt te luisteren en de moed om iets kleins te doen. Amen.',
        },
      ],
    },
  },
};
