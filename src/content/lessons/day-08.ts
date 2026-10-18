import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day08: Lesson = {
  id: 'day-08-love-your-neighbour',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 8,
  sectionId: 'week-2',
  level: 'beginner',
  topics: ['relationships', 'service'],
  readingMinutes: 4,
  passage: { book: 'LUK', chapter: 10, verseStart: 25, verseEnd: 37 },
  relatedPassages: [
    { book: 'JHN', chapter: 13, verseStart: 34, verseEnd: 35 },
    { book: '1CO', chapter: 13, verseStart: 4, verseEnd: 7 },
  ],
  source: {
    contextChecked: { book: 'LUK', chapter: 10, verseStart: 25, verseEnd: 42 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Liefde voor anderen',
      summary:
        'Een wetsgeleerde vraagt wie zijn naaste is. Jezus antwoordt met een verhaal over een vreemdeling die stopt, terwijl anderen doorlopen.',
      objective: 'Je kunt naastenliefde vertalen naar één concrete daad in je eigen omgeving.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Naastenliefde kijkt niet eerst naar wie het verdient, maar naar wie je voor je hebt. Liefde wordt concreet in tijd, aandacht en moeite.',
          passageSummary:
            'Een wetsgeleerde stelt Jezus een vraag over hoe hij het eeuwige leven kan ontvangen. Jezus laat hem zelf antwoorden: God liefhebben met heel je wezen en je naaste als jezelf. Dan vraagt de man wie zijn naaste dan is. Jezus vertelt over een man die van Jeruzalem naar Jericho reist en door rovers wordt overvallen en half dood achtergelaten. Een priester en een Leviet zien hem liggen en lopen aan de overkant langs. Een Samaritaan komt langs, is met hem begaan, verzorgt zijn wonden, brengt hem naar een herberg en betaalt vooruit voor de verdere verzorging. Jezus vraagt wie van de drie de naaste was van de overvallene, en zegt tot slot dat de wetsgeleerde hetzelfde moet doen.',
          context:
            'Dit gesprek vindt plaats onderweg, in de tijd dat Jezus naar Jeruzalem trekt. De wetsgeleerde stelt zijn vraag om Jezus op de proef te stellen (Lucas 10:25). Het gebod om je naaste lief te hebben komt uit het Oude Testament, en de man kent het goed. De weg van Jeruzalem naar Jericho liep steil omlaag door woest gebied en stond als onveilig bekend. Joden en Samaritanen koesterden onderling een lange en diepe vijandschap. Voor Jezus’ hoorders was de Samaritaan dus de laatste van wie ze hulp zouden verwachten.',
          explanation: [
            'De wetsgeleerde wil weten waar de grens van zijn plicht ligt: wie telt wel als naaste en wie niet? Jezus draait de vraag om. Hij vertelt niet wie je naaste is, maar laat zien hoe iemand een naaste wordt: door te zien, dichterbij te komen en te helpen.',
            'Het verhaal zegt niets onaardigs over de priester en de Leviet, behalve dat ze doorlopen. Veel uitleggers wijzen erop dat angst, haast of zorgen over regels hun reden kunnen zijn geweest. Dat maakt het herkenbaar: wie zijn wij, op een drukke dag, onderweg naar iets belangrijks?',
            'Opvallend is wat de Samaritaan doet. Hij geeft niet alleen een gevoel van medeleven, maar ook tijd, zijn eigen spullen en geld, en hij zorgt dat de hulp doorloopt als hij weg moet. Naastenliefde is hier praktisch en begrensd: geen heldendaad, wel een goed afgemaakt stuk zorg.',
            'Liefde voor anderen is in de Bijbel geen voorwaarde om geliefd te worden. Ze volgt op wat God al gegeven heeft. Jezus zegt later tegen zijn leerlingen dat ze elkaar moeten liefhebben zoals Hij hen heeft liefgehad (Johannes 13:34-35), en Paulus beschrijft in 1 Korintiërs 13:4-7 hoe die liefde er in het dagelijks leven uitziet: geduldig, vriendelijk en zonder eigen belang voorop te zetten.',
          ],
          example:
            'Op de gang van een flat in Utrecht woont een oudere buurman die sinds een val moeilijk loopt. Je ziet zijn volle kliko al dagen buiten staan. Je kent hem nauwelijks en je hebt het druk. Je kunt de kliko een keer meenemen, kort aanbellen en vragen of er iets is wat je mee kunt nemen uit de supermarkt. Meer hoeft het niet te zijn, maar het is wel iets wat je doet in plaats van alleen bedenkt.',
          traditionNote:
            'Sinds de oude kerk lezen sommige christenen in de Samaritaan ook een beeld van Christus zelf, die zich over de gewonde mensheid ontfermt. Anderen lezen het verhaal vooral als een voorbeeld voor ons eigen handelen. Veel christenen vinden beide leesrichtingen waardevol, en de directe oproep aan de wetsgeleerde blijft staan.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Wie in jouw omgeving loop je, uit haast of gewoonte, regelmatig voorbij zonder echt te kijken?',
            hint: 'Denk aan een buurman, een collega, een medestudent of iemand die je op straat tegenkomt.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Doe één kleine, concrete daad',
            description:
              'Kies vandaag één persoon in je buurt en doe iets kleins en praktisch voor diegene: een vraag stellen, iets meenemen, een boodschap sturen. Houd het klein genoeg om het echt te doen. Je hoeft niemand te redden, en je mag grenzen houden in wat je kunt geven.',
          },
          prayer:
            'God, open mijn ogen voor de mensen die ik makkelijk over het hoofd zie. Geef mij moed om dichterbij te komen, en wijsheid om te weten wat ik kan geven. Amen.',
        },
      ],
    },
  },
};
