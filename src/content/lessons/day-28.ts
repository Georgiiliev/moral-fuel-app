import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day28: Lesson = {
  id: 'day-28-taking-the-next-step',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 28,
  sectionId: 'week-4',
  level: 'beginner',
  topics: ['habits', 'reflection', 'faith-basics'],
  readingMinutes: 3,
  passage: { book: 'PHP', chapter: 3, verseStart: 12, verseEnd: 14 },
  relatedPassages: [
    { book: 'MAT', chapter: 28, verseStart: 19, verseEnd: 20 },
    { book: 'MIC', chapter: 6, verseStart: 8 },
  ],
  source: {
    contextChecked: { book: 'PHP', chapter: 3, verseStart: 1, verseEnd: 21 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'De volgende stap zetten',
      summary:
        'Paulus schrijft dat hij nog niet is aangekomen, maar doorgaat. Geloof is geen eindstreep die je haalt, maar een weg waarop je één stap tegelijk zet, in je eigen tempo.',
      objective:
        'Je benoemt één volgende stap die bij jou past, zonder druk, en je weet dat kiezen voor nu niets doen ook een keuze kan zijn.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Groeien in geloof is geen wedstrijd. Je mag vooruitkijken zonder jezelf af te rekenen op wat nog niet lukt.',
          passageSummary:
            'Paulus schrijft aan de gemeente in Filippi dat hij nog niet alles heeft bereikt en nog niet volmaakt is. Hij jaagt erop door, omdat Christus hem zelf heeft gegrepen. Hij zegt dat hij zichzelf niet beschouwt als iemand die er al is. Eén ding doet hij: vergeten wat achter hem ligt, zich uitstrekken naar wat voor hem ligt en op het doel afgaan, naar de prijs van Gods roeping in Christus.',
          context:
            'Paulus schrijft vanuit de gevangenis aan een gemeente die hij zelf heeft gesticht en waarmee hij een warme band heeft. Kort ervoor zet hij op een rij waarop hij vroeger trots was, zoals zijn afkomst en zijn strikte religieuze leven, en zegt hij dat dat alles voor hem niet meer telt vergeleken bij het kennen van Christus (Filippenzen 3:4-11). De tekst die volgt gebruikt het beeld van een hardloper.',
          explanation: [
            'Het is opvallend dat iemand als Paulus zegt dat hij nog onderweg is. Als hij al geen eindpunt heeft bereikt, hoef jij dat zeker niet na dertig dagen. Je hoeft je ook niet te meten aan anderen die verder lijken. Groei verloopt bij iedereen anders, en soms ook achteruit.',
            'Vergeten wat achter je ligt betekent niet dat je je geschiedenis ontkent. Het betekent dat je je niet laat opsluiten door oude fouten of oude successen. Genade zorgt ervoor dat de volgende stap altijd mogelijk is, ook na een mislukte week.',
            'Wat zou een volgende stap kunnen zijn? Voor de een: elke dag een paar minuten bidden of lezen. Voor een ander: een kerkdienst bezoeken, een gesprek aangaan met een christen of een groep zoeken. Jezus roept zijn volgelingen op om mensen tot leerling te maken en te dopen (Matteüs 28:19-20), en de profeet Micha vat samen wat God vraagt: recht doen, trouw liefhebben en nederig met God gaan (Micha 6:8). Die brede weg kent veel eerste stappen.',
            'Soms is de eerlijkste stap: nog even niets beslissen. Dat is geen falen. Je mag blijven vragen, lezen en twijfelen.',
          ],
          example:
            'Bram is eenentwintig en heeft de afgelopen weken elke ochtend een psalm gelezen. Zijn vriendin, die niet gelooft, vraagt wat hij ervan vindt. Hij merkt dat hij het eigenlijk niet weet, maar wel dat hij de dag rustiger begint. Hij besluit niet meteen iets groots te doen, maar zijn vraag op te schrijven en die volgende week mee te nemen naar een gesprekskring. Dat is zijn volgende stap.',
          traditionNote:
            'Christenen verschillen in de plaats van de doop en kerklidmaatschap. Katholieken en orthodoxen dopen meestal kinderen en zien de doop als een sacrament; veel protestanten dopen kinderen ook, terwijl baptisten en pinkstergemeenten kiezen voor de doop van mensen die zelf belijden te geloven. Ook de weg naar lidmaatschap verschilt per kerk. Er is geen haast; je kunt gerust vragen wat een kerk hierover leert voordat je een beslissing neemt.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Als je morgen één kleine stap zou kunnen zetten in je zoektocht, wat zou dat dan zijn?',
            hint: 'Een stap als nog een week doorgaan of een vraag stellen telt ook mee.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Kies één stap en zet die op papier',
            description:
              'Schrijf één volgende stap op en noem wanneer je die zou kunnen zetten. Maak hem zo klein dat hij licht aanvoelt. Heb je geen stap? Dan is ook dat een antwoord, en je mag het gewoon zo laten.',
          },
          prayer:
            'God, ik weet niet waar dit naartoe gaat. Wijs mij de volgende stap, niet de hele weg. Geef mij geduld met mezelf. Amen.',
        },
      ],
    },
  },
};
