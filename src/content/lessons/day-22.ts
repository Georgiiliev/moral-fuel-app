import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day22: Lesson = {
  id: 'day-22-learning-to-pray',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 22,
  sectionId: 'week-4',
  level: 'beginner',
  topics: ['prayer', 'habits', 'trust'],
  readingMinutes: 4,
  passage: { book: 'MAT', chapter: 6, verseStart: 5, verseEnd: 13 },
  relatedPassages: [
    { book: 'LUK', chapter: 11, verseStart: 1, verseEnd: 4 },
    { book: 'ROM', chapter: 8, verseStart: 26 },
  ],
  source: {
    contextChecked: { book: 'MAT', chapter: 6, verseStart: 1, verseEnd: 18 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Leren bidden',
      summary:
        'Jezus’ leerlingen vroegen hem hoe ze moesten bidden. Zijn antwoord is kort en eenvoudig, en je kunt het gebruiken als leerschool als je niet weet wat je moet zeggen.',
      objective:
        'Je leert een eenvoudige vorm van gebed die je dagelijks kunt gebruiken, en je kiest zelf hoe je dat vormgeeft.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Bidden is praten met God als met een vader die al weet wat je nodig hebt. Je hoeft niet mooi of lang te praten; eerlijk en eenvoudig is genoeg.',
          passageSummary:
            'Jezus waarschuwt zijn toehoorders dat ze niet moeten bidden om indruk te maken, zoals mensen die graag op straat of in de synagoge gezien worden. Hij raadt aan om in een afgesloten kamer te bidden tot de Vader, die in het verborgene ziet. Ook lange herhalende woordenstromen zijn niet nodig, want God weet wat je nodig hebt voordat je het vraagt. Daarna geeft Jezus een voorbeeld: aanspreken van God als Vader, vragen dat zijn naam geheiligd wordt en zijn koninkrijk komt, vragen om dagelijks brood, om vergeving en om bewaring voor het kwaad.',
          context:
            'Deze woorden komen uit de Bergrede, waarin Jezus beschrijft hoe een leven met God eruitziet. Vlak ervoor en erna spreekt hij over goede daden en vasten, met dezelfde waarschuwing: doe het niet om gezien te worden (Matteüs 6:1-4 en 6:16-18). Een kortere versie van het gebed staat bij Lucas, die vertelt dat een leerling Jezus vroeg om hen te leren bidden (Lucas 11:1-4).',
          explanation: [
            'Wat opvalt is hoe klein het gebed is. Het zijn een paar zinnen, en toch past er veel in. Eerst richt je je op God: wie hij is en wat hij wil. Pas daarna kom je zelf aan bod, met drie eenvoudige vragen: om wat je vandaag nodig hebt, om vergeving en om bescherming.',
            'De aanhef is bijzonder. Jezus leert zijn volgelingen God aan te spreken als een vader, dichtbij en betrokken. Dat betekent niet dat je alles moet voelen wat bij dat woord hoort; sommige mensen hebben een moeilijke ervaring met hun eigen vader. Veel christenen zeggen dat Gods vaderschap daar juist een heel andere maat voor geeft.',
            'Je hoeft ook niet te wachten tot je weet wat je moet zeggen. Paulus schrijft dat de Geest ons helpt in onze zwakte, omdat we niet weten wat we moeten bidden (Romeinen 8:26). Zuchten, een enkel woord of zwijgen kan dus ook een gebed zijn.',
            'Je kunt het Onzevader op twee manieren gebruiken. Je kunt het zinnetje voor zinnetje bidden, en bij elk deel even stilstaan: waar denk ik nu aan? Of je gebruikt het als patroon voor je eigen woorden: eerst God, dan je dagelijkse behoeften, dan wat je hebt misgedaan, dan wat je vreest.',
          ],
          example:
            'Lotte werkt in de thuiszorg en rijdt elke ochtend een kwartier met de auto naar haar eerste cliënt. Ze weet niet goed hoe bidden moet, maar ze gebruikt die rit. Bij het eerste stoplicht zegt ze hardop waar ze dankbaar voor is. Bij het tweede noemt ze één ding dat ze die dag nodig heeft. Bij het derde noemt ze iemand voor wie ze zich zorgen maakt. Meer is het niet, en het is genoeg om de dag anders te beginnen.',
          traditionNote:
            'Christenen bidden op verschillende manieren. Veel katholieken en orthodoxen gebruiken vaste gebeden en de rozenkrans of het Jezusgebed; in veel protestantse kerken is vrij, eigen gebed gebruikelijk, naast het Onzevader in de eredienst. Ook stil gebed en meditatie kennen een lange traditie. Protestanten sluiten het Onzevader vaak af met een lofprijzing over het koninkrijk, de kracht en de heerlijkheid. Katholieken bidden die zin in de mis na een korte tussenzin. In de oudste handschriften van Matteüs ontbreekt die lofprijzing, daarom staat ze in veel vertalingen onder de tekst of tussen haakjes. Het ene is geen betere weg dan het andere.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Als je zonder terughoudendheid zou praten tegen iemand die het goed met je meent, wat zou je dan zeggen over deze week?',
            hint: 'Je hoeft niet te weten of er iemand luistert. Het gaat erom dat je het eens eerlijk onder woorden brengt.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Drie zinnen op een vast moment',
            description:
              'Kies een moment dat al in je dag zit, zoals het zetten van koffie of het wachten op de bus. Zeg of denk drie zinnen: waarvoor ben je dankbaar, wat heb je vandaag nodig, en voor wie maak je je zorgen. Wil je liever het Onzevader lezen? Dat kan ook.',
          },
          prayer:
            'God, ik weet niet goed hoe dit moet. Als U er bent, hoor mij dan. Help mij eerlijk te zijn over wat ik nodig heb. Amen.',
        },
      ],
    },
  },
};
