import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day04: Lesson = {
  id: 'day-04-grace-forgiveness',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 4,
  sectionId: 'week-1',
  level: 'beginner',
  topics: ['grace', 'forgiveness', 'relationships'],
  readingMinutes: 3,
  passage: { book: 'LUK', chapter: 15, verseStart: 11, verseEnd: 32 },
  relatedPassages: [{ book: 'EPH', chapter: 2, verseStart: 8, verseEnd: 10 }],
  source: {
    contextChecked: { book: 'LUK', chapter: 15, verseStart: 1, verseEnd: 32 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Genade en vergeving',
      summary:
        'Een vader die zijn verloren zoon tegemoet rent. Jezus’ bekendste verhaal laat zien wat genade is, en waarom die zowel de weggelopen zoon als de brave broer verrast.',
      objective:
        'Je kunt uitleggen wat genade is, waarom die niet verdiend wordt, en wat vergeving wel en niet betekent.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Genade betekent dat je wordt ontvangen voordat je alles hebt goedgemaakt. Gods liefde is geen beloning, maar een geschenk.',
          passageSummary:
            'Een jongere zoon vraagt zijn erfdeel op, vertrekt naar een ver land en verspilt alles. Als er hongersnood uitbreekt, belandt hij bij de varkens en besluit hij terug te gaan om als knecht te werken. Zijn vader ziet hem al van ver, wordt met medelijden bewogen, rent naar hem toe en omhelst hem. Hij laat een feest aanrichten. De oudere zoon, die altijd thuis heeft gewerkt, wordt boos en wil niet naar binnen. De vader gaat ook naar hem toe en nodigt hem uit om mee te vieren.',
          context:
            'Lucas 15 bevat drie verhalen achter elkaar: over een verloren schaap, een verloren munt en een verloren zoon. Jezus vertelt ze aan Farizeeën en schriftgeleerden die er aanstoot aan nemen dat Hij met tollenaars en zondaars eet (Lucas 15:1-2). In die cultuur was het ongehoord dat een zoon zijn erfdeel opeiste terwijl zijn vader nog leefde, en ongepast dat een oudere, aanzienlijke man in het openbaar ging rennen.',
          explanation: [
            'Jezus vertelt dit verhaal aan mensen die klagen dat Hij omgaat met mensen met een slechte naam (Lucas 15:1-2). Het verhaal heeft twee zonen, en allebei hebben ze genade nodig: de een omdat hij is weggelopen, de ander omdat hij denkt dat hij liefde moet verdienen.',
            'De vader wacht niet tot zijn zoon zijn excuses netjes heeft afgemaakt. Hij rent. Dat is genade: liefde die niet wacht tot je het verdiend hebt. Paulus schrijft dat mensen gered worden uit genade, door geloof, als een geschenk van God en niet als iets om op te roemen (Efeziërs 2:8-9).',
            'Genade maakt het verkeerde niet onbelangrijk. De zoon erkent wat hij fout deed. Maar zijn terugkeer is niet de prijs voor de liefde van zijn vader; het is de weg terug naar een liefde die er al was.',
            'Vergeving betekent ook niet dat alles weer moet worden zoals vroeger, of dat je schadelijk gedrag moet blijven verdragen. Je kunt iemand vergeven en tegelijk grenzen stellen, afstand houden of hulp zoeken. Op dag 10 van de reis kom je hierop terug.',
          ],
          example:
            'Na een ruzie stuur je eindelijk een bericht aan een vriend die je lang hebt ontweken. Je hebt drie versies van je excuses geschreven. Voordat je bericht af is, belt hij je al: fijn dat je er bent. Zo voelt genade: je wordt eerder ontvangen dan je durfde te hopen.',
          traditionNote:
            'Tradities verschillen in hoe ze de rol zien van geloof, doop, sacramenten en een veranderd leven bij het ontvangen van genade. Ze zijn het erover eens dat Gods genade voorop gaat en niet te koop is.',
          careNote:
            'Ben je in een situatie van geweld of misbruik? Vergeving vraagt niet dat je onveilig blijft. Zoek hulp bij iemand die je vertrouwt. In Nederland kun je dag en nacht gratis bellen met Veilig Thuis: 0800-2000. Bij direct gevaar bel je 112.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Herken je jezelf meer in de jongste zoon, die weg was, of in de oudste, die dacht dat hij alles goed deed? Wat zou de vader tegen jou zeggen?',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Geef vandaag een beetje genade',
            description:
              'Kies één klein moment waarop je iemand niet afrekent op een fout: een collega die iets vergeet, een huisgenoot die te laat is. Reageer met geduld in plaats van met een rekening. Lukt het niet? Ook dan geldt genade, voor jou.',
          },
          prayer:
            'Vader, dank U dat U mij tegemoetkomt voordat ik alles heb goedgemaakt. Help mij die genade te ontvangen, en haar ook aan anderen te geven, met wijsheid en goede grenzen. Amen.',
        },
      ],
    },
  },
};
