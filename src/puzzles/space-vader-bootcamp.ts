export type DecisionGrade = 'optimal' | 'solid' | 'risky' | 'error';

export type TrainerCard = {
  id: string;
  nameDe?: string;
  nameEn: string;
  set: string;
  collectorNumber: string;
  imageUrl: string;
};

export type DecisionOption = {
  id: string;
  label: string;
  grade: DecisionGrade;
  feedback: string;
};

export type SpaceVaderExercise = {
  id: string;
  chapter: string;
  sourceType: 'turnierfall' | 'prinzip' | 'sideboard';
  title: string;
  prompt: string;
  context: string;
  principle: string;
  cards: TrainerCard[];
  options: DecisionOption[];
};

const deImage = (set: string, collectorNumber: string) =>
  `https://d1n2ba7uw8bkm1.cloudfront.net/swu/${set}/_de/${set}${collectorNumber.padStart(3, '0')}-de.jpg`;

function card(id: string, nameEn: string, set: string, collectorNumber: string, nameDe?: string): TrainerCard {
  return { id, nameEn, nameDe, set, collectorNumber, imageUrl: deImage(set, collectorNumber) };
}

// Die Collector-Nummern entsprechen der von Gerrit gelieferten Göttingen-Liste.
// Deutsche Namen werden nur dort hinterlegt, wo sie sicher bekannt sind; ansonsten
// zeigt die App den englischen Titel zusammen mit dem deutschen Kartenbild.
export const vaderCards = {
  garindan: card('garindan', 'Garindan · Information Broker', 'SEC', '696', 'Garindan · Informationshändler'),
  palpatine: card('palpatine', 'Chancellor Palpatine · I Am the Senate', 'SEC', '592', 'Kanzler Palpatine · Ich bin der Senat'),
  galen: card('galen', 'Galen Erso · Destroying His Creation', 'LAW', '233'),
  boba: card('boba-pilot', 'Boba Fett · Feared Bounty Hunter', 'JTL', '687'),
  elzar: card('elzar', 'Elzar Mann · Haunted by a Vision', 'ASH', '224'),
  victor: card('victor-leader', 'Victor Leader · Leading from the Front', 'JTL', '583'),
  cloneSquadron: card('clone-combat-squadron', 'Clone Combat Squadron', 'JTL', '613'),
  hold: card('hold-for-questioning', 'Hold For Questioning', 'LAW', '217'),
  noConflict: card('there-is-no-conflict', 'There Is No Conflict', 'ASH', '199'),
  craving: card('craving-power', 'Craving Power', 'LOF', '593'),
  commandeer: card('commandeer', 'Commandeer', 'JTL', '733'),
  watchThis: card('watch-this', 'Watch This', 'IBH', '052'),
  remnant: card('remnant-lookouts', 'Remnant Lookouts', 'ASH', '220'),
} satisfies Record<string, TrainerCard>;

