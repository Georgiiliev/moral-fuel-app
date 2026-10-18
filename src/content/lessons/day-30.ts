import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day30: Lesson = {
  id: 'day-30-the-next-thirty-days',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 30,
  sectionId: 'week-4',
  level: 'beginner',
  topics: ['habits', 'reflection', 'trust'],
  readingMinutes: 4,
  passage: { book: 'PRO', chapter: 16, verseStart: 1, verseEnd: 9 },
  relatedPassages: [
    { book: 'LUK', chapter: 14, verseStart: 28, verseEnd: 30 },
    { book: 'MAT', chapter: 6, verseStart: 34 },
  ],
  source: {
    contextChecked: { book: 'PRO', chapter: 16, verseStart: 1, verseEnd: 9 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'De volgende dertig dagen',
      summary:
        'Je hebt dertig dagen achter de rug. Spreuken 16 laat zien dat je mag plannen en tegelijk loslaten. Vandaag maak je een eenvoudig, haalbaar plan voor wat daarna komt.',
      objective:
        'Je maakt een realistisch plan voor ritme, lezen, gebed en gemeenschap voor de komende weken, dat bij je leven past.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Plannen maken is verstandig, en tegelijk mag je weten dat niet alles in jouw hand ligt. Een goed plan is klein genoeg om vol te houden en ruim genoeg om bij te stellen.',
          passageSummary:
            'Dit gedeelte uit Spreuken bestaat uit korte uitspraken over plannen maken en over God. Mensen bedenken wat ze willen doen, maar wat er uiteindelijk gebeurt, ligt niet helemaal in hun hand. God ziet wat er echt in iemand leeft, ook als die zichzelf in alles gelijk geeft. Wie zijn werk aan God toevertrouwt, kan erop rekenen dat zijn plannen vastere grond krijgen. Hoogmoed is God een gruwel, terwijl trouw en eerbied voor hem iemand behoeden voor kwaad. Weinig met rechtvaardigheid is beter dan veel met onrecht. Het slot zegt dat een mens zijn weg overdenkt, maar dat God zijn stappen richt.',
          context:
            'Spreuken is een verzameling wijsheidsspreuken uit het oude Israël, bedoeld om mensen te leren verstandig te leven. Het zijn geen beloften maar waarnemingen en richtlijnen over het leven in het algemeen. Het is dus niet zo dat wie goed plant altijd slaagt. Jezus noemt zelf het belang van verstandig plannen: iemand die een toren wil bouwen, berekent eerst de kosten (Lucas 14:28-30).',
          explanation: [
            'Het doel van een plan is niet controle, maar richting. Je bedenkt waar je naartoe wilt en zet de eerste stappen, en je houdt er rekening mee dat het leven anders kan lopen dan gedacht. Daarom zegt Jezus ook dat je je niet bezorgd moet maken over morgen, want elke dag heeft genoeg aan zijn eigen zorgen (Matteüs 6:34).',
            'Een realistisch plan is meestal kleiner dan je wilt. Kies een ritme dat je ook op je drukste dag kunt halen: vijf minuten lezen, een kort gebed, en eens per week een moment van gemeenschap. Als een week mislukt, begin je de week erna gewoon opnieuw. Er is geen streak om te verliezen.',
            'Denk na over vier dingen. Ritme: wanneer past dit het best in je dag? Lezen: waar ga je mee verder, bijvoorbeeld met een evangelie of de Psalmen? Gebed: welke vorm past bij je, in eigen woorden, met een vast gebed of in stilte? Gemeenschap: met wie praat je erover, en welke plek wil je nog verkennen?',
            'Het mag ook zijn dat je besluit nu even te pauzeren, of dat je zoekt zonder je ergens aan te binden. Ook dat is een plan, zolang je het bewust kiest.',
          ],
          example:
            'Sven werkt in ploegendienst en heeft elke week een ander rooster. Hij maakt geen vast tijdstip, maar koppelt zijn leesmoment aan het moment dat hij na het werk zijn jas ophangt. Op vrijdag stuurt hij zijn broer een berichtje over wat hij gelezen heeft. Na twee weken is de lijst met vragen langer geworden. Hij besluit er in maand twee een gesprekskring bij te zoeken.',
          traditionNote:
            'Christenen kennen verschillende vaste ritmes: het kerkelijk jaar met Advent, Pasen en Pinksteren, vaste gebedstijden zoals in de katholieke en orthodoxe traditie, of een persoonlijke stille tijd zoals veel protestanten dat doen. Je kunt kiezen wat bij je past en hoeft niets te kopiëren.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Welk ritme zou je ook in een drukke week kunnen volhouden, en wie zou je daarbij willen betrekken?',
            hint: 'Denk aan wat de afgelopen dertig dagen goed werkte, niet aan wat het zou moeten zijn.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Een plan op één kaartje',
            description:
              'Schrijf op een briefje vier dingen: wanneer je leest of bidt, wat je leest, met wie je erover praat en wanneer je de balans opmaakt. Hou het kort. Je mag het over een maand weer aanpassen.',
          },
          prayer:
            'God, ik leg mijn plannen voor U neer, als U er bent. Help mij ze klein en eerlijk te houden, en vertrouwen te hebben dat ik niet alles hoef te weten. Amen.',
        },
      ],
    },
  },
};
