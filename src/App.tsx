import { useState } from 'react';
import { attack, legalTargets, status, type State, type Unit } from '../packages/swu-engine';
import { puzzle, saveTheStrike } from './puzzles/first-strike';
import { resourceDecision, resourceDecisionSix, type HandCard } from './puzzles/resource-decision';

type AttackExercise = { title: string; goal: string; hint: string; success: string; guidance: string; initial: State };
type ResourceExercise = { title: string; goal: string; context: string; hand: HandCard[]; answer: string[]; selectionCount?: number; success?: string; retry?: string; hint?: string };
type View = 'menu' | 'attack-1' | 'attack-2' | 'resources-1' | 'resources-2';

function Header({ back }: { back?: () => void }) {
  return <header><a href="/" className="brand" onClick={(event) => { event.preventDefault(); back?.(); }}>SWU <span>TRAINER</span></a><span className="badge">AHSOKA · LERNPFAD</span></header>;
}

function AttackPuzzle({ back, exercise, number }: { back: () => void; exercise: AttackExercise; number: string }) {
  const [history, setHistory] = useState<State[]>([structuredClone(exercise.initial)]);
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
  function card(unit: Unit) {
    const own = unit.side === 'player';
    return <button key={unit.id} className={`card ${own ? 'ally' : 'enemy'} ${selected === unit.id ? 'selected' : ''}`} disabled={own ? !unit.ready || outcome !== 'playing' : !targets.includes(unit.id)} aria-pressed={own ? selected === unit.id : undefined} onClick={() => own ? setSelected(selected === unit.id ? null : unit.id) : hit(unit.id)}>
      {unit.imageUrl ? <img src={unit.imageUrl} alt={unit.imageAlt ?? unit.name} /> : <strong>{unit.name}</strong>}
      <span className="card-status">{unit.sentinel ? 'Wachposten · ' : ''}{unit.ready ? 'Bereit' : 'Erschöpft'}{unit.damage > 0 ? ` · ${unit.damage} Schaden` : ''}</span>
    </button>;
  }
  return <main><Header back={back} /><section className="intro"><p className="eyebrow">ÜBUNG {number} · ANGRIFFSREIHENFOLGE</p><h1>{exercise.title}</h1><p>{exercise.goal}</p></section>
    <div className="layout"><section className="board" aria-label="Spielbrett"><div className="zone-heading"><h2>Gegner</h2><span>Passt nach jedem deiner Angriffe</span></div><div className="base-area"><button className="base" disabled={!targets.includes('base')} onClick={() => hit('base')}>{state.baseImageUrl && <img src={state.baseImageUrl} alt={state.baseImageAlt ?? state.baseName ?? 'Gegnerische Basis'} />}</button><div className="damage-panel" aria-label={`${state.baseName ?? 'Gegnerische Basis'}: ${state.baseHp} von ${baseMaxHp} Lebenspunkten übrig`}><strong className="base-health">{state.baseHp} <small>/ {baseMaxHp} LP</small></strong>{state.baseDamageTokens?.length ? <div className="damage-tokens" aria-label={`${baseMaxHp - state.baseHp} Schaden auf der gegnerischen Basis`}>{state.baseDamageTokens.map((damage, index) => <span className="damage-token" key={`${damage}-${index}`}>{damage}</span>)}</div> : null}</div></div><div className="cards">{state.units.filter(u => u.side === 'opponent').map(card)}</div><div className="arena">BODENARENA</div><div className="cards">{state.units.filter(u => u.side === 'player').map(card)}</div><div className="zone-heading"><h2>Deine Einheiten</h2><span>{state.units.filter(u => u.side === 'player' && u.ready).length} bereit</span></div></section>
      <aside><section className="panel"><p className="eyebrow">DEIN NÄCHSTER SCHRITT</p><h2 role="status">{outcome === 'won' ? 'Puzzle gelöst!' : outcome === 'lost' ? 'Die Basis steht noch.' : selected ? 'Wähle dein Angriffsziel' : 'Wähle eine bereite Einheit'}</h2><p>{outcome === 'won' ? exercise.success : outcome === 'lost' ? 'Keine bereite Einheit übrig. Probiere eine andere Reihenfolge.' : exercise.guidance}</p><div className="actions"><button onClick={() => { setHistory(history.slice(0, -1)); setSelected(null); }} disabled={history.length === 1}>Rückgängig</button><button onClick={() => { setHistory([structuredClone(exercise.initial)]); setSelected(null); setHint(false); }}>Neu starten</button></div><button className="hint" aria-expanded={hint} onClick={() => setHint(!hint)}>Hinweis {hint ? 'ausblenden' : 'anzeigen'}</button>{hint && <p>{exercise.hint}</p>}</section><section className="panel"><h2>Aktionsprotokoll</h2>{state.log.length ? <ol>{state.log.map((line, i) => <li key={i}>{line}</li>)}</ol> : <p>Noch kein Angriff. Du beginnst.</p>}</section></aside></div></main>;
}

