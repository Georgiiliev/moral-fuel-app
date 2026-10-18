import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day29: Lesson = {
  id: 'day-29-looking-back-at-your-growth',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 29,
  sectionId: 'week-4',
  level: 'beginner',
  topics: ['reflection', 'gratitude', 'trust'],
  readingMinutes: 4,
  passage: { book: 'PSA', chapter: 139 },
  relatedPassages: [
    { book: 'LAM', chapter: 3, verseStart: 22, verseEnd: 23 },
    { book: 'PHP', chapter: 1, verseStart: 6 },
  ],
  source: {
    contextChecked: { book: 'PSA', chapter: 139 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Terugblik op je groei',
      summary:
        'Psalm 139 beschrijft iemand die zich gekend voelt tot in zijn diepste gedachten. Het is een goed moment om terug te kijken op dertig dagen, zonder jezelf te beoordelen.',
      objective:
        'Je kijkt terug op de afgelopen dertig dagen, benoemt wat je opviel en wat je hielp, en doet dat zonder jezelf af te rekenen.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Je wordt gekend, niet beoordeeld op een cijfer. Terugkijken is bedoeld om te zien wat er is, niet om te beslissen of je geslaagd bent.',
          passageSummary:
            'De dichter zegt dat God hem onderzoekt en kent: wanneer hij zit of opstaat, wat hij denkt, waar hij gaat en ligt. Er is geen plek waar hij aan God kan ontsnappen, in de hemel niet, in de dodenwereld niet, aan de uiterste zee niet, en zelfs duisternis is voor God niet donker. De dichter ziet zijn leven als iets wat God zorgvuldig heeft gevormd, al voor hij geboren werd, en looft God daarvoor. Aan het slot klinken ook scherpe woorden over mensen die kwaad doen. Het eindigt met een open gebed: onderzoek mij, ken mijn hart en leid mij op een weg die blijft bestaan.',
          context:
            'Het opschrift noemt David als dichter. De psalm wordt in de joodse en christelijke traditie veel gebruikt bij vragen over wie je bent en waar je vandaan komt. Psalmen zijn gebeden en liederen, geen leerstellige uiteenzettingen. Ze bevatten ook woede en twijfel. Het scherpe deel in de psalm (Psalm 139:19-22) laat zien dat de dichter eerlijk is over zijn gevoelens, ook de donkere.',
          explanation: [
            'Het meest verrassende is hoe dicht God hier bij de mens staat. Dat kan beklemmend klinken, alsof je altijd bekeken wordt. Maar de dichter ervaart het als troost: hij is er nooit alleen voor. Gekend worden is niet hetzelfde als beoordeeld worden.',
            'Voor een terugblik betekent dat: kijk naar de dertig dagen zoals je naar een vriend zou kijken. Wat heb je geleerd? Wat viel je op? Wat raakte je, en wat liet je koud? Welke dagen sloeg je over, en wat zegt dat over wat nu niet kon, in plaats van wat er mis is met jou?',
            'De dichter van Klaagliederen zegt dat Gods goedertierenheid niet op is en elke ochtend nieuw is (Klaagliederen 3:22-23). Paulus schrijft vertrouwen uit dat God het goede werk dat hij begonnen is, ook zal voltooien (Filippenzen 1:6). Dat geeft ruimte: niet jij hoeft het geloof te maken, jij mag er stap voor stap in meegaan.',
            'Als je tijdens de terugblik vooral teleurstelling voelt, is dat ook informatie. Misschien was het tempo te hoog, of past een ander ritme beter bij je. Dat is geen mislukking maar een uitkomst waar je mee verder kunt.',
          ],
          example:
            'Noor werkt als leerkracht en heeft de dertig dagen vooral in de pauzes en in de trein gedaan. Ze schrijft drie dingen op: ze heeft vaker even stilgestaan bij wat ze voelt, ze mist een gesprek met iemand die dit ook meemaakt, en ze heeft twee weken niets gedaan. Ze wil zichzelf eerst een standje geven, maar schrijft eronder: dat was de drukste periode van het schooljaar. Ze laat het zo staan.',
          traditionNote:
            'Veel christenen kennen een vorm van dagelijkse terugblik. In de katholieke en anglicaanse traditie is dat bijvoorbeeld het onderzoek van de dag, vaak aan het einde van de dag. Protestanten schrijven vaker een dagboek of bespreken hun weg in een kring. Je hoeft er geen naam of vorm aan te geven.',
          careNote:
            'Merk je dat terugkijken vooral zware gedachten, schuldgevoel of leegte oproept die niet weggaan? Praat erover met je huisarts of met iemand die je vertrouwt. Een gebed of een terugblik vervangt geen professionele hulp. Denk je aan zelfdoding, bel dan 113 of 0800-0113 (gratis). Bij direct gevaar bel je 112.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Wat heb je de afgelopen dertig dagen gezien, gehoord of gevoeld dat je anders niet had opgemerkt?',
            hint: 'Het mag klein zijn, ook een vraag, een twijfel of een dag waarop je niets deed.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Een eerlijke terugblik in drie regels',
            description:
              'Schrijf drie regels: iets wat je raakte, iets wat je tegenhield en iets wat je wilt meenemen. Beoordeel jezelf niet met een cijfer. Wil je er liever met iemand over praten, dan mag dat ook.',
          },
          prayer:
            'God, dank voor wat ik deze weken heb mogen zien, ook wat niet lukte. Als U mij kent zoals ik ben, help mij dan dat ook te geloven. Amen.',
        },
      ],
    },
  },
};
