import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day25: Lesson = {
  id: 'day-25-responsible-with-money',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 25,
  sectionId: 'week-4',
  level: 'beginner',
  topics: ['money', 'habits', 'integrity'],
  readingMinutes: 4,
  passage: { book: 'LUK', chapter: 12, verseStart: 13, verseEnd: 21 },
  relatedPassages: [
    { book: '1TI', chapter: 6, verseStart: 6, verseEnd: 10 },
    { book: 'PRO', chapter: 21, verseStart: 20 },
  ],
  source: {
    contextChecked: { book: 'LUK', chapter: 12, verseStart: 13, verseEnd: 34 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Verantwoord omgaan met geld',
      summary:
        'Een rijke boer bouwt grotere schuren en denkt dat hij voor jaren is verzekerd. Jezus’ verhaal vraagt wat geld voor jou doet: dient het jou, of ben jij er stilletjes aan gaan dienen?',
      objective:
        'Je kijkt eerlijk naar je omgang met geld en kiest één verantwoorde gewoonte, zonder schuldgevoel of vergelijking.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Geld is een gewoon hulpmiddel, geen zekerheid die je leven draagt. Verstandig omgaan met geld en vrijgevig zijn horen bij elkaar.',
          passageSummary:
            'Iemand uit de menigte vraagt Jezus om zijn broer te zeggen de erfenis met hem te delen. Jezus weigert de rechter te spelen en waarschuwt voor elke vorm van hebzucht: iemands leven bestaat niet uit zijn bezit. Daarna vertelt hij over een rijke man met een overvloedige oogst. De man besluit zijn schuren af te breken en grotere te bouwen, en zegt tegen zichzelf dat hij nu jarenlang kan rusten, eten en genieten. God zegt hem dat zijn leven nog dezelfde nacht wordt opgeëist, en vraagt van wie dan zijn voorraad is. Zo gaat het, besluit Jezus, met wie schatten voor zichzelf verzamelt maar niet rijk is voor God.',
          context:
            'Jezus is onderweg met een grote menigte en leert zijn leerlingen over vertrouwen en onbezorgdheid (Lucas 12:1-12 en 12:22-34). Erfkwesties lagen in die cultuur gevoelig, en rabbijnen werden vaak als scheidsrechter ingeschakeld. De rijke boer in het verhaal is niet slecht omdat hij gewerkt heeft, maar omdat hij alleen met zichzelf praat en geen ander noemt.',
          explanation: [
            'Het verhaal verbiedt geen spaargeld of een goed boekje. De man wordt een dwaas genoemd omdat hij zijn hele toekomst op zijn voorraad bouwt en de mensen om hem heen en God niet in beeld heeft. Het draait om vertrouwen: waar leg ik mijn gevoel van veiligheid?',
            'Paulus schrijft dat godsvrucht met tevredenheid een grote winst is, en dat de liefde voor geld de wortel van veel kwaad is (1 Timoteüs 6:6-10). Let op: het gaat om de liefde voor geld, niet om geld zelf. Het boek Spreuken noemt wijze mensen degenen die verstandig reserves opbouwen, en dwazen degenen die alles opmaken (Spreuken 21:20). Zorgvuldig omgaan met geld is dus ook een vorm van wijsheid.',
            'Geloof is ook geen gokje om rijk te worden. Nergens belooft de Bijbel dat geloof je financieel succes oplevert, en je rijkdom zegt niets over hoe God over je denkt. Mensen met weinig geld zijn niet minder gezegend en mensen met veel geld niet vanzelf in het gelijk.',
            'Een eenvoudige gewoonte kan veel helpen: weten waar je geld naartoe gaat, iets achter de hand houden, en een vast deel bestemmen om te delen. Het mag klein zijn. Vrijgevigheid is geen prestatie; het is een manier om te oefenen dat jouw geld niet jouw baas is.',
          ],
          example:
            'Mehmet is zzp’er in de bouw en heeft de ene maand veel werk en de volgende bijna niets. Hij besluit op de eerste van de maand direct een vast bedrag opzij te zetten voor een buffer, en een klein bedrag voor de voedselbank bij hem in de wijk. Daarna kijkt hij voor het eerst echt naar zijn abonnementen en schrapt er twee die hij vergeten was. Hij voelt zich niet rijker, wel rustiger.',
          traditionNote:
            'Christenen denken verschillend over geven. Sommige kerken leren dat je een tiende van je inkomen geeft, als erkenning dat alles van God komt. Andere benadrukken dat Jezus’ leerlingen vrijwillig en blijmoedig geven, zonder vast percentage. Veel gelovigen geven aan hun kerk en aan goede doelen, en zijn het erover eens dat het niet om een bedrag gaat maar om een houding.',
          careNote:
            'Heb je schulden of betalingsachterstanden en weet je niet hoe verder? Schaam je niet. Via je gemeente kun je gratis schuldhulpverlening aanvragen. Hoe eerder je hulp zoekt, hoe meer er vaak nog mogelijk is. Kost de zorg om geld je je nachtrust of je gemoedsrust, praat dan ook met je huisarts.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Waar zoek je zekerheid, en wat zegt de manier waarop je met je geld omgaat daarover?',
            hint: 'Kijk gerust naar je laatste afschrift. Het hoeft niet mooi te zijn, alleen eerlijk.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Eén gewoonte voor je geld',
            description:
              'Kies één klein ding: je uitgaven van deze maand doorlopen, een abonnement opzeggen dat je niet gebruikt, een vast bedrag opzij zetten of iets kleins weggeven. Doe het één keer. Het gaat niet om perfect zijn, maar om bewust kiezen.',
          },
          prayer:
            'God, leer mij omgaan met wat ik heb, zonder dat het mij vasthoudt. Help mij tevreden te zijn waar dat kan en eerlijk waar het moeilijk is. Amen.',
        },
      ],
    },
  },
};