function ResourcePuzzle({ back, exercise, number }: { back: () => void; exercise: ResourceExercise; number: string }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const selectionCount = exercise.selectionCount ?? 2;
  const answerIsCorrect = selected.length === selectionCount && selected.every(id => exercise.answer.includes(id));
  function toggle(id: string) { setChecked(false); setSelected(current => current.includes(id) ? current.filter(cardId => cardId !== id) : current.length === selectionCount ? current : [...current, id]); }
  const defaultHint = selectionCount === 1 ? 'Welche Karte passt erst zu deiner sechsten Ressource?' : 'Für die Anfangsressourcen sind Karten mit hohen Kosten oft die besseren Kandidaten, wenn deine Hand bereits frühe Spielzüge abdeckt.';
  return <main><Header back={back} /><section className="intro"><p className="eyebrow">ÜBUNG {number} · RESSOURCEN</p><h1>{exercise.title}</h1><p>{exercise.goal}</p></section><section className="resource-layout"><div className="resource-panel"><p>{exercise.context}</p><div className="selection-meter"><strong>{selected.length} / {selectionCount}</strong><span>{selectionCount === 1 ? 'Karte als Ressource wählen' : 'Karten als Ressourcen wählen'}</span></div><div className="hand" aria-label="Deine Hand">{exercise.hand.map(card => <button className={`resource-card ${selected.includes(card.id) ? 'resource-selected' : ''}`} key={card.id} onClick={() => toggle(card.id)} aria-pressed={selected.includes(card.id)}><img src={card.imageUrl} alt={`${card.name}, deutsche SWU-Karte`} /><span>{selected.includes(card.id) ? 'Als Ressource gewählt' : `${card.cost} Kosten`}</span></button>)}</div></div><aside className="panel resource-help"><p className="eyebrow">DEINE ENTSCHEIDUNG</p><h2>{checked ? answerIsCorrect ? 'Gute Reserve.' : 'Noch einmal prüfen.' : selectionCount === 1 ? 'Wähle eine Karte' : 'Wähle zwei Karten'}</h2><p>{checked ? answerIsCorrect ? exercise.success ?? 'Deine Auswahl passt zu diesem Zug.' : exercise.retry ?? 'Überlege, welche Karten dir früh Optionen geben und welche erst später ins Spiel kommen.' : exercise.hint ?? defaultHint}</p><button className="primary" disabled={selected.length !== selectionCount} onClick={() => setChecked(true)}>Entscheidung prüfen</button>{checked && !answerIsCorrect && <button className="hint" onClick={() => setSelected(exercise.answer)}>Lösung markieren</button>}<button className="text-button" onClick={() => { setSelected([]); setChecked(false); }}>Auswahl zurücksetzen</button></aside></section></main>;
}

function Menu({ select }: { select: (view: View) => void }) {
  const exercises: { id: Exclude<View, 'menu'>; number: string; title: string; kind: string; }[] = [
    { id: 'attack-1', number: '01', title: 'Den Weg freikämpfen', kind: 'Angriffsreihenfolge · Wachposten' },
    { id: 'resources-1', number: '02', title: 'Die richtige Reserve', kind: 'Eröffnung · Ressourcenentscheidung' },
    { id: 'attack-2', number: '03', title: 'Kraft für den Endstoß', kind: 'Angriffsreihenfolge · Schaden planen' },
    { id: 'resources-2', number: '04', title: 'Der nächste Meilenstein', kind: 'Ressourcen · Kostenkurve' },
  ];
  return <main><Header /><section className="intro"><p className="eyebrow">DEIN DECK · AHSOKA TANO</p><h1>Was möchtest du üben?</h1><p>Kurze Spielsituationen mit deutschen Kartenbildern aus deinem Deck.</p></section><section className="scenario-list">{exercises.map(exercise => <button className="scenario" key={exercise.id} onClick={() => select(exercise.id)}><span className="scenario-number">{exercise.number}</span><span><strong>{exercise.title}</strong><small>{exercise.kind}</small></span><b>Spielen</b></button>)}</section></main>;
}

export function App() {
  const [view, setView] = useState<View>('menu');
  if (view === 'attack-1') return <AttackPuzzle back={() => setView('menu')} exercise={puzzle} number="01" />;
  if (view === 'attack-2') return <AttackPuzzle back={() => setView('menu')} exercise={saveTheStrike} number="03" />;
  if (view === 'resources-1') return <ResourcePuzzle back={() => setView('menu')} exercise={resourceDecision} number="02" />;
  if (view === 'resources-2') return <ResourcePuzzle back={() => setView('menu')} exercise={resourceDecisionSix} number="04" />;
  return <Menu select={setView} />;
}
