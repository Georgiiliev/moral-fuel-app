import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day03: Lesson = {
  id: 'day-03-the-gospel',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 3,
  sectionId: 'week-1',
  level: 'beginner',
  topics: ['faith-basics', 'gospel', 'grace'],
  readingMinutes: 3,
  passage: { book: '1CO', chapter: 15, verseStart: 1, verseEnd: 8 },
  relatedPassages: [{ book: 'MRK', chapter: 1, verseStart: 14, verseEnd: 15 }],
  source: {
    contextChecked: { book: '1CO', chapter: 15, verseStart: 1, verseEnd: 11 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Wat is het evangelie?',
      summary:
        'Evangelie betekent goed nieuws. Paulus vat het samen in een paar zinnen die al heel vroeg werden doorgegeven. Wat is dat nieuws, en waarom is het goed?',
      objective:
        'Je kunt de kern van het evangelie in een paar zinnen navertellen en uitleggen waarom het nieuws is en geen advies.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Het evangelie is geen lijst met dingen die jij moet doen, maar bericht over wat God in Jezus al heeft gedaan.',
          passageSummary:
            'Paulus herinnert de gemeente in Korinte aan het goede nieuws dat hij zelf had ontvangen en aan hen had doorgegeven. De kern: Christus is gestorven voor onze zonden, zoals de Schriften al zeiden. Hij is begraven en op de derde dag opgewekt. Daarna is Hij verschenen aan Petrus, aan de twaalf leerlingen, aan meer dan vijfhonderd mensen tegelijk, aan Jakobus, aan alle apostelen en ten slotte aan Paulus zelf.',
          context:
            'Paulus schreef deze brief rond het jaar 54 aan een jonge en verdeelde gemeente in Korinte, een drukke Griekse havenstad. Sommigen daar twijfelden aan de opstanding van de doden (1 Korintiërs 15:12). Paulus antwoordt niet met een nieuw idee, maar herinnert hen aan wat hij bij zijn eerste bezoek had doorgegeven: een korte, vaste samenvatting die al in de eerste jaren na Jezus’ dood werd gebruikt.',
          explanation: [
            'Dit is een van de oudste christelijke teksten die we hebben. Paulus schreef deze brief ongeveer twintig tot vijfentwintig jaar na Jezus’ dood, en hij geeft iets door wat hij zelf al eerder had ontvangen.',
            'Let op de vorm: het is nieuws. Advies vertelt wat je moet doen om iets te bereiken. Nieuws vertelt wat er al gebeurd is, en dat verandert je situatie. Volgens het evangelie heeft God zelf in Jezus de breuk tussen mensen en God hersteld.',
            'Gestorven voor onze zonden betekent dat Jezus’ dood te maken heeft met wat er mis is in ons en in de wereld: het kwaad dat we doen en het goede dat we nalaten. Het evangelie neemt dat serieus, maar eindigt niet bij schuld. Het eindigt bij opstanding, vergeving en een nieuw begin.',
            'Jezus vatte zijn eigen boodschap samen met de oproep om om te keren en het goede nieuws te geloven, omdat Gods koninkrijk dichtbij is gekomen (Marcus 1:14-15).',
          ],
          example:
            'Stel dat je een brief krijgt waarin staat dat je studieschuld is kwijtgescholden. Je hebt er niets voor gedaan, maar je leven ziet er vanaf dat moment anders uit. Je gaat er anders door leven: niet om de kwijtschelding te verdienen, maar omdat je hem hebt gekregen.',
          traditionNote:
            'Christelijke tradities verwoorden met verschillende accenten hoe Jezus’ dood redding brengt, en hoe geloof, doop en kerk daarmee samenhangen. Over de kern die Paulus hier noemt, zijn ze het eens.',
        },
        {
          kind: 'reflect',
          prompt: {
            question:
              'Wat zou er voor jou veranderen als het evangelie echt nieuws is, en geen prestatie die je moet leveren?',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Vertel het in je eigen woorden',
            description:
              'Schrijf in hooguit drie zinnen op wat het evangelie volgens deze les zegt. Lukt dat niet helemaal? Noteer dan wat nog onduidelijk is. Ook dat is waardevol.',
          },
          prayer:
            'God, dank U voor goed nieuws dat ik niet hoef te verdienen. Help mij te begrijpen wat het betekent, en wat het voor mijn leven kan betekenen. Amen.',
        },
      ],
    },
  },
};
