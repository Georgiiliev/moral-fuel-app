import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day18: Lesson = {
  id: 'day-18-grief-loss',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 18,
  sectionId: 'week-3',
  level: 'beginner',
  topics: ['emotions', 'hope'],
  readingMinutes: 4,
  passage: { book: 'JHN', chapter: 11, verseStart: 17, verseEnd: 44 },
  relatedPassages: [
    { book: '1TH', chapter: 4, verseStart: 13, verseEnd: 14 },
    { book: 'PSA', chapter: 42 },
  ],
  source: {
    contextChecked: { book: 'JHN', chapter: 11, verseStart: 1, verseEnd: 44 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Rouw en verlies',
      summary:
        'Jezus huilt bij het graf van zijn vriend. Vandaag kijk je hoe de Bijbel ruimte geeft aan verdriet, en hoe hoop en rouw samen kunnen bestaan.',
      objective:
        'Je ontdekt dat rouw en geloof samen kunnen gaan, en je weet waar je steun vindt.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Rouwen is geen gebrek aan geloof. Jezus zelf huilt, en christelijke hoop vraagt niet dat je verdriet snel overgaat.',
          passageSummary:
            'Lazarus, een vriend van Jezus uit Betanië, is gestorven en al vier dagen begraven als Jezus aankomt. Zijn zus Marta komt Hem tegemoet en zegt dat Lazarus nog zou leven als Jezus er was geweest. Jezus zegt dat Hij de opstanding en het leven is, en vraagt of ze dat gelooft. Daarna komt Maria, de andere zus, die hetzelfde zegt, huilend. Jezus is diep bewogen en vraagt waar ze hem hebben neergelegd. Dan begint Hij zelf te huilen. Bij het graf laat Hij de steen wegrollen, bidt en roept Lazarus bij zijn naam. De dode komt naar buiten.',
          context:
            'Betanië lag vlak bij Jeruzalem. Jezus had daar vrienden: Maria, Marta en Lazarus. Hij was elders toen het bericht van Lazarus’ ziekte kwam, en wachtte nog twee dagen (Johannes 11:1-6). In het Joodse gebruik kwamen familie en vrienden dagen achtereen om te rouwen en te troosten, en dat gebeurt hier ook. Johannes vertelt dit als het laatste grote teken voor Jezus’ eigen lijden en opstanding.',
          explanation: [
            'Midden in dit verhaal staat een heel kort vers: Jezus huilde (Johannes 11:35). Hij weet dat Hij Lazarus zo meteen gaat wekken, en toch huilt Hij. Dat zegt veel. Verdriet is geen teken dat je het niet begrijpt of niet genoeg vertrouwt. Het is een passende reactie op wat dood is.',
            'Marta en Maria zeggen allebei hetzelfde: als U hier was geweest. Het zijn eerlijke woorden van teleurstelling, bijna een verwijt. Jezus corrigeert hen niet. De Bijbel kent meer van zulke klaagtaal, zoals Psalm 42, waarin de dichter zijn tranen zijn brood noemt en zijn ziel vraagt waarom ze zo terneergeslagen is. Klagen mag dus. Het is gebed.',
            'Tegelijk spreekt het Nieuwe Testament over hoop. Paulus schrijft dat gelovigen niet rouwen zoals mensen zonder hoop, omdat ze geloven dat Jezus gestorven en opgestaan is (1 Tessalonicenzen 4:13-14). Let op: hij zegt niet dat ze niet rouwen, maar dat ze anders rouwen. Hoop neemt het verdriet niet weg, maar geeft het een horizon.',
            'In de praktijk is rouw geen rechte lijn. Het komt in golven, met woede, leegte, opluchting, schuldgevoel en soms dagen van niets. Er is geen schema waaraan je moet voldoen. Je mag het ook gewoon rustig laten gebeuren, met mensen om je heen.',
          ],
          example:
            'Ruud is 58 en verloor in het voorjaar zijn vrouw. Op zondag zit hij in de keuken en weet niet waarom hij nog zou koken voor één persoon. Een buurvrouw komt langs met soep, zegt niets bijzonders en gaat naast hem zitten. Later zegt hij hardop: ik mis haar. Dat zinnetje is al een gebed, ook al noemt hij het niet zo.',
          traditionNote:
            'Tradities verschillen in hoe ze afscheid nemen en bidden voor overledenen. In de katholieke en orthodoxe traditie bidden gelovigen voor hun doden; in veel protestantse kerken ligt de nadruk op troost voor de nabestaanden. Allemaal geloven ze in een hoop die verder reikt dan de dood.',
          careNote:
            'Rouw kan zwaar zijn. Houdt het je langere tijd vast, kun je nauwelijks functioneren, of voel je dat het leven niet meer hoeft? Praat dan met je huisarts. Heb je gedachten over zelfdoding, bel dan 113 Zelfmoordpreventie (113 of gratis 0800-0113), dag en nacht. Bij direct gevaar bel je 112. Gebed en kerk kunnen steun geven, maar vervangen die hulp niet.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Wie of wat mis je? Wat zou je willen zeggen als je helemaal eerlijk mag zijn, ook tegen God, als die er is?',
            hint: 'Verlies is meer dan overlijden: een baan, een relatie, een plek, een toekomst die niet doorging.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Maak ruimte voor verdriet',
            description:
              'Neem vandaag vijf minuten om te herinneren: kijk naar een foto, schrijf een brief of steek een kaars aan. Of neem contact op met iemand die rouwt, zonder iets op te lossen. Aanwezig zijn is genoeg.',
          },
          prayer:
            'God, ik mis wat weg is en dat doet pijn. Blijf bij mij in mijn verdriet, en geef mij mensen die dat met mij uithouden. Amen.',
        },
      ],
    },
  },
};
