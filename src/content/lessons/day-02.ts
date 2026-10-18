import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day02: Lesson = {
  id: 'day-02-who-is-jesus',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 2,
  sectionId: 'week-1',
  level: 'beginner',
  topics: ['faith-basics', 'jesus'],
  readingMinutes: 3,
  passage: { book: 'MRK', chapter: 8, verseStart: 27, verseEnd: 30 },
  relatedPassages: [
    { book: 'MRK', chapter: 8, verseStart: 31, verseEnd: 33 },
    { book: 'JHN', chapter: 1, verseStart: 14 },
  ],
  source: {
    contextChecked: { book: 'MRK', chapter: 8, verseStart: 27, verseEnd: 38 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Wie is Jezus?',
      summary:
        'Jezus vroeg zijn leerlingen zelf wie zij dachten dat Hij was. Vandaag kijk je naar die vraag, en naar wat christenen erop antwoorden.',
      objective:
        'Je weet wat christenen bedoelen met Messias en Zoon van God, en je kunt verwoorden wat jij nu van Jezus denkt.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'De belangrijkste vraag over Jezus is niet alleen wat anderen over Hem zeggen, maar wie Hij voor jou is.',
          passageSummary:
            'Onderweg naar de dorpen bij Caesarea Filippi vraagt Jezus zijn leerlingen wat de mensen over Hem zeggen. Ze noemen verschillende antwoorden: Johannes de Doper, Elia, een van de profeten. Dan vraagt Jezus wie zij zelf zeggen dat Hij is. Petrus antwoordt dat Hij de Messias is. Jezus vraagt hun daar nog met niemand over te spreken. Direct daarna legt Hij uit dat Hij zal lijden, sterven en opstaan.',
          context:
            'Het Marcusevangelie is volgens de meeste onderzoekers het oudste van de vier evangeliën. Dit gesprek staat midden in het boek en vormt een keerpunt: tot hier draait het om de vraag wie Jezus is, vanaf hier gaat Hij op weg naar Jeruzalem en spreekt Hij over zijn lijden. Caesarea Filippi lag in het noorden, bij een tempel voor de keizer en een heiligdom voor de god Pan: een opvallende plek voor de vraag wie de echte koning is.',
          explanation: [
            'Jezus was een historisch persoon: een Joodse leraar uit Nazaret, die rond het jaar 30 in Jeruzalem werd gekruisigd. Daarover zijn historici het breed eens. De vraag is wie Hij was.',
            'Messias, in het Grieks Christus, betekent gezalfde: de koning die God aan Israël had beloofd. Petrus geeft een groot antwoord, maar begrijpt het nog maar half. Meteen daarna wil hij niet horen dat de Messias moet lijden (Marcus 8:31-33). Jezus past niet in het plaatje van een machtige held.',
            'Christenen geloven dat Jezus meer is dan een goede leraar of profeet. Het Johannesevangelie zegt dat in Jezus het Woord, God zelf, mens werd (Johannes 1:14). Daarom noemen christenen Hem de Zoon van God: geen tweede god, maar God die zich op een menselijke manier laat kennen.',
          ],
          example:
            'Denk aan iemand over wie je veel hebt gehoord, maar die je nooit echt hebt gesproken. Je kunt alle meningen verzamelen, maar pas als je zelf luistert, vorm je een eigen beeld. Zo is het ook met Jezus. Lees de verhalen over Hem en kijk hoe Hij omgaat met mensen aan de rand, met macht en met vergeving.',
          traditionNote:
            'Alle grote christelijke kerken belijden dat Jezus waarlijk God en waarlijk mens is, zoals verwoord in de vroege geloofsbelijdenissen. Hoe dat te begrijpen is, wordt in verschillende tradities met eigen accenten uitgelegd.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Als Jezus jou vandaag zou vragen wie Hij voor jou is, wat zou je dan eerlijk antwoorden?',
            hint: 'Een tussenantwoord als "ik weet het nog niet" is ook een antwoord.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Lees één verhaal over Jezus',
            description:
              'Lees vandaag Marcus 2:1-12 of Marcus 10:46-52 in een Bijbel of Bijbelapp. Let op één ding: hoe gaat Jezus om met de persoon die bij Hem komt?',
          },
          prayer:
            'Jezus, ik wil leren wie U werkelijk bent, niet alleen wat anderen over U zeggen. Laat mij U beter leren kennen. Amen.',
        },
      ],
    },
  },
};
