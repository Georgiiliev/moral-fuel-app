import type { Lesson } from '@/models/content';

import { PHASE_1_AUTHOR, PHASE_1_DRAFT } from '../review';

export const day09: Lesson = {
  id: 'day-09-practising-patience',
  schemaVersion: 1,
  contentVersion: '0.1.0',
  day: 9,
  sectionId: 'week-2',
  level: 'beginner',
  topics: ['patience', 'habits'],
  readingMinutes: 3,
  passage: { book: 'GAL', chapter: 5, verseStart: 22, verseEnd: 26 },
  relatedPassages: [
    { book: 'JAS', chapter: 1, verseStart: 19, verseEnd: 20 },
    { book: '1CO', chapter: 13, verseStart: 4 },
  ],
  source: {
    contextChecked: { book: 'GAL', chapter: 5, verseStart: 13, verseEnd: 26 },
    bibleText: 'summary-only',
    author: PHASE_1_AUTHOR,
  },
  review: PHASE_1_DRAFT,
  text: {
    nl: {
      title: 'Geduld oefenen',
      summary:
        'Paulus noemt geduld een vrucht van de Geest: iets wat groeit, niet iets wat je afdwingt. Vandaag gaat het over vriendelijk blijven op de momenten dat het schuurt.',
      objective: 'Je herkent je eigen momenten van ongeduld en oefent een andere reactie.',
      steps: [
        {
          kind: 'learn',
          bigIdea:
            'Geduld is in de Bijbel geen onverschillig wachten, maar vriendelijk en rustig blijven als iets of iemand je op de proef stelt. Het groeit langzaam, als vrucht.',
          passageSummary:
            'Paulus zet in zijn brief aan de gemeenten in Galatië een lange lijst neer van wat de Geest van God in mensen laat groeien: liefde, vreugde, vrede, geduld, vriendelijkheid, goedheid, trouw, zachtmoedigheid en zelfbeheersing. Hij zegt dat er tegen zulke dingen geen wet is. Wie bij Christus hoort, heeft de oude eigenzinnige wensen als het ware losgelaten. Paulus roept op om met de Geest mee te lopen en niet verwaand te worden, elkaar niet uit te dagen en elkaar niet te benijden.',
          context:
            'Paulus schrijft aan christelijke gemeenten in Galatië, waar spanningen waren over hoe je als gelovige hoort te leven. Net voor deze verzen schrijft hij over de vrijheid die je hebt gekregen en over de neiging om elkaar te bijten en te verslinden (Galaten 5:13-15). Hij zet daar een leven dat door de Geest wordt geleid tegenover een leven dat draait om eigen wensen. De lijst die volgt wordt in de traditie vaak de vrucht van de Geest genoemd.',
          explanation: [
            'Het woord vrucht is veelzeggend. Een appel pers je niet uit een boom met een inspanning van één dag. Een boom groeit door water, licht en tijd. Zo beschrijft Paulus geduld: niet als prestatie, maar als iets wat in je groeit als je leeft in verbinding met God.',
            'Geduld is meer dan wachten. Het is hoe je wacht. Je kunt zwijgend zitten kokken in de rij bij de kassa, of rustig blijven en de kassamedewerker als mens zien. Jakobus schrijft dat je snel moet zijn om te luisteren en langzaam om te spreken en boos te worden, want menselijke woede brengt niet de gerechtigheid van God voort (Jakobus 1:19-20). In 1 Korintiërs 13:4 staat geduld vooraan in de beschrijving van liefde.',
            'Dat betekent niet dat je alles lijdzaam moet slikken. Geduld is niet hetzelfde als je laten overlopen of onrecht goedpraten. Je kunt iets bespreekbaar maken en tegelijk rustig blijven. Geduld geeft ruimte tussen wat je voelt en wat je doet.',
            'Het kan opluchten dat het een vrucht is. Je hoeft jezelf niet te veroordelen als het vandaag weer niet lukte. Je kunt het oefenen in kleine stappen, en erom vragen.',
          ],
          example:
            'Je zit in de trein van Zwolle naar Amsterdam en de conducteur kondigt aan dat de trein door een wisselstoring twintig minuten blijft staan. Je merkt dat je kaken zich spannen en dat je al een boos bericht aan de NS in je hoofd formuleert. Je ademt een keer diep in, stuurt je collega gewoon een verwachte aankomsttijd en legt je telefoon weg. De trein rijdt niet eerder, maar jij houdt de dag in handen.',
        },
        {
          kind: 'reflect',
          prompt: {
            question: 'Op welke momenten of bij welke mensen merk je dat je geduld het snelst opraakt?',
            hint: 'Kijk liever naar wat eronder zit, zoals haast, vermoeidheid of het gevoel dat er geen ruimte voor jou is, dan naar wat je ervan vindt.',
          },
        },
        {
          kind: 'live',
          action: {
            title: 'Neem een ademruimte voor je reageert',
            description:
              'Kies een moment vandaag waarop je gewoonlijk ongeduldig wordt, bijvoorbeeld een rij, een vertraging of een vervelend gesprek. Adem één keer rustig in en uit voordat je iets zegt of doet. Merk gewoon wat er verandert, zonder oordeel.',
          },
          prayer:
            'God, als U er bent: ik merk hoe snel ik haast heb en hoe weinig ruimte ik laat. Laat in mij iets groeien van rust en vriendelijkheid, ook als het schuurt. Amen.',
        },
      ],
    },
  },
};
