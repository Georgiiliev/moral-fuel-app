import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day12: Lesson = {
  id: 'day-12-honesty-integrity',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 12,
  sectionId: 'week-2',
  level: 'beginner',
  topics: ['integrity'],
  readingMinutes: 3,
  passage: { book: 'LUK', chapter: 19, verseStart: 1, verseEnd: 10 },
  relatedPassages: [
    { book: 'EPH', chapter: 4, verseStart: 25 },
    { book: 'PRO', chapter: 10, verseStart: 9 },
  ],
  source: {
    contextChecked: { book: 'LUK', chapter: 19, verseStart: 1, verseEnd: 10 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Eerlijkheid en integriteit',
      summary:
        'Zacheüs, een rijke belastinginner, wordt door Jezus opgemerkt en herstelt daarna wat hij verkeerd deed. Over de waarheid spreken als niemand kijkt.',
      objective: 'Je kiest één terrein waarop je eerlijker wilt leven.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Integriteit groeit vanuit ontvangen genade, niet vanuit angst om betrapt te worden. Wie zich gezien en aanvaard weet, kan het zich permitteren eerlijk te zijn.',
          passageSummary:
            'In Jericho woont Zacheüs, een hoofdtollenaar en rijk. Hij wil Jezus zien, maar is klein van stuk en de menigte staat in de weg, dus klimt hij in een moerbeivijgeboom. Jezus blijft staan, roept hem bij zijn naam en zegt dat Hij vandaag bij hem te gast wil zijn. Zacheüs komt haastig naar beneden en ontvangt Hem blij. De omstanders mompelen dat Jezus bij een zondaar logeert. Dan zegt Zacheüs dat hij de helft van zijn bezittingen aan de armen geeft, en dat hij iedereen die hij heeft opgelicht vierdubbel terugbetaalt. Jezus zegt dat er vandaag redding is gekomen voor dit huis, en dat Hij is gekomen om te zoeken en te redden wat verloren is.',
          context:
            'Jericho lag op de route naar Jeruzalem, waar Jezus naartoe onderweg was. Tollenaars haalden belasting op voor het Romeinse bestuur en stonden bekend als mensen die er vaak meer voor zichzelf uit haalden dan toegestaan. Daardoor werden ze door veel landgenoten gemeden. Als hoofdtollenaar was Zacheüs er rijk van geworden. Lucas vertelt dit direct na de genezing van een blinde bedelaar bij Jericho (Lucas 18:35-43).',
          explanation: [
            'Let op de volgorde. Jezus nodigt zichzelf uit bij Zacheüs voordat die iets heeft rechtgezet. De verandering komt nadat hij is aangesproken, niet eerder. Hij hoeft zich niet eerst te bewijzen. Integriteit is hier een antwoord op genade, geen betaling ervoor.',
            'Wat Zacheüs daarna doet is concreet. Hij laat het niet bij spijt of een goed gevoel, maar herstelt wat hij kapotmaakte, in geld, met een royale marge. Eerlijkheid blijft in dit verhaal niet in het hoofd zitten; ze heeft gevolgen voor zijn portemonnee. Dat is wat integriteit betekent: wat je zegt, doe je ook als niemand toekijkt.',
            'In kleine dingen begint het. Paulus roept christenen op om de leugen af te leggen en de waarheid te spreken met elkaar, omdat we ledematen van elkaar zijn (Efeziërs 4:25). Het boek Spreuken zegt dat wie onberispelijk leeft, veilig leeft, terwijl wie kromme wegen bewandelt zal worden ontmaskerd (Spreuken 10:9). Dat is een algemeen levensinzicht en geen garantie: eerlijke mensen hebben ook problemen.',
            'Eerlijk worden kan iets kosten. Kies daarom klein, rustig en haalbaar, en laat angst niet je drijfveer zijn. Een fout toegeven maakt je niet minder waard.',
          ],
          example:
            'Een zzp’er die voor een klant een offerte heeft gemaakt, ziet dat de klant per ongeluk te weinig is gefactureerd. Niemand merkt het ooit. Hij overweegt het te laten. Dan belt hij toch en legt het uit. De klant is verrast en vraagt zich af waarom hij dat deed. Het kostte hem driehonderd euro, maar hij slaapt beter en de klant vertrouwt hem nu meer.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Op welk gebied ben je minder eerlijk dan je zou willen, zoals in je werk, online, thuis of tegenover jezelf?',
            hint: 'Denk aan kleine dingen: een uitvlucht, een overdrijving, een gezwegen waarheid. Je hoeft er nu niets aan te doen, alleen te kijken.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Kies één terrein voor eerlijkheid',
            description:
              'Kies één plek waar je vandaag iets eerlijker kunt zijn, bijvoorbeeld een urenstaat, een uitvlucht of een bericht waarin je iets mooier voorstelt. Doe daar één kleine, haalbare stap. Is er iets groters dat gerechtigheid vraagt, bespreek het dan eerst met iemand die je vertrouwt.',
          },
          prayer:
            'God, U kent mij helemaal en wijst mij niet af. Geef mij de rust om eerlijk te zijn, ook waar niemand het ziet. Amen.',
        },
      ],
    },
  },
};