export const spaceVaderExercises: SpaceVaderExercise[] = [
  {
    id: 'garindan-cad-opening',
    chapter: 'Hand Reading',
    sourceType: 'turnierfall',
    title: 'Der Pass verrät etwas',
    prompt: 'Cad Bane hält seine Starthand und passt als erste Aktion. Du hast nach dem Mulligan keinen Space-Opener, aber Garindan. Was ist Björns Line?',
    context: 'Turn 1 · 2 Ressourcen · leeres Board. Der Gegner möchte seine Space-Einheit offenbar nicht vor deinem möglichen 2/3-Ambusher ausspielen.',
    principle: 'Gegnerisches Verhalten ist Information. Plot ist kein Zwang: Wenn Garindan dein sinnvollstes Play ist, darf er direkt aus der Hand kommen.',
    cards: [vaderCards.garindan],
    options: [
      { id: 'play-onyx', label: 'Garindan ausspielen und Onyx Squadron nennen.', grade: 'optimal', feedback: 'Genau die beschriebene Turnierline. Keep plus First-Action-Pass deutet auf ein Space-Play hin, das nicht in den Ambusher laufen soll. Garindan trifft Onyx Squadron und nimmt dem Gegner den Turn-1-Plan.' },
      { id: 'resource', label: 'Garindan als Ressource/Plot aufheben und passen.', grade: 'error', feedback: 'Damit verschenkst du den ersten Zug. Björn spielt Garindan hier gerade deshalb direkt aus, weil nach dem Mulligan kein besserer Opener da ist.' },
      { id: 'wait', label: 'Nichts tun und auf ein Schiff im nächsten Draw hoffen.', grade: 'risky', feedback: 'Das erhält Garindan, gibt dem Gegner aber kostenlos Zeit und nutzt die vorhandene Information nicht.' },
    ],
  },
  {
    id: 'garindan-ramp',
    chapter: 'Threat Assessment',
    sourceType: 'turnierfall',
    title: 'Wahrscheinlich ist nicht gleich gefährlich',
    prompt: 'Ava Chris hält seine Hand. Blue Leader ist wahrscheinlich auf der Hand, aber dein Victor Leader überlebt ihn. Welche Karte nennst du mit Garindan?',
    context: 'Turn 1 · 2 Ressourcen. Die echte Verlustgefahr ist ein früher Ramp-Zug, der große Einheiten wie Liberty vor der Kurve ermöglicht.',
    principle: 'Mit Garindan nennst du nicht automatisch die wahrscheinlichste Karte. Du nennst die Karte, gegen die dein Plan am ehesten kollabiert.',
    cards: [vaderCards.garindan, vaderCards.victor],
    options: [
      { id: 'rebo', label: 'Max Rebo Band.', grade: 'optimal', feedback: 'Björn nennt Max Rebo Band. Er verfehlt zwar, aber Blue Leader war für seinen konkreten Plan verkraftbar. Die gefährlichere Line war frühes Rampen.' },
      { id: 'blue', label: 'Blue Leader.', grade: 'solid', feedback: 'Du würdest wahrscheinlich treffen, löst aber das kleinere Problem. In der beschriebenen Partie war Blue Leader kein kritischer Threat.' },
      { id: 'random', label: 'Einen wahrscheinlichen 2-Drop – Hauptsache treffen.', grade: 'error', feedback: 'Garindan ist kein Trefferquoten-Minispiel. Threat-Priorität und Informationsgewinn sind wichtiger.' },
    ],
  },
  {
    id: 'initiative-for-hold',
    chapter: 'Initiative',
    sourceType: 'prinzip',
    title: 'Drei Schaden liegen lassen?',
    prompt: 'Du könntest noch 3 Schaden auf die Base machen und mit Vader einen TIE erzeugen. Du hältst Hold For Questioning und erwartest nächste Runde eine Karte, die dein Space-Board zerstören kann. Was tust du?',
    context: 'Du kannst die Initiative jetzt nehmen und dadurch den nächsten Turn mit Hold For Questioning eröffnen.',
    principle: 'Initiative ist eine Ressource. Sichtbarer Schaden darf liegen bleiben, wenn First Action Discard den eigenen Gameplan schützt.',
    cards: [vaderCards.hold],
    options: [
      { id: 'claim', label: 'Initiative nehmen und den nächsten Turn mit Hold For Questioning eröffnen.', grade: 'optimal', feedback: 'Das ist eines der Kernprinzipien aus Björns Erklärung: Lieber Schaden und einen TIE aufgeben, wenn die First Action eine spielentscheidende Karte entfernen kann.' },
      { id: 'attack', label: 'Angreifen, TIE erzeugen und maximalen Schaden nehmen.', grade: 'risky', feedback: 'Das ist die typische Aggro-Line. Sie ist nur besser, wenn die gegnerische Antwort nicht relevant ist oder du wirklich lethal erzwingst.' },
      { id: 'develop', label: 'Noch eine Einheit spielen und Initiative später nehmen.', grade: 'risky', feedback: 'Mehr Board kann gut sein, verliert aber womöglich genau das Zeitfenster, in dem du die gegnerische Schlüsselkarte vor ihrem Einsatz discarden kannst.' },
    ],
  },
  {
    id: 'hold-aspect-target',
    chapter: 'Discard',
    sourceType: 'turnierfall',
    title: 'Nicht die größte Einheit exhausten',
    prompt: 'Der Gegner kontrolliert einen 2-Power-Rancor-Keeper mit rotem Aspekt und einen 5-Power-Octo-Booko ohne den benötigten roten Aspekt. Du willst einen roten IG-2000 aus der Hand discarden. Welches Ziel wählst du für Hold For Questioning?',
    context: 'Der Exhaust auf Octo Booko verhindert mehr Baseschaden. Der Discard darf aber nur eine Karte treffen, die einen Aspekt mit der gewählten Einheit teilt.',
    principle: 'Bei Hold For Questioning ist der Exhaust oft Bonus. Entscheidend ist, welcher Target-Aspekt die gefährlichste Handkarte erreichbar macht.',
    cards: [vaderCards.hold],
    options: [
      { id: 'rancor', label: 'Rancor Keeper – trotz geringerer Power.', grade: 'optimal', feedback: 'Richtig. Du akzeptierst kurzfristig mehr Baseschaden, bekommst dafür Zugriff auf den roten IG-2000 und schützt damit dein Space-Board.' },
      { id: 'octo', label: 'Octo Booko – 5 Schaden verhindern ist wichtiger.', grade: 'error', feedback: 'Das maximiert den Exhaust-Wert, verfehlt aber den strategischen Zweck der Karte: den kritischen IG-2000 zu entfernen.' },
    ],
  },
  {
    id: 'clone-sequencing',
    chapter: 'Sequencing',
    sourceType: 'turnierfall',
    title: 'Erst das große Schiff',
    prompt: 'Du hast Victor Leader, Clone Combat Squadron und TIEs bereit. Du könntest zuerst mit Victor angreifen, einen weiteren TIE erzeugen und das Squadron größer machen. Welche Reihenfolge hält mehr Optionen offen?',
    context: 'Der Gegner kann nach deiner ersten Aktion einen IG-2000 in den Space legen.',
    principle: 'Maximaler theoretischer Damage ist nicht automatisch die beste Sequenz. Sichere die schwer ersetzbare Schadensquelle, wenn eine Reaktion sie sonst neutralisieren kann.',
    cards: [vaderCards.cloneSquadron, vaderCards.victor],
    options: [
      { id: 'squadron', label: 'Clone Combat Squadron zuerst in die Base schicken.', grade: 'optimal', feedback: 'Damit ist der große Baseschaden bereits durch. Victor bleibt bereit und kann danach flexibel den neu gespielten IG-2000 traden.' },
      { id: 'victor', label: 'Victor zuerst angreifen, TIE erzeugen, dann das größere Squadron nutzen.', grade: 'risky', feedback: 'Das maximiert Schaden nur, wenn der Gegner nicht reagiert. Kommt der IG-2000, muss dein großes Squadron womöglich in die Einheit statt in die Base.' },
    ],
  },
  {
    id: 'off-curve-four',
    chapter: 'Off-Curve',
    sourceType: 'prinzip',
    title: 'Vier Ressourcen heißen nicht Vier-Drop',
    prompt: 'Du bist auf 4 Ressourcen. Auf der Hand liegen Hold For Questioning (3), Victor Leader (3), ein 1-Drop und Clone Combat Squadron (4). Welche Denkweise passt am besten zu Björns Plan?',
    context: 'Die gegnerische Hand ist noch nicht bekannt. Das Squadron wäre stark, wenn es liegen bleibt, aber ein kompletter 4-Ressourcen-Commit ist anfällig für Removal.',
    principle: 'Space Vader wird häufig bewusst off-curve gespielt. 1-Drops sind Curve-Filler, damit du Information und Flexibilität gewinnst, ohne Ressourcen zu verschwenden.',
    cards: [vaderCards.hold, vaderCards.victor, vaderCards.cloneSquadron],
    options: [
      { id: 'three-one', label: '3er-Play plus 1-Drop erwägen und beobachten, wie der Gegner reagiert.', grade: 'optimal', feedback: 'Genau darum bleiben die 1-Drops wichtig: Hold oder Victor auf 4 plus ein 1-Drop nutzt alle Ressourcen und hält dich flexibler.' },
      { id: 'four', label: 'Immer Clone Combat Squadron für 4 – on curve ist automatisch effizienter.', grade: 'error', feedback: 'Das ist gerade das Muster, vor dem Björn warnt. Ein wertvolles Squadron blind in unbekanntes Removal zu legen, kann den ganzen Turn verlieren.' },
      { id: 'pass', label: 'Alles offen lassen und komplett passen.', grade: 'risky', feedback: 'Flexibilität ist wichtig, aber das Deck will gleichzeitig eigenen Druck und Boardpräsenz aufbauen.' },
    ],
  },
  {
    id: 'palpatine-resource',
    chapter: 'Resourcing',
    sourceType: 'prinzip',
    title: 'Der erste Palpatine',
    prompt: 'Du ziehst Chancellor Palpatine früh. Was ist Björns Grundregel für die erste Kopie?',
    context: 'Palpatine hat Plot und ist vor allem rund um Vaders Deploy-Turn wertvoll.',
    principle: 'Die erste frühe Kopie wird nahezu immer zur Ressource, damit sie später über Plot verfügbar ist. Eine zweite Kopie kann dagegen für Turn 7 auf der Hand bleiben.',
    cards: [vaderCards.palpatine],
    options: [
      { id: 'resource', label: 'Als Ressource legen und für den späteren Plot-Turn verfügbar halten.', grade: 'optimal', feedback: 'Das ist Björns klare Faustregel für die erste Kopie.' },
      { id: 'hold', label: 'Immer auf der Hand behalten – Plotkarten darf man nicht resourcen.', grade: 'error', feedback: 'Genau umgekehrt: Plot macht die Ressource zum späteren Zugriffspunkt. Die erste Kopie soll typischerweise dort landen.' },
      { id: 'play', label: 'Auf 3 Ressourcen sofort als normale Einheit spielen.', grade: 'risky', feedback: 'Situativ möglich, aber nicht die beschriebene Standardrolle. Sein besonderer Wert liegt im Deploy-/Plot-Fenster.' },
    ],
  },
  {
    id: 'vader-ground-switch',
    chapter: 'Vader Deploy',
    sourceType: 'prinzip',
    title: 'Nicht automatisch als Pilot',
    prompt: 'Dein Space-Board ist groß, der Gegner erreicht aber bald den Turn für Hyperspace Disaster. Welche Idee beschreibt Björns Arena-Switch?',
    context: 'Ein Pilot-Vader konzentriert noch mehr Wert im Space. Ground Vader plus Palpatine kann parallel Druck im Boden erzeugen.',
    principle: 'Vader wird nicht automatisch als Pilot deployed. Gegen einen erwarteten Space-Wipe kann Ground Vader die Bedrohung auf zwei Arenen verteilen.',
    cards: [vaderCards.palpatine],
    options: [
      { id: 'ground', label: 'Vader in den Boden deployen und mit Palpatine zusätzlichen Ground-Druck aufbauen.', grade: 'optimal', feedback: 'Das ist der beschriebene Arena-Switch: Muss der Gegner Ressourcen für den Space-Wipe ausgeben, bleibt dein Ground-Plan bestehen.' },
      { id: 'pilot', label: 'Vader immer als Pilot ins größte Schiff setzen.', grade: 'error', feedback: 'Das macht dich noch anfälliger für einen bekannten Space-Wipe und widerspricht dem zentralen Hinweis, Ground Vader aktiv mitzudenken.' },
      { id: 'delay', label: 'Vader grundsätzlich nicht deployen.', grade: 'risky', feedback: 'Verzögern kann situativ richtig sein, aber der konkrete Plan hier ist Druck auf einer zweiten Arena.' },
    ],
  },
  {
    id: 'boba-vs-ping',
    chapter: 'Matchup',
    sourceType: 'prinzip',
    title: 'Warum Boba gegen Ping so stark ist',
    prompt: 'Ein Ping-Deck versucht Victor Leader über mehrere kleine Schadenspunkte plus Trades abzuräumen. Warum ist Boba Fett als Pilot hier besonders wertvoll?',
    context: 'Boba erhöht Power und Lebenspunkte und verändert damit die gegnerische Removal-Mathematik.',
    principle: 'Nicht jeder Buff ist nur zusätzlicher Schaden. Mehr HP kann komplette gegnerische Trade-Lines ausschalten.',
    cards: [vaderCards.boba, vaderCards.victor],
    options: [
      { id: 'hp', label: 'Er bringt Victor aus effizienter Ping-/Trade-Range und erhöht gleichzeitig den Druck.', grade: 'optimal', feedback: 'Genau das war sein Hauptjob gegen Cad Bane: Das gegnerische Ping-Paket verliert Effizienz, während Boba gleichzeitig Druck hinzufügt.' },
      { id: 'power', label: 'Nur weil +2 Power immer besser ist als zusätzliche Einheiten.', grade: 'error', feedback: 'Der entscheidende Punkt ist gerade nicht nur Schaden, sondern die zusätzliche Haltbarkeit.' },
      { id: 'ground', label: 'Boba ist hier eigentlich nur als Bodeneinheit interessant.', grade: 'error', feedback: 'Er kann flexibel Ground gespielt werden, aber gegen Cad Bane wurde ausdrücklich die Pilot-Rolle als Schutz des Space-Boards hervorgehoben.' },
    ],
  },
  {
    id: 'commandeer-space-sweep',
    chapter: 'Sideboard',
    sourceType: 'turnierfall',
    title: 'Mit dem gegnerischen Schiff aufräumen',
    prompt: 'Der Gegner kontrolliert Blue Ace und einen Stolen AT-Hauler. Du hast einen TIE und Commandeer. Welche Line beschreibt Björns Turnierbeispiel?',
    context: 'Commandeer übernimmt ein ungepilotiertes Vehicle bis 6 Kosten und macht es bereit. Am Regroup würde es normalerweise zum Besitzer zurückkehren.',
    principle: 'Commandeer ist nicht nur Surprise Damage. Im Piloten-Matchup kann es gegnerische Schiffe gegeneinander traden und die Space-Arena drehen.',
    cards: [vaderCards.commandeer],
    options: [
      { id: 'trade', label: 'Blue Ace übernehmen, bereitmachen und zusammen mit dem TIE in den Hauler traden.', grade: 'optimal', feedback: 'So endet die beschriebene Sequenz: Das gekaperte Schiff hilft, den Hauler zu entfernen, und stirbt selbst. Der Gegner bleibt ohne Space-Board zurück.' },
      { id: 'base', label: 'Blue Ace nehmen und nur auf die Base schlagen.', grade: 'solid', feedback: 'Das kann Reach erzeugen, lässt aber in diesem Board den gegnerischen Hauler stehen. Björns konkrete Line priorisierte Arena-Dominanz.' },
      { id: 'hold', label: 'Commandeer für später aufheben und den Space aufgeben.', grade: 'error', feedback: 'Hier liegt genau das Matchup-Fenster vor, für das Commandeer im Sideboard gedacht ist.' },
    ],
  },
  {
    id: 'galen-sentinel',
    chapter: 'Resourcing',
    sourceType: 'prinzip',
    title: 'Reaktive Karte nicht zu früh weglegen',
    prompt: 'Du hältst Galen Erso seit zwei Zügen. Der Gegner kann demnächst einen großen Sentinel wie Home One oder B-Wing Rearguard legen. Was ist die Idee?',
    context: 'Galen ist kein normaler Curve-Drop. Sein Wert entsteht, wenn Saboteur plötzlich einen großen Blocker irrelevant macht.',
    principle: 'Matchup-abhängige Karten dürfen mehrere Züge auf der Hand bleiben. Erst wenn ihr relevantes Fenster unwahrscheinlich wird, werden sie zu Ressourcen.',
    cards: [vaderCards.galen],
    options: [
      { id: 'hold', label: 'Weiter auf der Hand behalten, solange Sentinel-/Arena-Switch realistisch ist.', grade: 'optimal', feedback: 'Genau so beschreibt Björn Galen: oft zwei bis drei Züge halten und erst resourcen, wenn der reaktive Anwendungsfall nicht mehr zu erwarten ist.' },
      { id: 'resource', label: 'Sofort resourcen, weil die Unit selbst wenig Power hat.', grade: 'error', feedback: 'Damit würdest du genau den speziellen Saboteur-Anwendungsfall verlieren, für den die Karte überhaupt im Deck ist.' },
      { id: 'play', label: 'Sofort ausspielen, damit der Effekt schon einmal liegt.', grade: 'risky', feedback: 'Zu frühes Ausspielen kann dem Gegner sogar helfen. Galen ist ausdrücklich als reaktive Karte beschrieben.' },
    ],
  },
  {
    id: 'elzar-reach',
    chapter: 'Reach',
    sourceType: 'prinzip',
    title: 'Der Gegner claimt – ist er wirklich sicher?',
    prompt: 'Ab 6 Ressourcen hat dein Gegner seine Antworten verbraucht oder bereits die Initiative genommen. Warum musst du Elzar Mann auf der Hand als versteckten Schaden mitdenken?',
    context: 'Mit einem Force-Leader kommt Elzar bereit ins Spiel. Zusätzlich kann er Advantage-Marker auf andere freundliche Einheiten verteilen.',
    principle: 'Reach bedeutet Schaden, der im aktuellen Board noch nicht sichtbar ist. Solange 6 Ressourcen offen sind, darf der Gegner nicht nur den sichtbaren Board-Damage zählen.',
    cards: [vaderCards.elzar],
    options: [
      { id: 'reach', label: 'Elzar kann sofort selbst angreifen und zusätzlich Power auf andere bereite Einheiten legen.', grade: 'optimal', feedback: 'Genau deshalb zwingt er den Gegner, ab 6 Ressourcen versteckten Schaden aus der Hand einzurechnen.' },
      { id: 'next', label: 'Elzar ist nur gut, wenn er eine Runde liegen bleibt.', grade: 'error', feedback: 'Seine besondere Rolle ist gerade unmittelbarer Reach: bereit ins Spiel kommen und sofort Schaden ermöglichen.' },
      { id: 'resource', label: 'Ab 6 Ressourcen sollte Elzar meistens sofort zur Ressource werden.', grade: 'error', feedback: 'Damit würdest du eine der stärksten Überraschungs-Lethal-Lines des Decks aus der Hand entfernen.' },
    ],
  },
  {
    id: 'sideboard-palpatine',
    chapter: 'Sideboard',
    sourceType: 'sideboard',
    title: 'Dritte Palpatine-Kopie?',
    prompt: 'Wann möchte Björn die dritte Chancellor-Palpatine-Kopie aus dem Sideboard?',
    context: 'Die Main-Liste spielt zwei Exemplare. Die dritte Kopie verändert nicht den Grundplan, sondern erhöht die Dichte eines Effekts, den das Matchup besonders braucht.',
    principle: 'Das Sideboard soll Space Vader nicht in ein anderes Deck verwandeln. Es verschiebt Ratios in Richtung der Karten, die den vorhandenen Plan im Matchup besser machen.',
    cards: [vaderCards.palpatine],
    options: [
      { id: 'ground-control', label: 'Gegen Ground-Aggro und teils harte Control-Decks mit erwartetem Space-Wipe.', grade: 'optimal', feedback: 'Belegt: Gegen Ground-Aggro blocken die Spy-Sentinels Angriffe. Gegen harte Control-Decks unterstützt Palpatine den Ground-Switch, wenn ein Space-Wipe erwartet wird.' },
      { id: 'all', label: 'In jedem Matchup, weil drei Kopien immer konsistenter sind.', grade: 'error', feedback: 'Gerade deshalb steht die dritte Kopie im Sideboard: Der Effekt ist stark, aber nicht gegen jedes Matchup nötig.' },
      { id: 'mirror-only', label: 'Nur im Vader-Mirror.', grade: 'error', feedback: 'Das ist nicht die von Björn genannte Hauptanwendung.' },
    ],
  },
];

export const spaceVaderChapters = [...new Set(spaceVaderExercises.map(exercise => exercise.chapter))];
