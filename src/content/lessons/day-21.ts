import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day21: Lesson = {
  id: 'day-21-looking-back-hard-moments',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 21,
  sectionId: 'week-3',
  level: 'beginner',
  topics: ['reflection', 'emotions'],
  readingMinutes: 3,
  passage: { book: '2CO', chapter: 4, verseStart: 7, verseEnd: 18 },
  relatedPassages: [{ book: 'PSA', chapter: 121 }],
  source: {
    contextChecked: { book: '2CO', chapter: 4, verseStart: 1, verseEnd: 18 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Terugblik op moeilijke momenten',
      summary:
        'Een rustige terugblik op week 3. Paulus noemt zichzelf een aarden pot: breekbaar, maar met iets kostbaars erin. Wat hielp jou deze week?',
      objective:
        'Je benoemt wat je hielp op moeilijke momenten en waar je steun voor nodig hebt.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Je hoeft niet sterk te zijn om te mogen blijven staan. Gebrokenheid en hoop kunnen tegelijk waar zijn, en je hoeft niets goed te praten.',
          passageSummary:
            'Paulus schrijft dat hij en zijn medewerkers een kostbare schat dragen in aarden potten, zodat duidelijk is dat de kracht van God komt en niet van henzelf. Ze worden van alle kanten belaagd, maar niet verpletterd; ze zijn radeloos, maar niet wanhopig; vervolgd, maar niet verlaten; neergeslagen, maar niet vernietigd. Ze dragen steeds het sterven van Jezus mee, zodat ook zijn leven zichtbaar wordt. Uiterlijk gaan ze achteruit, maar innerlijk worden ze dag aan dag vernieuwd. Wat nu zichtbaar is, is tijdelijk, wat nog niet zichtbaar is, blijft.',
          context:
            'Paulus schreef deze brief aan de gemeente in Korinte, waar zijn gezag werd betwist. Hij verdedigt zijn dienst niet door te laten zien hoe sterk hij is, maar door te vertellen hoe kwetsbaar. Verderop in de brief noemt hij zijn zwakheid ook (2 Korintiërs 12:9-10). Een aarden pot was een alledaags en goedkoop voorwerp, geschikt om te gebruiken en weg te gooien.',
          explanation: [
            'Het beeld van de pot is eerlijk. Paulus ontkent de scheuren niet. Hij somt ze op: belaagd, radeloos, vervolgd, neergeslagen. Maar elke keer volgt een tegenhanger: niet verpletterd, niet wanhopig, niet verlaten, niet vernietigd. Het gaat niet om doen alsof het meevalt, maar om te merken dat er nog iets overeind blijft.',
            'Die lijn past bij de afgelopen week. Je keek naar zorgen, boosheid, twijfel, rouw, verleiding en volharding. Wat die onderwerpen delen, is dat je er niet bovenuit hoeft te komen om welkom te zijn. Genade is er voor mensen die breekbaar zijn.',
            'Paulus spreekt ook over hoop op wat nog niet zichtbaar is. Dat is geen vlucht uit het heden: hij schrijft vanuit echte pijn. Maar het geeft perspectief. Veel christenen vinden daarin troost dat het huidige lijden niet het laatste woord heeft. Wie dat nu niet kan geloven, mag dat zeggen.',
            'Psalm 121 past hierbij als een rustige afsluiter. De dichter kijkt naar de bergen en vraagt waar zijn hulp vandaan komt. Het antwoord is geruststellend: God slaapt niet, behoedt je bij komen en gaan. Het is een psalm voor onderweg, ook voor dagen waarop je moe bent.',
          ],
          example:
            'Karim is 36, werkt in de logistiek en heeft een zware maand achter de rug: een ruzie met zijn broer, een zieke moeder, slecht slapen. Op zaterdag neemt hij een uur om op papier te zetten wat hem hielp: een wandeling met een collega, een gesprek met zijn huisarts, drie minuten stilte in de auto. Er staat niets spectaculairs op. Maar het is een lijstje om morgen op terug te vallen.',
          careNote:
            'Merk je dat de moeilijke momenten niet overgaan, of dat ze zwaarder worden? Bespreek dat met je huisarts. Heb je gedachten aan zelfdoding, bel dan 113 Zelfmoordpreventie (113 of gratis 0800-0113). Is er sprake van geweld of misbruik thuis, bel dan Veilig Thuis (gratis 0800-2000). Bij direct gevaar bel je 112.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Wat hielp je deze week op een moeilijk moment? Wat zou je willen meenemen naar de week die komt?',
            hint: 'Het mag klein zijn: een gesprek, een wandeling, een nacht slaap, een zin uit een les.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Maak een lijstje van wat helpt',
            description:
              'Schrijf drie dingen op die je deze week hielpen. Leg het lijstje op een plek waar je het snel kunt terugvinden. Als je er iemand bij kunt noemen, stuur die persoon dan vandaag een kort bericht.',
          },
          prayer:
            'God, dank voor wat mij deze week overeind hield, zelfs als ik niet wist wat het was. Houd mij vast waar ik breek, en laat mij niet alleen. Amen.',
        },
      ],
    },
  },
};
