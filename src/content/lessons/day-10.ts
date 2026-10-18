import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day10: Lesson = {
  id: 'day-10-forgiveness-boundaries',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 10,
  sectionId: 'week-2',
  level: 'beginner',
  topics: ['forgiveness', 'relationships'],
  readingMinutes: 5,
  passage: { book: 'MAT', chapter: 18, verseStart: 21, verseEnd: 35 },
  relatedPassages: [
    { book: 'ROM', chapter: 12, verseStart: 17, verseEnd: 21 },
    { book: 'GEN', chapter: 50, verseStart: 15, verseEnd: 21 },
  ],
  source: {
    contextChecked: { book: 'MAT', chapter: 18, verseStart: 15, verseEnd: 35 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Vergeven zonder goed te praten',
      summary:
        'Jezus vertelt over een dienaar die een enorme schuld kwijtgescholden krijgt. Wat betekent vergeving, en wat niet? Over vergeven, gerechtigheid en grenzen.',
      objective: 'Je kunt het verschil uitleggen tussen vergeven, verzoenen en grenzen stellen.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Vergeven betekent dat je de rekening loslaat, niet dat je doet alsof er niets gebeurd is. Het is niet hetzelfde als goedpraten, als verzoenen tegen elke prijs, of als onveilig blijven.',
          passageSummary:
            'Petrus vraagt Jezus hoe vaak hij iemand moet vergeven die tegen hem zondigt, en stelt zelf voor: zevenmaal. Jezus antwoordt met een getal dat zo hoog is dat tellen zinloos wordt. Daarna vertelt Hij over een koning die afrekent met zijn dienaren. Een dienaar die een gigantisch bedrag schuldig is, smeekt om uitstel en krijgt de hele schuld kwijtgescholden. Even later treft hij een collega die hem een klein bedrag schuldig is en laat die in de gevangenis zetten, ondanks diens smeekbeden. Als de koning dit hoort, is hij verontwaardigd en zegt dat de eerste dienaar toch ook genade had moeten tonen.',
          context:
            'Dit staat in een gedeelte van Matteüs waarin Jezus onderwijst over het leven in de gemeente van zijn volgelingen. Vlak ervoor beschrijft Hij hoe je iemand die tegen je zondigt eerst onder vier ogen aanspreekt, en pas daarna met anderen erbij (Matteüs 18:15-20). Vergeving gaat in zijn onderwijs dus samen met eerlijk benoemen wat er mis ging. De vraag van Petrus komt daaruit voort. Een talent was een zeer grote geldeenheid, een denarie het loon voor een dag werk. Het verschil in de twee schulden is bewust overdreven.',
          explanation: [
            'Het verhaal draait om verhoudingen. De eerste dienaar kon zijn schuld nooit terugbetalen, en toch kreeg hij ruimte. Jezus wil laten zien dat wie genade heeft ontvangen, die ook kan doorgeven. Wie zijn eigen schuld serieus neemt, ziet de schuld van een ander in een ander licht.',
            'Het slot van het verhaal klinkt streng. Veel uitleggers lezen het als een ernstige waarschuwing tegen een hard hart, niet als een middel om mensen onder druk te zetten. Het is een gelijkenis, geen handleiding, en vooral geen reden om iemand die diep gekwetst is te zeggen dat die snel moet vergeven. Vergeving is vaak een proces van weken, maanden of jaren, en mag zo lang duren als nodig is.',
            'Vergeven is niet hetzelfde als goedpraten. Wat is gebeurd, was fout, en dat mag zo genoemd worden. Het is ook niet hetzelfde als excuseren of vergeten. Het betekent dat je de wens loslaat om het terug te betalen en dat je de ander niet langer vastzet in je hoofd. Ook Matteüs 18 begint met het benoemen van wat er misging.',
            'Vergeven is ook niet hetzelfde als verzoenen. Voor verzoening zijn twee mensen nodig, met erkenning van schuld en vertrouwen dat zich langzaam herstelt. Je kunt vergeven en toch afstand houden, grenzen stellen of een relatie beëindigen. Paulus schrijft dat je, voor zover het van jou afhangt, vrede kunt zoeken met alle mensen, en dat je het kwaad niet met kwaad vergeldt (Romeinen 12:17-21). In die zin staat voor zover het van jou afhangt: vrede hangt niet alleen van jou af. In het verhaal van Jozef en zijn broers (Genesis 50:15-21) zie je dat vergeving en erkenning van wat er is gebeurd samen kunnen gaan.',
          ],
          example:
            'Een collega heeft in een teamoverleg jouw idee als het zijne gepresenteerd, en dat niet voor het eerst. Je bent er nog steeds kwaad over. Vergeven betekent hier niet dat je moet glimlachen en het laten gaan. Je kunt hem aanspreken, het zo nodig bij je leidinggevende neerleggen en toch het verlangen loslaten hem terug te pakken. Als hij het niet erkent, kun je aan jouw kant vergeven en tegelijk voortaan voorzichtiger zijn met wat je met hem deelt.',
          traditionNote:
            'Christenen verschillen in hoe ze vergeving en verzoening in een gemeente vormgeven: sommige tradities kennen de biecht en een uitgesproken absolutie door een priester, andere benadrukken persoonlijke belijdenis en gesprek met een medegelovige. Ze zijn het erover eens dat vergeving voortkomt uit Gods genade.',
          careNote:
            'Heeft iemand je geweld of misbruik aangedaan, of ben je er nog mee in aanraking? Dan hoef je niet te vergeven om veilig te zijn, en vergeving vraagt nooit dat je onveilig blijft of contact met de dader moet houden. Zoek hulp. In Nederland kun je dag en nacht gratis bellen met Veilig Thuis: 0800-2000. Bij direct gevaar bel je 112. Praat ook met je huisarts als de pijn blijft hangen.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Is er iets of iemand dat je al lang met je meedraagt? Wat zou het voor jou betekenen om dat op jouw tempo los te laten, zonder dat het daarmee goed wordt gepraat?',
            hint: 'Het mag om iets kleins gaan. Je hoeft nu niets te beslissen over contact met die persoon.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Schrijf op wat je loslaat en wat je bewaart',
            description:
              'Neem een papiertje en maak twee kolommen. In de ene schrijf je wat je wilt loslaten, bijvoorbeeld de wens om het terug te betalen. In de andere wat je wel bewaart, zoals een grens of afstand. Het blijft van jou. Je hoeft er niets mee te doen en niemand te benaderen.',
          },
          prayer:
            'God, U kent wat mij is aangedaan, en wat ik zelf heb aangericht. Help mij loslaten wat ik kan loslaten, op mijn eigen tempo, en bescherm mij waar ik bescherming nodig heb. Amen.',
        },
      ],
    },
  },
};
