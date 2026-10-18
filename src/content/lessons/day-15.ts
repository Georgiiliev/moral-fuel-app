import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day15: Lesson = {
  id: 'day-15-worry-anxiety',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 15,
  sectionId: 'week-3',
  level: 'beginner',
  topics: ['trust', 'emotions', 'prayer'],
  readingMinutes: 4,
  passage: { book: 'MAT', chapter: 6, verseStart: 25, verseEnd: 34 },
  relatedPassages: [
    { book: 'PHP', chapter: 4, verseStart: 6, verseEnd: 7 },
    { book: '1KI', chapter: 19, verseStart: 1, verseEnd: 8 },
  ],
  source: {
    contextChecked: { book: 'MAT', chapter: 6, verseStart: 19, verseEnd: 34 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Angst en zorgen',
      summary:
        'Zorgen horen bij het leven, en Jezus doet er niet lacherig over. Vandaag lees je wat Hij zegt over zorgen, en waarom een hulpvraag bij de huisarts daar niet mee in strijd is.',
      objective:
        'Je leert zorgen eerlijk te benoemen en in gebed te brengen, en je weet wanneer je professionele hulp zoekt.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Je hoeft je zorgen niet weg te poetsen om ze bij God te mogen neerleggen. Vertrouwen betekent: je hoeft het vandaag niet alleen te dragen.',
          passageSummary:
            'Jezus zegt tegen zijn volgelingen dat ze zich niet moeten opjagen over eten, drinken en kleding. Hij wijst naar de vogels, die God voedt zonder dat ze zaaien of oogsten, en naar de bloemen in het veld, die mooier gekleed gaan dan koning Salomo. Als God zo voor hen zorgt, hoeveel te meer voor mensen. Zorgen maken kan het leven niet met één uur verlengen. Wie God en zijn koninkrijk de eerste plaats geeft, mag ervan uitgaan dat God weet wat je nodig hebt. Daarom zegt Jezus: leef met de zorg van vandaag, want morgen brengt zijn eigen zorgen mee.',
          context:
            'Dit stuk hoort bij de Bergrede (Matteüs 5-7), een lange toespraak van Jezus aan zijn leerlingen en een grote menigte. Vlak ervoor waarschuwt Hij dat je hart bij je schat is, en dat niemand twee heren kan dienen (Matteüs 6:19-24). Zijn toehoorders waren gewone mensen, vaak arm, die van dag tot dag leefden. Hun zorg over brood en kleren was geen luxeprobleem.',
          explanation: [
            'Jezus zegt hier niet: voel je niet angstig, of: wie zich zorgen maakt, heeft te weinig geloof. Hij spreekt mensen aan die al genoeg te dragen hebben, en nodigt hen uit hun blik te verleggen. De vogels en bloemen zijn geen verwijt, maar een uitnodiging om te zien dat je leven niet alleen van jouw inspanning afhangt.',
            'Het woord dat hier met zorgen maken wordt vertaald, wijst volgens veel uitleggers op een gejaagde, verdeelde bezorgdheid: je hoofd draait rondjes om dingen die je nu niet kunt oplossen. Plannen, sparen en voorbereiden zijn niet het probleem. Het gaat om de zorg die je vastgrijpt en je rust steelt.',
            'Paulus geeft een praktische aanvulling: breng je zorgen bij God in gebed, met dank, en je mag een vrede ontvangen die je verstand te boven gaat (Filippenzen 4:6-7). Dat is geen garantie dat de situatie verandert, maar een belofte van aanwezigheid midden in de situatie. En kijk naar Elia, een profeet die uitgeput en bang wegvlucht (1 Koningen 19:1-8). God begint niet met een preek. Hij laat hem slapen en geeft hem brood en water.',
            'Dat laatste is belangrijk. Alledaagse zorgen zijn iets anders dan een angststoornis of een paniekaanval. Als angst wekenlang je slaap, je werk of je dagelijks leven bepaalt, is dat geen gebrek aan geloof, maar een gezondheidsvraag. Dan is hulp zoeken een verstandige en goede stap, naast alles wat je in gebed doet.',
          ],
          example:
            'Maaike is 34 en werkt bij een thuiszorgorganisatie. Er komt een reorganisatie aan en haar contract loopt af. ’s Nachts om drie uur rekent ze in gedachten haar vaste lasten door, steeds opnieuw. Overdag schrijft ze op een briefje wat er echt morgen moet gebeuren: één telefoontje naar haar leidinggevende, één blik op haar budget. De rest legt ze in een kort gebed neer, zonder te weten of dat helpt. Het briefje helpt in elk geval.',
          traditionNote:
            'Christenen uit verschillende tradities bidden hun zorgen op eigen wijze uit: met eigen woorden, met een vast gebed, met een kaarsje of met de psalmen. Allemaal gaan ze ervan uit dat je met je zorgen bij God terechtkunt.',
          careNote:
            'Houdt angst je langer vast, slaap je slecht, of heb je last van paniek? Ga dan naar je huisarts. Dat is geen falen en geen gebrek aan vertrouwen. Heb je gedachten over jezelf iets aandoen, praat daar dan vandaag over met iemand. 113 Zelfmoordpreventie is dag en nacht bereikbaar op 113 of gratis op 0800-0113. Bij direct gevaar bel je 112.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Welke zorg neemt de meeste ruimte in je hoofd in? Welk deel ervan kun je vandaag echt aanpakken, en welk deel niet?',
            hint: 'Je hoeft niet te weten of je gelooft dat iemand meeluistert. Schrijf het gewoon eerlijk op.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Maak je zorgen klein',
            description:
              'Schrijf op een papier alle zorgen op die je bezighouden. Zet een streepje bij wat je vandaag kunt aanpakken en doe daar één klein ding mee. Praat over de rest met iemand die je vertrouwt. Als het niet lukt, kan dat een reden zijn om een afspraak bij de huisarts te maken.',
          },
          prayer:
            'God, dit houdt mij bezig. Ik zet het hier neer, ook al weet ik niet hoe U ermee omgaat. Geef mij rust voor vandaag, en help mij te vragen om hulp waar dat nodig is. Amen.',
        },
      ],
    },
  },
};
