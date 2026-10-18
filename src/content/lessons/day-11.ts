import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day11: Lesson = {
  id: 'day-11-gratitude',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 11,
  sectionId: 'week-2',
  level: 'beginner',
  topics: ['gratitude', 'habits', 'prayer'],
  readingMinutes: 4,
  passage: { book: 'LUK', chapter: 17, verseStart: 11, verseEnd: 19 },
  relatedPassages: [
    { book: '1TH', chapter: 5, verseStart: 16, verseEnd: 18 },
    { book: 'PHP', chapter: 4, verseStart: 6, verseEnd: 7 },
  ],
  source: {
    contextChecked: { book: 'LUK', chapter: 17, verseStart: 11, verseEnd: 19 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Dankbaarheid',
      summary:
        'Tien mannen worden genezen, maar slechts één komt terug om te bedanken. Dankbaarheid als oefening in opmerken wat goed is, zonder het moeilijke weg te poetsen.',
      objective: 'Je oefent een eenvoudige dagelijkse gewoonte van danken.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Dankbaarheid is opmerken wat je is gegeven. Ze hoeft het moeilijke niet te ontkennen en kan naast verdriet bestaan.',
          passageSummary:
            'Onderweg naar Jeruzalem komt Jezus in een grensgebied tien mannen tegen met een huidziekte. Ze roepen op afstand om medelijden. Jezus stuurt hen naar de priesters, en terwijl ze onderweg zijn, worden ze schoon. Eén van hen, een Samaritaan, keert terug, looft God hardop en valt voor Jezus’ voeten om Hem te danken. Jezus vraagt of er niet tien zijn genezen en waar de anderen zijn, en zegt tegen de man dat hij kan opstaan en gaan, want zijn geloof heeft hem gered.',
          context:
            'Mensen met huidziekten, die in de Bijbel vaak als melaatsheid worden aangeduid, moesten volgens de wet buiten de gemeenschap leven en werden zo vaak ook sociaal buitengesloten. De priesters moesten vaststellen of iemand weer schoon was (Leviticus 13-14), vandaar de opdracht van Jezus. De dankbare man is een Samaritaan, iemand van wie Jezus’ Joodse hoorders weinig verwachtten. Lucas vertelt dit verhaal alleen in zijn evangelie.',
          explanation: [
            'Dit verhaal is geen verwijt aan de negen. Misschien renden ze naar de priesters, naar hun familie, naar het leven dat ze terug wilden. Dat is begrijpelijk. Maar de ene man staat stil en keert om. Jezus noemt dat niet verplicht, maar wel opvallend. Dankbaarheid is een keuze om even stil te staan bij wat je is gegeven, voordat je verder rent.',
            'Dankbaarheid ontstaat in de Bijbel vaak vanuit een ontmoeting. De man bedankt niet alleen voor het resultaat, maar ontmoet degene die hem heeft geholpen. Dankbaarheid wijst daardoor voorbij jezelf. Voor mensen die nog niet weten of ze in God geloven: je kunt het beginnen als eenvoudig opmerken van wat goed is, en later nadenken over aan wie je dat toeschrijft.',
            'Paulus roept op om in alle omstandigheden te danken (1 Tessalonicenzen 5:16-18). Let op: in alle omstandigheden, niet voor alle omstandigheden. Je hoeft pijn niet mooi te noemen. Dankbaarheid en verdriet kunnen naast elkaar bestaan. In Filippenzen 4:6-7 verbindt Paulus danken met bidden en belooft hij een vrede die ons verstand te boven gaat, geen oplossing voor al je problemen.',
            'Als dankbaarheid wordt afgedwongen, wordt het een last. Het is dan geen oefening meer, maar een plicht die zegt dat je je beter moet voelen. De Bijbel geeft ook ruimte aan klagen, vooral in de Psalmen. Eerlijk zijn over wat zwaar is hoort erbij.',
          ],
          example:
            'Een verpleegkundige in een ziekenhuis in Rotterdam komt na een lange nachtdienst thuis. Ze is uitgeput en ziet op tegen de dag. Voordat ze gaat slapen schrijft ze drie dingen op: de collega die haar koffie bracht, de patiënt die haar bedankte, en het feit dat ze nu in een warm bed ligt. Daarmee ontkent ze niet dat de dienst zwaar was. Ze zet alleen naast het zware ook wat goed was.',
          careNote:
            'Dankbaarheid hoort niet te voelen als een verplichting om vrolijk te zijn. Ben je in rouw, voel je je al langere tijd somber of leeg, dan kun je daarover praten met je huisarts. Geloof en professionele hulp sluiten elkaar niet uit. Denk je aan zelfdoding, bel dan 113 of 0800-0113 (gratis).',
        },
        {
          kind: 'reflect',
          prompt: {
            question: 'Wat is er vandaag of deze week, hoe klein ook, waarvoor je dank zou kunnen zeggen?',
            hint: 'Het mag klein zijn: een goed gesprek, warm water, een stuk stilte. Je hoeft niet meer te voelen dan er is.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Noem drie dingen aan het einde van de dag',
            description:
              'Schrijf of zeg vanavond drie dingen op die goed waren, hoe klein ook. Wil je het delen? Zeg tegen iemand dat je blij bent dat die er is. Lukt het niet, ook dan is het goed. Dankbaarheid hoeft niet te lukken om echt te zijn.',
          },
          prayer:
            'God, als U er bent: dank voor wat goed was vandaag. En voor wat zwaar was, heb ik geen mooie woorden. Wees bij mij, ook daar. Amen.',
        },
      ],
    },
  },
};
