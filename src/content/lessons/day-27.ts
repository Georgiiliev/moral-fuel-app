import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day27: Lesson = {
  id: 'day-27-faith-and-community',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 27,
  sectionId: 'week-4',
  level: 'beginner',
  topics: ['community', 'relationships', 'faith-basics'],
  readingMinutes: 4,
  passage: { book: 'ACT', chapter: 2, verseStart: 42, verseEnd: 47 },
  relatedPassages: [
    { book: 'HEB', chapter: 10, verseStart: 24, verseEnd: 25 },
    { book: '1CO', chapter: 12, verseStart: 12, verseEnd: 27 },
  ],
  source: {
    contextChecked: { book: 'ACT', chapter: 2, verseStart: 1, verseEnd: 47 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Geloof en gemeenschap',
      summary:
        'De eerste christenen gingen niet alleen op weg. Ze leerden, aten, baden en deelden samen. Vandaag kijk je naar wat gemeenschap kan geven, en waaraan je een veilige gemeenschap herkent.',
      objective:
        'Je benoemt wat je van een geloofsgemeenschap zou willen, en je weet waaraan je een veilige gemeenschap herkent.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Geloof is persoonlijk, maar niet bedoeld om alleen te beleven. Een goede gemeenschap geeft steun, uitdaging en vriendschap, zonder dwang.',
          passageSummary:
            'Na de uitstorting van de Geest en de eerste bekeringen in Jeruzalem beschrijft Lukas hoe de nieuwe gelovigen leefden. Ze bleven trouw aan het onderwijs van de apostelen, aan de gemeenschap, het breken van brood en het gebed. Er gebeurden veel wonderen en tekenen, ontzag vervulde de mensen, en wie geloofde had alles gemeenschappelijk: ze verkochten bezittingen en deelden met wie iets nodig had. Dagelijks kwamen ze samen in de tempel en aten ze met blijdschap thuis. Ze genoten de goedkeuring van het volk, en de Heer voegde dagelijks mensen toe.',
          context:
            'Handelingen 2 volgt op het Pinksterfeest, waarbij Petrus de menigte toespreekt en ongeveer drieduizend mensen zich laten dopen (Handelingen 2:1-41). De beschrijving hier is een korte samenvatting van het leven van de eerste gemeente in Jeruzalem. Lukas schetst een beeld van wat de gemeenschap kenmerkte, zonder te beweren dat het overal en altijd zo ging; in de brieven lees je ook over spanningen en conflicten.',
          explanation: [
            'Vier dingen komen steeds terug: leren, samen zijn, brood breken en bidden. Het zijn geen ingewikkelde programma’s. Het zijn gewone dingen die mensen aan elkaar verbinden: luisteren naar een verhaal, aan tafel zitten, voor elkaar bidden.',
            'Gemeenschap is meer dan een zondagse bijeenkomst. De schrijver van Hebreeën roept op om elkaar aan te moedigen tot liefde en goede daden en niet weg te blijven van elkaars bijeenkomsten (Hebreeën 10:24-25). Paulus vergelijkt de gemeente met een lichaam waarin elk deel nodig is, ook de delen die zwak lijken (1 Korintiërs 12:12-27). Jij hoeft niet alles te kunnen. Je hoeft er alleen te zijn.',
            'Een gemeenschap is niet vanzelf veilig omdat ze christelijk is. Let op signalen die om voorzichtigheid vragen: leiders die alles controleren en geen kritiek toestaan, druk om contact met familie of vrienden te verbreken, schaamte of angst als middel om mensen te laten gehoorzamen, en geen ruimte voor vragen of weggaan. Een gezonde gemeenschap staat vrijheid, openheid en onafhankelijke hulp toe.',
            'Je hoeft niet meteen te kiezen. Je kunt als bezoeker meekijken, meerdere plekken proberen en vragen stellen. Wie je welkom laat voelen zonder iets van je te eisen, is een goed teken.',
          ],
          example:
            'Joris is vorig jaar verhuisd naar Zwolle en kent bijna niemand. Een collega nodigt hem uit voor een buurtmaaltijd van een kerk. Hij gaat één keer, blijft aan de rand zitten en gaat na een uur weer weg. De volgende maand gaat hij weer. Niemand dringt aan. Na een paar keer vraagt iemand of hij mee wil fietsen. Hij zegt ja, zonder te weten wat hij van de kerk vindt. Hij heeft in elk geval een plek waar zijn naam bekend is.',
          traditionNote:
            'Kerken verschillen sterk in vorm: een liturgische eredienst met sacramenten en gebedenboek, een vrije gemeente met veel zang en spontaan gebed, een kleine huiskring, of een grote kerk met meerdere diensten. Protestanten, katholieken en orthodoxen hebben elk hun eigen opvattingen over leiderschap en het avondmaal of de eucharistie. Er is meer dan één goede vorm; het gaat erom dat je je thuis voelt en welkom bent.',
          careNote:
            'Voel je je in een gemeenschap onder druk gezet, beschaamd, geïsoleerd of bang om weg te gaan? Dat is niet jouw schuld, en je mag weggaan. Praat erover met iemand buiten die groep die je vertrouwt, of met je huisarts. Bij Veilig Thuis kun je gratis terecht op 0800-2000. Bij direct gevaar bel je 112.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Wat heb je nodig van een groep mensen om je daar vrij en veilig te voelen, en wat zou je zelf kunnen bijdragen?',
            hint: 'Denk aan een plek waar je je thuis voelde, met een gezin, in een club of op een werkplek.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Verken één plek',
            description:
              'Zoek een kerk, gesprekskring of Alpha-avond bij jou in de buurt en lees wat ze doen. Vind je het spannend, stuur dan een berichtje of ga als bezoeker mee, met een afspraak met jezelf dat je ook weer weg mag. Ken je al iemand uit een kerk, dan kun je diegene gewoon vragen mee te nemen.',
          },
          prayer:
            'God, als U er bent, leid mij dan naar mensen bij wie ik mezelf kan zijn. Geef mij wijsheid om te zien wat goed voor mij is. Amen.',
        },
      ],
    },
  },
};
