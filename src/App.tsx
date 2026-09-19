import { useState } from 'react';
import { attack, legalTargets, status, type State, type Unit } from '../packages/swu-engine';
import { attackVariants } from './puzzles/first-strike';
import { resourceVariants, type HandCard } from './puzzles/resource-decision';

type AttackExercise = { title: string; goal: string; hint: string; success: string; guidance: string; initial: State };
type ResourceExercise = { title: string; goal: string; context: string; hand: HandCard[]; answer: string[]; selectionCount?: number; success?: string; retry?: string; hint?: string };
type View = 'menu' | 'attack' | 'resources';

const exhaustedBoardSupport: Unit[] = [
  { id: 'refugee-support', name: 'Flüchtling des Pfades', side: 'player', arena: 'ground', power: 0, hp: 3, damage: 0, ready: false, sentinel: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF242-de.jpg', imageAlt: 'Flüchtling des Pfades, deutsche SWU-Karte' },
  { id: 'gifted-support', name: 'Begabtes Straßenkind', side: 'player', arena: 'ground', power: 1, hp: 4, damage: 0, ready: false, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF256-de.jpg', imageAlt: 'Begabtes Straßenkind, deutsche SWU-Karte' },
  { id: 'gungi-support', name: 'Gungi · Findet sich selbst', side: 'player', arena: 'ground', power: 2, hp: 5, damage: 0, ready: false, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF093-de.jpg', imageAlt: 'Gungi, deutsche SWU-Karte' },
  { id: 'yaddle-support', name: 'Yaddle · Zeit, das Richtige zu tun', side: 'player', arena: 'ground', power: 2, hp: 4, damage: 0, ready: false, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF045-de.jpg', imageAlt: 'Yaddle, deutsche SWU-Karte' },
  { id: 'paladin-support', name: 'Paladin-Trainingskorvette', side: 'player', arena: 'space', power: 3, hp: 5, damage: 0, ready: false, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF099-de.jpg', imageAlt: 'Paladin-Trainingskorvette, deutsche SWU-Karte' },
];
const handSupport: HandCard[] = exhaustedBoardSupport.slice(1, 4).map(card => ({ id: `hand-${card.id}`, name: card.name, cost: card.name.startsWith('Begabtes') ? 2 : 2, imageUrl: card.imageUrl! }));
function boardState(initial: State): State { return structuredClone({ ...initial, units: [...initial.units, ...exhaustedBoardSupport] }); }

function Header({ back }: { back?: () => void }) {
  return <header><a href="/" className="brand" onClick={(event) => { event.preventDefault(); back?.(); }}>SWU <span>TRAINER</span></a><span className="badge">AHSOKA · LERNPFAD</span></header>;
}

function AttackPuzzle({ back, startIndex }: { back: () => void; startIndex: number }) {
  const [variantIndex, setVariantIndex] = useState(startIndex);
  const exercise = attackVariants[variantIndex] as AttackExercise;
  const [history, setHistory] = useState<State[]>([boardState(exercise.initial)]);
  const [selected, setSelected] = useState<string | null>(null);
  const [hint, setHint] = useState(false);
  const state = history[history.length - 1];
  const outcome = status(state);
  const targets = selected ? legalTargets(state, selected) : [];
  const baseMaxHp = state.baseMaxHp ?? state.baseHp;

  function hit(targetId: string) {
    if (!selected || !targets.includes(targetId)) return;
    setHistory([...history, attack(state, { attackerId: selected, targetId })]);
    setSelected(null);
  }
  function nextVariant() {
    const nextIndex = (variantIndex + 1) % attackVariants.length;
    setVariantIndex(nextIndex);
    setHistory([boardState(attackVariants[nextIndex].initial)]);
    setSelected(null);
    setHint(false);
  }
  function card(unit: Unit) {
    const own = unit.side === 'player';
    return <button key={unit.id} className={`card ${own ? 'ally' : 'enemy'} ${selected === unit.id ? 'selected' : ''}`} disabled={own ? !unit.ready || outcome !== 'playing' : !targets.includes(unit.id)} aria-pressed={own ? selected === unit.id : undefined} onClick={() => own ? setSelected(selected === unit.id ? null : unit.id) : hit(unit.id)}>
      {unit.imageUrl ? <img src={unit.imageUrl} alt={unit.imageAlt ?? unit.name} /> : <strong>{unit.name}</strong>}
      <span className="card-status">{unit.sentinel ? 'Wachposten · ' : ''}{unit.ready ? 'Bereit' : 'Erschöpft'}{unit.damage > 0 ? ` · ${unit.damage} Schaden` : ''}</span>
    </button>;
  }

  return <main><Header back={back} /><section className="intro"><p className="eyebrow">ANGRIFFSTRAINING · VARIANTE {variantIndex + 1} / {attackVariants.length}</p><h1>{exercise.title}</h1><p>{exercise.goal}</p></section>
    <div className="layout"><section className="board" aria-label="Spielbrett"><div className="zone-heading"><h2>Gegner</h2><span>Passt nach jedem deiner Angriffe</span></div><div className="base-area"><button className="base" disabled={!targets.includes('base')} onClick={() => hit('base')}>{state.baseImageUrl && <img src={state.baseImageUrl} alt={state.baseImageAlt ?? state.baseName ?? 'Gegnerische Basis'} />}</button><div className="damage-panel" aria-label={`${state.baseName ?? 'Gegnerische Basis'}: ${state.baseHp} von ${baseMaxHp} Lebenspunkten übrig`}><strong className="base-health">{state.baseHp} <small>/ {baseMaxHp} LP</small></strong>{state.baseDamageTokens?.length ? <div className="damage-tokens" aria-label={`${baseMaxHp - state.baseHp} Schaden auf der gegnerischen Basis`}>{state.baseDamageTokens.map((damage, index) => <span className="damage-token" key={`${damage}-${index}`}>{damage}</span>)}</div> : null}</div></div><div className="arena">BODENARENA</div><div className="cards">{state.units.filter(unit => unit.side === 'opponent' && unit.arena === 'ground').map(card)}</div><div className="cards">{state.units.filter(unit => unit.side === 'player' && unit.arena === 'ground').map(card)}</div><div className="arena">RAUMARENA</div><div className="cards">{state.units.filter(unit => unit.side === 'player' && unit.arena === 'space').map(card)}</div><div className="zone-heading"><h2>Deine Einheiten</h2><span>{state.units.filter(unit => unit.side === 'player' && unit.ready).length} bereit · {state.units.filter(unit => unit.side === 'player').length} im Spiel</span></div></section>
      <aside><section className="panel"><p className="eyebrow">DEIN NÄCHSTER SCHRITT</p><h2 role="status">{outcome === 'won' ? 'Puzzle gelöst!' : outcome === 'lost' ? 'Die Basis steht noch.' : selected ? 'Wähle dein Angriffsziel' : 'Wähle eine bereite Einheit'}</h2><p>{outcome === 'won' ? exercise.success : outcome === 'lost' ? 'Keine bereite Einheit übrig. Probiere eine andere Reihenfolge.' : exercise.guidance}</p><div className="actions"><button onClick={() => { setHistory(history.slice(0, -1)); setSelected(null); }} disabled={history.length === 1}>Rückgängig</button><button onClick={() => { setHistory([boardState(exercise.initial)]); setSelected(null); setHint(false); }}>Neu starten</button></div><button className="primary" onClick={nextVariant}>Nächste Situation</button><button className="hint" aria-expanded={hint} onClick={() => setHint(!hint)}>Hinweis {hint ? 'ausblenden' : 'anzeigen'}</button>{hint && <p>{exercise.hint}</p>}</section><section className="panel"><h2>Deine Hand</h2><div className="hand-preview">{handSupport.map(card => <img key={card.id} src={card.imageUrl} alt={`${card.name}, deutsche SWU-Karte in deiner Hand`} />)}</div></section><section className="panel"><h2>Aktionsprotokoll</h2>{state.log.length ? <ol>{state.log.map((line, index) => <li key={index}>{line}</li>)}</ol> : <p>Noch kein Angriff. Du beginnst.</p>}</section></aside></div></main>;
}

function shuffled(cards: HandCard[]) {
  return [...cards].sort(() => Math.random() - 0.5);
}

function ResourcePuzzle({ back, startIndex }: { back: () => void; startIndex: number }) {
  const [variantIndex, setVariantIndex] = useState(startIndex);
  const exercise = resourceVariants[variantIndex] as ResourceExercise;
  const fullHand = (scenario: ResourceExercise) => [...scenario.hand, ...handSupport];
  const [hand, setHand] = useState(() => shuffled(fullHand(exercise)));
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const selectionCount = exercise.selectionCount ?? 2;
  const answerIsCorrect = selected.length === selectionCount && selected.every(id => exercise.answer.includes(id));
  function toggle(id: string) { setChecked(false); setSelected(current => current.includes(id) ? current.filter(cardId => cardId !== id) : current.length === selectionCount ? current : [...current, id]); }
  function nextVariant() {
    const nextIndex = (variantIndex + 1) % resourceVariants.length;
    const nextExercise = resourceVariants[nextIndex] as ResourceExercise;
    setVariantIndex(nextIndex);
    setHand(shuffled(fullHand(nextExercise)));
    setSelected([]);
    setChecked(false);
  }
  const defaultHint = selectionCount === 1 ? 'Welche Karte passt erst zu deiner sechsten Ressource?' : 'Für die Anfangsressourcen sind Karten mit hohen Kosten oft die besseren Kandidaten, wenn deine Hand bereits frühe Spielzüge abdeckt.';
  return <main><Header back={back} /><section className="intro"><p className="eyebrow">RESSOURCENTRAINING · VARIANTE {variantIndex + 1} / {resourceVariants.length}</p><h1>{exercise.title}</h1><p>{exercise.goal}</p></section><section className="resource-layout"><div className="resource-panel"><p>{exercise.context}</p><div className="selection-meter"><strong>{selected.length} / {selectionCount}</strong><span>{selectionCount === 1 ? 'Karte als Ressource wählen' : 'Karten als Ressourcen wählen'}</span></div><div className="hand" aria-label="Deine Hand">{hand.map(card => <button className={`resource-card ${selected.includes(card.id) ? 'resource-selected' : ''}`} key={card.id} onClick={() => toggle(card.id)} aria-pressed={selected.includes(card.id)}><img src={card.imageUrl} alt={`${card.name}, deutsche SWU-Karte`} /><span>{selected.includes(card.id) ? 'Als Ressource gewählt' : `${card.cost} Kosten`}</span></button>)}</div></div><aside className="panel resource-help"><p className="eyebrow">DEINE ENTSCHEIDUNG</p><h2>{checked ? answerIsCorrect ? 'Gute Reserve.' : 'Noch einmal prüfen.' : selectionCount === 1 ? 'Wähle eine Karte' : 'Wähle zwei Karten'}</h2><p>{checked ? answerIsCorrect ? exercise.success ?? 'Deine Auswahl passt zu diesem Zug.' : exercise.retry ?? 'Überlege, welche Karten dir früh Optionen geben und welche erst später ins Spiel kommen.' : exercise.hint ?? defaultHint}</p><button className="primary" disabled={selected.length !== selectionCount} onClick={() => setChecked(true)}>Entscheidung prüfen</button>{checked && !answerIsCorrect && <button className="hint" onClick={() => setSelected(exercise.answer)}>Lösung markieren</button>}<button className="text-button" onClick={() => { setSelected([]); setChecked(false); }}>Auswahl zurücksetzen</button><button className="primary" onClick={nextVariant}>Nächste Hand</button></aside></section></main>;
}

function Menu({ select }: { select: (view: View) => void }) {
  return <main><Header /><section className="intro"><p className="eyebrow">DEIN DECK · AHSOKA TANO</p><h1>Was möchtest du üben?</h1><p>Jeder Bereich enthält mehrere Situationen; mit „Nächste Situation“ oder „Nächste Hand“ wechselst du direkt weiter.</p></section><section className="scenario-list"><button className="scenario" onClick={() => select('attack')}><span className="scenario-number">{attackVariants.length}</span><span><strong>Angriffe planen</strong><small>Wachposten · Schaden · Angriffsreihenfolge</small></span><b>Trainieren</b></button><button className="scenario" onClick={() => select('resources')}><span className="scenario-number">{resourceVariants.length}</span><span><strong>Ressourcen planen</strong><small>Eröffnung · Kostenkurve · Handreihenfolge</small></span><b>Trainieren</b></button></section></main>;
}

export function App() {
  const [view, setView] = useState<View>('menu');
  if (view === 'attack') return <AttackPuzzle key="attack" back={() => setView('menu')} startIndex={Math.floor(Math.random() * attackVariants.length)} />;
  if (view === 'resources') return <ResourcePuzzle key="resources" back={() => setView('menu')} startIndex={Math.floor(Math.random() * resourceVariants.length)} />;
  return <Menu select={setView} />;
}
