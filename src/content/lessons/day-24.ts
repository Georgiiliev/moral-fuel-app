import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day24: Lesson = {
  id: 'day-24-relationships-reconciliation',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 24,
  sectionId: 'week-4',
  level: 'beginner',
  topics: ['relationships', 'forgiveness', 'emotions'],
  readingMinutes: 4,
  passage: { book: 'GEN', chapter: 33, verseStart: 1, verseEnd: 11 },
  relatedPassages: [
    { book: 'MAT', chapter: 5, verseStart: 23, verseEnd: 24 },
    { book: 'ROM', chapter: 12, verseStart: 17, verseEnd: 18 },
  ],
  source: {
    contextChecked: { book: 'GEN', chapter: 33, verseStart: 1, verseEnd: 20 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Relaties en verzoening',
      summary:
        'Jakob moet na jaren zijn broer Esau onder ogen komen, de man die hij heeft bedrogen. Hun ontmoeting laat zien hoe verzoening er kan uitzien, en ook waar de grens ervan ligt.',
      objective:
        'Je bedenkt een veilige, haalbare stap richting herstel in een relatie, of je kiest bewust om dat nu niet te doen.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Verzoening begint vaak met een eerlijk gebaar, maar je hoeft het niet alleen en niet tegen elke prijs te doen. Herstel vraagt wijsheid, tijd en veiligheid.',
          passageSummary:
            'Jakob ziet Esau naderen met vierhonderd man en ordent zijn gezin om te kunnen vluchten of zich te verdedigen. Hij loopt zelf voorop en buigt zeven keer diep tot hij bij zijn broer is. Esau rent hem tegemoet, omhelst hem, valt hem om de hals en kust hem, en ze huilen allebei. Jakob stelt zijn vrouwen en kinderen voor. Hij biedt Esau een groot geschenk aan en zegt dat het zien van Esau’s gezicht is als het zien van Gods gezicht. Esau wil het eerst niet aannemen, maar op Jakobs aandringen neemt hij het toch aan.',
          context:
            'Jakob en Esau zijn tweelingbroers. Jaren eerder had Jakob zijn vader misleid om de zegen te krijgen die voor Esau bedoeld was, waarna Esau dreigde hem te doden en Jakob vluchtte (Genesis 27). Nu keert hij terug naar zijn geboortestreek en weet hij niet wat hij kan verwachten. De avond tevoren heeft hij een nacht vol angst en gebed doorgebracht (Genesis 32:3-32).',
          explanation: [
            'Wat opvalt is dat Jakob zijn schuld niet wegpraat. Hij komt nederig en met een geschenk, en hij erkent wat hij heeft aangericht. Jezus zegt later dat je eerst moet proberen het goed te maken met iemand die iets tegen jou heeft, voordat je je gave naar het altaar brengt (Matteüs 5:23-24). Het herstel van een relatie wordt dus als serieus gezien.',
            'Esau laat meer genade zien dan Jakob had durven hopen. Zo gaat het niet altijd. Soms wil de ander geen contact, of wordt het gesprek niet zoals je hoopt. Dat zegt niets over of jouw stap goed was. Paulus schrijft dat je, voor zover het van jou afhangt, in vrede met iedereen moet leven (Romeinen 12:17-18). Dat voor zover het van jou afhangt is een eerlijke grens: jij kunt een hand uitsteken, de ander beslist wat die ermee doet.',
            'Verzoening is ook niet hetzelfde als alles weer zijn zoals vroeger. Als je het hele hoofdstuk leest, zie je dat Jakob Esau’s uitnodiging om samen verder te reizen beleefd afslaat en zijn eigen weg gaat (Genesis 33:12-17). Veel lezers zien daarin dat een goede verhouding ook met afstand kan bestaan.',
            'Excuses maken kan klein beginnen. Een kort bericht, een eerlijke zin, een gesprek zonder verdediging. Noem wat je hebt gedaan zonder het te verzachten met een maar, en wacht niet tot de ander ook zijn deel erkent.',
          ],
          example:
            'Sanne en haar oudere zus hebben al vier jaar nauwelijks contact sinds een ruzie over de erfenis van hun moeder. Sanne weet nog precies wat ze toen zei. Ze schrijft haar zus één bericht: dat ze spijt heeft van die woorden en dat ze open staat voor koffie, zonder druk. Ze krijgt twee dagen niets terug. Op de derde dag volgt een kort antwoord. Het is geen herstel, maar de deur staat op een kier.',
          careNote:
            'Verzoening is niet verplicht met iemand die je heeft misbruikt, bedreigd of geweld heeft aangedaan, of bij wie je je niet veilig voelt. Je kunt vergeven zonder contact te hebben. Heb je met zoiets te maken, praat dan met iemand die je vertrouwt of bel gratis met Veilig Thuis op 0800-2000. Bij direct gevaar bel je 112.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Is er iemand met wie het niet goed zit, en wat zou een kleine, veilige stap kunnen zijn, ook als die stap voor nu betekent dat je er nog even niets mee doet?',
            hint: 'Denk aan wat jij kunt doen, niet aan wat de ander zou moeten doen.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Schrijf een bericht, ook als je het niet verstuurt',
            description:
              'Schrijf in een paar zinnen wat je zou willen zeggen tegen iemand met wie het schuurt: wat je betreurt en wat je hoopt. Lees het terug. Verstuur het alleen als het veilig voelt, anders bewaar je het. Het gaat om duidelijkheid voor jezelf.',
          },
          prayer:
            'God, ik wil graag eerlijk kijken naar wat er tussen mij en een ander is gebeurd. Geef mij moed waar dat kan, en wijsheid waar het beter is afstand te houden. Amen.',
        },
      ],
    },
  },
};
