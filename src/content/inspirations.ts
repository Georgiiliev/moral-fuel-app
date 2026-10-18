import type { BibleReference, ContentReviewStatus, LanguageCode } from '@/models/content';

import { PHASE_1_DRAFT } from './review';

export const INSPIRATION_THEMES = ['trust', 'hope', 'love', 'forgiveness', 'gratitude', 'peace', 'everyday'] as const;
export type InspirationTheme = (typeof INSPIRATION_THEMES)[number];

/**
 * A short daily inspiration for widgets. Phase 2 holds paraphrases only: no Bible translation is
 * quoted, because exact wording from a licensed or verified public-domain source is not available.
 * A future `quotation` must name its translation and a license other than original work.
 */
export interface Inspiration {
  id: string;
  language: LanguageCode;
  theme: InspirationTheme;
  contentType: 'paraphrase' | 'quotation';
  /** Original wording; never shown in quotation marks or as a literal Bible quotation. */
  text: string;
  /** One original sentence of explanation. */
  note: string;
  reference: BibleReference;
  source: { attribution: string; translation?: string; license: 'original-work' | 'public-domain' | 'licensed' };
  review: ContentReviewStatus;
}

const ORIGINAL = { attribution: 'Moral Fuel editorial, original paraphrase', license: 'original-work' } as const;

function p(
  id: string,
  theme: InspirationTheme,
  reference: BibleReference,
  text: string,
  note: string,
): Inspiration {
  return { id, language: 'nl', theme, contentType: 'paraphrase', text, note, reference, source: ORIGINAL, review: PHASE_1_DRAFT };
}

