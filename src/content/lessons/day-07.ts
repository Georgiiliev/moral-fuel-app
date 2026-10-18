import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day07: Lesson = {
  id: 'day-07-first-steps',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 7,
  sectionId: 'week-1',
  level: 'beginner',
  topics: ['reflection', 'habits', 'trust'],
  readingMinutes: 3,
  passage: { book: 'MAT', chapter: 11, verseStart: 28, verseEnd: 30 },
  relatedPassages: [{ book: 'PHP', chapter: 1, verseStart: 6 }],
  source: {
    contextChecked: { book: 'MAT', chapter: 11, verseStart: 25, verseEnd: 30 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Terugblik op je eerste stappen',
      summary:
        'Een rustige dag om terug te kijken. Jezus nodigt vermoeide mensen uit om bij Hem op adem te komen. Geloof groeit niet door druk, maar in relatie.',
      objective:
        'Je kijkt terug op de eerste week, benoemt wat je raakte of tegenhield, en kiest een haalbaar ritme voor de volgende week.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Je hoeft niet te presteren om te groeien. Jezus nodigt je uit om bij Hem rust te vinden en in je eigen tempo te leren.',
          passageSummary:
            'Jezus roept iedereen die vermoeid is en zwaar belast om bij Hem te komen; Hij zal hun rust geven. Hij vraagt hen zijn juk op zich te nemen en van Hem te leren, omdat Hij zachtmoedig is en nederig van hart. Zijn juk is zacht en zijn last is licht, zegt Hij.',
          context:
            'Jezus spreekt deze woorden na een periode van tegenwind. Johannes de Doper laat vanuit de gevangenis vragen of Jezus wel de beloofde is (Matteüs 11:2-3), en steden waar Jezus veel deed, blijven onverschillig (Matteüs 11:20-24). Religieuze leraren legden mensen in die tijd vaak een zware last van regels op (vergelijk Matteüs 23:4). Tegen die achtergrond klinkt Jezus’ uitnodiging opvallend zacht.',
          explanation: [
            'Een juk is een houten balk waarmee twee dieren samen een ploeg trekken. In Jezus’ tijd werd het beeld ook gebruikt voor het leren bij een leraar. Jezus zegt als het ware: leer van Mij, loop met Mij mee. Het werk gebeurt samen.',
            'Dat is goed om te horen na een eerste week. Misschien ging het goed, misschien heb je dagen overgeslagen. In deze app is dat geen probleem, en in het geloof ook niet. Groei is geen reeks die je ongebroken moet volhouden.',
            'Paulus schrijft aan de christenen in Filippi dat hij erop vertrouwt dat God het goede werk dat Hij in hen begonnen is, ook zal voltooien (Filippenzen 1:6). Het begin hangt niet alleen van jou af, en het vervolg ook niet.',
          ],
          example:
            'Denk aan iemand die is begonnen met hardlopen. Na een week is ze nog geen marathonloper, maar ze weet wel hoe haar benen voelen en welk tijdstip werkt. Een terugblik is geen beoordeling, maar een manier om je ritme te vinden.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Wat is je deze week bijgebleven: een gedachte, een vraag, een moment? En wat maakte het lastig?',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Kies je ritme voor volgende week',
            description:
              'Kijk in je agenda waar een vast moment van een paar minuten past, bijvoorbeeld bij je ochtendkoffie of in de trein. Kies er één. Lukt het een dag niet, dan ga je de volgende keer gewoon verder.',
          },
          prayer:
            'Jezus, dank U voor deze eerste stappen. Ik breng bij U wat me raakte en wat ik nog niet begrijp. Leer mij in uw tempo, zonder druk. Amen.',
        },
      ],
    },
  },
};
