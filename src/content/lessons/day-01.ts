import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day01: Lesson = {
  id: 'day-01-why-believe',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 1,
  sectionId: 'week-1',
  level: 'beginner',
  topics: ['faith-basics', 'doubt'],
  readingMinutes: 3,
  passage: { book: 'ACT', chapter: 17, verseStart: 22, verseEnd: 31 },
  relatedPassages: [{ book: 'ROM', chapter: 1, verseStart: 20 }],
  source: {
    contextChecked: { book: 'ACT', chapter: 17, verseStart: 16, verseEnd: 34 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Waarom zou je in God geloven?',
      summary:
        'Een eerlijke eerste verkenning: wat christenen bedoelen met God, en waarom geloof meer is dan een gok in het duister.',
      objective:
        'Je kunt in eigen woorden uitleggen waarom christenen geloven dat God te kennen is, en je weet welke vraag jij zelf meeneemt.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'God is volgens de Bijbel geen ver idee, maar Iemand die gevonden wil worden. Zoeken mag, twijfelen ook.',
          passageSummary:
            'Paulus staat in Athene, een stad vol tempels en filosofen. Hij wijst op een altaar dat gewijd is aan een onbekende god en zegt dat hij juist over die God wil vertellen. Hij beschrijft God als de Maker van de wereld, die niet in gebouwen woont en niets van mensen nodig heeft, maar zelf alles geeft. God heeft het zo gedaan dat mensen Hem zouden zoeken, en Hij is niet ver van ieder van ons. Paulus eindigt bij Jezus, die God uit de dood heeft opgewekt.',
          context:
            'Paulus is op zijn tweede reis. In Athene, het intellectuele centrum van de Griekse wereld, spreekt hij op de Areopagus, waar de stadsraad en denkers samenkwamen. Zijn publiek bestaat onder anderen uit epicureïsche en stoïsche filosofen (Handelingen 17:18): mensen die nadenken over goden, het lot en het goede leven, maar de Joodse Schriften niet kennen. Daarom begint Paulus niet bij Mozes of de profeten, maar bij wat zijn toehoorders zelf zien en zelf hebben gezegd.',
          explanation: [
            'Paulus begint niet met een preek over wat zijn publiek fout doet. Hij begint bij hun zoektocht. Dat is ook voor jou een goed vertrekpunt: christelijk geloof vraagt niet dat je je vragen inlevert, maar dat je ze serieus neemt.',
            'Christenen geloven dat God op verschillende manieren iets van zichzelf laat zien. In de schepping: in orde, schoonheid en in het feit dat er überhaupt iets is (zie ook Romeinen 1:20). In het geweten: in het besef dat goed en kwaad echt bestaan. En vooral, zeggen christenen, in Jezus: in wie Hij was, wat Hij deed en in zijn opstanding.',
            'Geen van deze dingen is een wiskundig bewijs. Geloof is in de Bijbel ook geen blinde sprong, maar vertrouwen op grond van redenen, ervaring en getuigenis. Veel mensen merken dat geloof groeit terwijl ze zoeken, niet pas wanneer alle vragen zijn opgelost.',
          ],
          example:
            'Je staat aan het eind van een drukke dag op je balkon. Je kijkt naar de lucht en voelt even dat er meer is dan je takenlijst. Of je bent bij de geboorte van een kind en merkt dat je geen woorden hebt. Christenen zouden zeggen: zulke momenten bewijzen niets, maar het kunnen wel wegwijzers zijn. Paulus nodigt je uit ze niet weg te wuiven, maar er verder over door te vragen.',
          traditionNote:
            'Christenen verschillen in hoeveel nadruk ze leggen op redeneringen over God, zoals argumenten vanuit de schepping, tegenover persoonlijke ervaring en openbaring. De meeste tradities zien beide als waardevol.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Welke vraag over God of over het geloof wil jij de komende dertig dagen eerlijk onderzoeken?',
            hint: 'Er is geen goed of fout antwoord. Je mag ook opschrijven wat je tegenhoudt.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Zet je vraag op een plek waar je hem terugziet',
            description:
              'Schrijf je vraag in de notities van je telefoon of op een briefje. Neem vandaag één minuut stilte om erover na te denken, bijvoorbeeld onderweg of voor het slapengaan. Je hoeft nog niets te concluderen.',
          },
          prayer:
            'God, als U er bent en gevonden wilt worden: help mij eerlijk te zoeken. Ik breng mijn vragen mee, en mijn twijfels ook. Amen.',
        },
      ],
    },
  },
};