export const INSPIRATIONS: readonly Inspiration[] = [
  p('insp-01-trust-path', 'trust', { book: 'PRO', chapter: 3, verseStart: 5, verseEnd: 6 },
    'Vertrouw op God met heel je hart en leun niet alleen op je eigen inzicht; Hij maakt je pad begaanbaar.',
    'Vertrouwen betekent niet dat je niet nadenkt, wel dat je niet alles alleen hoeft te overzien.'),
  p('insp-02-shepherd', 'trust', { book: 'PSA', chapter: 23, verseStart: 1 },
    'De Heer is als een herder voor mij; bij Hem kom ik niets tekort.',
    'Een herder kent de weg en kent zijn schapen, ook als het pad door een dal gaat.'),
  p('insp-03-mercies-new', 'hope', { book: 'LAM', chapter: 3, verseStart: 22, verseEnd: 23 },
    'Gods trouw en goedheid raken niet op; elke morgen zijn ze weer nieuw.',
    'Deze woorden zijn geschreven in een tijd van verlies, en toch kijken ze naar de morgen.'),
  p('insp-04-rest', 'peace', { book: 'MAT', chapter: 11, verseStart: 28 },
    'Jezus nodigt iedereen die moe is en zwaar draagt uit om bij Hem op adem te komen.',
    'De uitnodiging begint niet bij wat je presteert, maar bij wat je draagt.'),
  p('insp-05-love-patient', 'love', { book: '1CO', chapter: 13, verseStart: 4 },
    'Liefde is geduldig en vriendelijk; ze is niet jaloers en zet zichzelf niet op de voorgrond.',
    'Paulus beschrijft liefde als iets wat je doet, niet alleen als iets wat je voelt.'),
  p('insp-06-forgive-kind', 'forgiveness', { book: 'EPH', chapter: 4, verseStart: 32 },
    'Wees goed en hartelijk voor elkaar en vergeef elkaar, zoals God jullie in Christus vergeven heeft.',
    'Vergeven begint bij ontvangen: wie genade kent, krijgt ruimte om die door te geven.'),
  p('insp-07-thanks-always', 'gratitude', { book: '1TH', chapter: 5, verseStart: 18 },
    'Dank God in alle omstandigheden.',
    'Er staat in alle omstandigheden, niet voor alle omstandigheden: danken ontkent het moeilijke niet.'),
  p('insp-08-no-worry', 'peace', { book: 'PHP', chapter: 4, verseStart: 6, verseEnd: 7 },
    'Maak je niet ongerust, maar breng alles met dankbaarheid in gebed bij God; zijn vrede zal je hart en gedachten bewaren.',
    'Gebed neemt niet alle zorgen weg, maar het geeft ze een plek buiten je eigen hoofd.'),
  p('insp-09-eagles', 'hope', { book: 'ISA', chapter: 40, verseStart: 31 },
    'Wie op de Heer hoopt, krijgt nieuwe kracht, zoals arenden die hoog opstijgen.',
    'Jesaja schreef dit voor mensen die moe waren van lang wachten.'),
  p('insp-10-be-strong', 'peace', { book: 'JOS', chapter: 1, verseStart: 9 },
    'Wees sterk en moedig en laat je niet afschrikken, want God is bij je, waar je ook gaat.',
    'Moed is hier geen gevoel van zekerheid, maar verder gaan in het vertrouwen dat je niet alleen bent.'),
  p('insp-11-so-loved', 'love', { book: 'JHN', chapter: 3, verseStart: 16 },
    'God had de wereld zo lief dat Hij zijn enige Zoon gaf, zodat wie in Hem gelooft niet verloren gaat maar eeuwig leven heeft.',
    'Het christelijk geloof begint niet bij wat mensen voor God doen, maar bij wat God uit liefde gaf.'),
  p('insp-12-grace-gift', 'forgiveness', { book: 'EPH', chapter: 2, verseStart: 8 },
    'Je bent gered uit genade, door geloof; het komt niet uit jezelf, het is een geschenk van God.',
    'Een geschenk kun je niet verdienen, alleen ontvangen.'),
  p('insp-13-nothing-separates', 'hope', { book: 'ROM', chapter: 8, verseStart: 38, verseEnd: 39 },
    'Niets, geen dood of leven, geen heden of toekomst, kan ons scheiden van Gods liefde in Christus Jezus.',
    'Paulus schreef dit aan mensen die tegenwerking en onzekerheid kenden.'),
  p('insp-14-walk-humbly', 'everyday', { book: 'MIC', chapter: 6, verseStart: 8 },
    'God vraagt niets anders dan dat je rechtvaardig handelt, trouw liefhebt en nederig met Hem je weg gaat.',
    'Micha vat het geloof samen in drie werkwoorden voor gewone dagen.'),
  p('insp-15-light-world', 'everyday', { book: 'JHN', chapter: 8, verseStart: 12 },
    'Jezus noemt zichzelf het licht van de wereld; wie Hem volgt, gaat niet door het donker.',
    'Licht laat zien waar je loopt, ook als het niet alles in één keer verklaart.'),
  p('insp-16-came-to-serve', 'love', { book: 'MRK', chapter: 10, verseStart: 45 },
    'Jezus kwam niet om zich te laten dienen, maar om te dienen en zijn leven te geven.',
    'Grootheid ziet er bij Jezus uit als dienstbaarheid.'),
  p('insp-17-speak-truth', 'everyday', { book: 'EPH', chapter: 4, verseStart: 25 },
    'Leg de leugen af en spreek de waarheid tegen elkaar, want we horen bij elkaar.',
    'Eerlijkheid is hier geen hardheid, maar zorg voor de gemeenschap.'),
  p('insp-18-quick-listen', 'peace', { book: 'JAS', chapter: 1, verseStart: 19 },
    'Wees snel om te luisteren, langzaam om te spreken en langzaam om boos te worden.',
    'Wie eerst luistert, geeft de ander ruimte en zichzelf tijd.'),
  p('insp-19-ask-seek', 'trust', { book: 'MAT', chapter: 7, verseStart: 7 },
    'Vraag en je zult ontvangen, zoek en je zult vinden, klop en er wordt voor je opengedaan.',
    'Jezus moedigt aan om met je vragen bij God te komen, niet om ze op te bergen.'),
  p('insp-20-new-creation', 'hope', { book: '2CO', chapter: 5, verseStart: 17 },
    'Wie in Christus is, is een nieuwe schepping: het oude is voorbij, er is iets nieuws begonnen.',
    'Een nieuw begin is in de Bijbel een geschenk, geen eindexamen.'),
  p('insp-21-love-neighbour', 'love', { book: 'LUK', chapter: 10, verseStart: 27 },
    'Heb God lief met heel je hart, je ziel, je kracht en je verstand, en je naaste als jezelf.',
    'Jezus vertelt hierna het verhaal van de barmhartige Samaritaan: de naaste is wie je tegenkomt.'),
  p('insp-22-do-not-fear', 'trust', { book: 'ISA', chapter: 41, verseStart: 10 },
    'Wees niet bang, want Ik ben bij je; Ik geef je kracht en Ik help je, zegt God.',
    'Deze belofte werd gegeven aan een volk in ballingschap, ver van huis.'),
  p('insp-23-known', 'trust', { book: 'PSA', chapter: 139, verseStart: 1, verseEnd: 2 },
    'God kent je door en door; Hij weet het als je zit of opstaat en begrijpt je gedachten van verre.',
    'Gekend worden is hier geen controle, maar geborgenheid.'),
  p('insp-24-my-help', 'trust', { book: 'PSA', chapter: 121, verseStart: 1, verseEnd: 2 },
    'Ik kijk op naar de bergen: waar komt mijn hulp vandaan? Mijn hulp komt van de Heer, die hemel en aarde gemaakt heeft.',
    'Dit lied werd gezongen door pelgrims onderweg naar Jeruzalem.'),
  p('insp-25-rejoice', 'gratitude', { book: 'PHP', chapter: 4, verseStart: 4 },
    'Wees altijd blij in de Heer; nog eens: wees blij.',
    'Paulus schreef dit vanuit gevangenschap: vreugde hangt bij hem niet af van omstandigheden.'),
  p('insp-26-do-not-tire', 'everyday', { book: 'GAL', chapter: 6, verseStart: 9 },
    'Laten we niet moe worden het goede te doen; op de juiste tijd zullen we de oogst zien.',
    'Kleine goede daden tellen, ook als je de oogst nog niet ziet.'),
  p('insp-27-god-of-hope', 'hope', { book: 'ROM', chapter: 15, verseStart: 13 },
    'Moge de God van de hoop je vervullen met vreugde en vrede in het vertrouwen op Hem.',
    'Hoop is hier geen optimisme, maar iets wat God geeft.'),
  p('insp-28-faith-assurance', 'trust', { book: 'HEB', chapter: 11, verseStart: 1 },
    'Geloof is vertrouwen op wat je hoopt en zeker zijn van wat je niet ziet.',
    'De brief noemt daarna mensen die vertrouwden zonder alles te begrijpen.'),
  p('insp-29-good-work', 'hope', { book: 'PHP', chapter: 1, verseStart: 6 },
    'God, die een goed werk in je begonnen is, zal het ook voltooien.',
    'Je groei hangt niet alleen van jezelf af.'),
  p('insp-30-more-blessed', 'love', { book: 'ACT', chapter: 20, verseStart: 35 },
    'Paulus herinnert aan Jezus’ woorden dat geven gelukkiger maakt dan ontvangen.',
    'Dit woord van Jezus staat niet in de evangeliën, maar werd door Paulus doorgegeven.'),
  p('insp-31-clothe-compassion', 'love', { book: 'COL', chapter: 3, verseStart: 12 },
    'Kleed je met medeleven, goedheid, nederigheid, zachtmoedigheid en geduld.',
    'Deugden zijn hier als kleren: je trekt ze elke dag opnieuw aan.'),
  p('insp-32-let-light-shine', 'everyday', { book: 'MAT', chapter: 5, verseStart: 16 },
    'Laat je licht zo schijnen dat mensen het goede zien wat je doet, en God daarvoor eren.',
    'Het gaat om goede daden die naar God wijzen, niet naar jezelf.'),
  p('insp-33-forgive-us', 'forgiveness', { book: 'MAT', chapter: 6, verseStart: 12 },
    'Jezus leert bidden om vergeving voor onze schuld, zoals wij anderen vergeven wat zij ons schuldig zijn.',
    'Vergeving ontvangen en vergeving geven horen in dit gebed bij elkaar.'),
  p('insp-34-father-runs', 'forgiveness', { book: 'LUK', chapter: 15, verseStart: 20 },
    'De vader zag zijn zoon al van ver, werd met medelijden bewogen, rende naar hem toe en omarmde hem.',
    'Jezus vertelt hoe God mensen tegemoetkomt, nog voordat ze hun verhaal af hebben.'),
  p('insp-35-bear-forgive', 'forgiveness', { book: 'COL', chapter: 3, verseStart: 13 },
    'Verdraag elkaar en vergeef elkaar als je iets tegen een ander hebt, zoals de Heer jou vergeven heeft.',
    'Vergeven is iets anders dan alles goedpraten of onveilig blijven.'),
  p('insp-36-east-west', 'forgiveness', { book: 'PSA', chapter: 103, verseStart: 12 },
    'Zo ver als het oosten is van het westen, zo ver doet God onze overtredingen van ons weg.',
    'Het beeld is bewust onmetelijk: zo groot is Gods vergeving.'),
  p('insp-37-forget-not', 'gratitude', { book: 'PSA', chapter: 103, verseStart: 2 },
    'Prijs de Heer, mijn ziel, en vergeet niet al het goede dat Hij je deed.',
    'Danken begint met opmerken en onthouden.'),
  p('insp-38-be-thankful', 'gratitude', { book: 'COL', chapter: 3, verseStart: 15 },
    'Laat de vrede van Christus in je hart regeren, en wees dankbaar.',
    'Vrede en dankbaarheid staan hier naast elkaar, als twee kanten van één houding.'),
  p('insp-39-every-good-gift', 'gratitude', { book: 'JAS', chapter: 1, verseStart: 17 },
    'Elke goede gave en elk volmaakt geschenk komt van boven, van God, de Vader van het licht.',
    'Jakobus nodigt uit om het goede in je leven als geschenk te zien.'),
  p('insp-40-my-peace', 'peace', { book: 'JHN', chapter: 14, verseStart: 27 },
    'Jezus zegt dat Hij zijn vrede geeft, een vrede anders dan de wereld geeft; laat je hart niet in verwarring raken.',
    'Jezus zei dit op de avond voor zijn dood, tegen vrienden die bang waren.'),
];
