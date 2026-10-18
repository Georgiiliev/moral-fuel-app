import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day13: Lesson = {
  id: 'day-13-humility-serving',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 13,
  sectionId: 'week-2',
  level: 'beginner',
  topics: ['service', 'relationships'],
  readingMinutes: 4,
  passage: { book: 'JHN', chapter: 13, verseStart: 1, verseEnd: 17 },
  relatedPassages: [
    { book: 'PHP', chapter: 2, verseStart: 3, verseEnd: 8 },
    { book: 'MRK', chapter: 10, verseStart: 42, verseEnd: 45 },
  ],
  source: {
    contextChecked: { book: 'JHN', chapter: 13, verseStart: 1, verseEnd: 20 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Nederigheid en dienen',
      summary:
        'Jezus wast de voeten van zijn leerlingen. Wat betekent leiden door te dienen, en hoe ziet dat eruit in een gewone week?',
      objective: 'Je bedenkt een onopvallende manier om iemand te dienen.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Echte grootte toont zich in dienen. Jezus kiest de laagste plek, niet om zichzelf te verkleinen, maar uit liefde.',
          passageSummary:
            'Vlak voor het Pesachfeest weet Jezus dat zijn tijd is gekomen om uit deze wereld naar de Vader te gaan, en dat Hij de zijnen tot het einde toe liefheeft. Tijdens de maaltijd staat Hij op, legt zijn bovenkleed af, bindt een doek om en begint de voeten van zijn leerlingen te wassen. Petrus protesteert, en Jezus zegt dat hij zonder deze wassing geen deel aan Hem heeft. Dan wil Petrus meteen helemaal gewassen worden. Daarna gaat Jezus weer aan tafel en legt uit dat Hij, hun Meester en Heer, hun voeten heeft gewassen, zodat zij dat ook voor elkaar doen. Hij noemt het een voorbeeld en zegt dat wie dit weet en doet, gelukkig is.',
          context:
            'Dit speelt zich af op de avond voor Jezus’ arrestatie en kruisiging, tijdens een laatste maaltijd met zijn leerlingen. In die tijd droegen mensen sandalen over stoffige wegen, en het wassen van voeten was werk voor de laagste bediende of slaaf. Volgens Lucas hadden de leerlingen die avond nog ruzie over wie van hen de belangrijkste was (Lucas 22:24). Johannes begint dit gedeelte met de woorden dat Jezus hen liefhad tot het einde.',
          explanation: [
            'Het opvallende is wie hier de handdoek pakt. Jezus weet wie Hij is en waar Hij vandaan komt, en juist vanuit die zekerheid dient Hij. Nederigheid is dus geen laag zelfbeeld. Het is de vrijheid om je niet te hoeven bewijzen en om iemand anders te dienen zonder jezelf kwijt te raken.',
            'Petrus vindt het ondraaglijk dat zijn Heer zijn voeten wast. Dat is herkenbaar: ontvangen is soms moeilijker dan geven. Jezus laat zien dat je eerst iets moet toelaten om het te kunnen doorgeven. Dienen begint met ontvangen.',
            'Jezus noemt dit een voorbeeld. Eerder had Hij gezegd dat leiders in de wereld hun macht laten voelen, maar dat wie bij Hem groot wil zijn, de dienaar van de anderen moet worden (Marcus 10:42-45). Paulus roept op om uit nederigheid de ander belangrijker te vinden dan jezelf (Filippenzen 2:3-8). In jouw week kan de handdoek er heel gewoon uitzien: de afwas, een rit naar het station, een luisterend oor.',
            'Dienen betekent niet dat je jezelf wegcijfert of je laat uitbuiten. Wie altijd maar geeft en nooit bijvult, houdt het niet vol. Dienen komt voort uit vrijheid en liefde, niet uit dwang of een gebrek aan eigenwaarde, en het mag grenzen kennen.',
          ],
          example:
            'Op de zaterdagochtend bij een voetbalclub in Zwolle staat een vader al een uur voor de wedstrijd op het veld om de doelen neer te zetten en de lijnen te trekken. Niemand ziet het. Hij hoeft er geen bedankje voor. Een jongere speler die zijn schoenen bij het hek vergeten is, krijgt een paar van hem. Het is geen groot gebaar. Het is werk dat gedaan moest worden, zonder applaus.',
          traditionNote:
            'Sommige kerken, waaronder veel rooms-katholieke, oosters-orthodoxe en anglicaanse gemeenschappen, herdenken de voetwassing in de liturgie van Witte Donderdag. Bij een aantal doopsgezinde en andere gemeenten is voetwassing een vast gebruik. Andere tradities zien het vooral als een voorbeeld voor een dienende levenshouding.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Welke taak in jouw omgeving blijft vaak liggen omdat niemand haar graag doet, en wat zou het zijn om die vandaag stilletjes te doen?',
            hint: 'Er is geen goed of fout antwoord. Het gaat om eerlijk kijken.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Dien één keer onopvallend',
            description:
              'Doe vandaag iets voor iemand zonder dat je erop wordt aangekeken: een taak overnemen, iets opruimen, een kop koffie neerzetten. Zeg er niets over. Kijk ook of je zelf iets kunt aannemen, zoals hulp, een compliment of een gebaar.',
          },
          prayer:
            'God, leer mij mijn handen te gebruiken zonder erkenning te zoeken, en leer mij ook ontvangen. Amen.',
        },
      ],
    },
  },
};
