import { useState } from 'react';
import { attack, legalTargets, status, type State, type Unit } from '../packages/swu-engine';
import { puzzle } from './puzzles/first-strike';
import { resourceDecision } from './puzzles/resource-decision';

type View = 'menu' | 'attack' | 'resources';

function Header({ back }: { back?: () => void }) {
  return <header><a href="/" className="brand" onClick={(event) => { event.preventDefault(); back?.(); }}>SWU <span>TRAINER</span></a><span className="badge">AHSOKA · LERNPFAD</span></header>;
}

function AttackPuzzle({ back }: { back: () => void }) {
  const [history, setHistory] = useState<State[]>([structuredClone(puzzle.initial)]);
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
  return <main><Header back={back} /><section className="intro"><p className="eyebrow">ÜBUNG 01 · ANGRIFFSREIHENFOLGE</p><h1>{puzzle.title}</h1><p>{puzzle.goal}</p></section>
    <div className="layout"><section className="board" aria-label="Spielbrett"><div className="zone-heading"><h2>Gegner</h2><span>Passt nach jedem deiner Angriffe</span></div><div className="base-area"><button className="base" disabled={!targets.includes('base')} onClick={() => hit('base')}>{state.baseImageUrl && <img src={state.baseImageUrl} alt={state.baseImageAlt ?? state.baseName ?? 'Gegnerische Basis'} />}</button><div className="damage-panel" aria-label={`${state.baseName ?? 'Gegnerische Basis'}: ${state.baseHp} von ${baseMaxHp} Lebenspunkten übrig`}><strong className="base-health">{state.baseHp} <small>/ {baseMaxHp} LP</small></strong>{state.baseDamageTokens?.length ? <div className="damage-tokens" aria-label={`${baseMaxHp - state.baseHp} Schaden auf der gegnerischen Basis`}>{state.baseDamageTokens.map((damage, index) => <span className="damage-token" key={`${damage}-${index}`}>{damage}</span>)}</div> : null}</div></div><div className="cards">{state.units.filter(u => u.side === 'opponent').map(card)}</div><div className="arena">BODENARENA</div><div className="cards">{state.units.filter(u => u.side === 'player').map(card)}</div><div className="zone-heading"><h2>Deine Einheiten</h2><span>{state.units.filter(u => u.side === 'player' && u.ready).length} bereit</span></div></section>
      <aside><section className="panel"><p className="eyebrow">DEIN NÄCHSTER SCHRITT</p><h2 role="status">{outcome === 'won' ? 'Puzzle gelöst!' : outcome === 'lost' ? 'Die Basis steht noch.' : selected ? 'Wähle dein Angriffsziel' : 'Wähle eine bereite Einheit'}</h2><p>{outcome === 'won' ? 'Du hast den Loth-Wolf mit Vernestra Rwoh entfernt und die Schlagkraft des Gefräßigen Gundarks für die Basis aufgehoben.' : outcome === 'lost' ? 'Keine bereite Einheit übrig. Probiere eine andere Reihenfolge.' : 'Der Loth-Wolf schützt die Basis mit Wachposten. Im Kampf verursachen beide Einheiten gleichzeitig Schaden.'}</p><div className="actions"><button onClick={() => { setHistory(history.slice(0, -1)); setSelected(null); }} disabled={history.length === 1}>Rückgängig</button><button onClick={() => { setHistory([structuredClone(puzzle.initial)]); setSelected(null); setHint(false); }}>Neu starten</button></div><button className="hint" aria-expanded={hint} onClick={() => setHint(!hint)}>Hinweis {hint ? 'ausblenden' : 'anzeigen'}</button>{hint && <p>{puzzle.hint}</p>}</section><section className="panel"><h2>Aktionsprotokoll</h2>{state.log.length ? <ol>{state.log.map((line, i) => <li key={i}>{line}</li>)}</ol> : <p>Noch kein Angriff. Du beginnst.</p>}</section></aside></div></main>;
}

function ResourcePuzzle({ back }: { back: () => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const answerIsCorrect = selected.length === 2 && selected.every(id => resourceDecision.answer.includes(id));
  function toggle(id: string) { setChecked(false); setSelected(current => current.includes(id) ? current.filter(cardId => cardId !== id) : current.length === 2 ? current : [...current, id]); }
  return <main><Header back={back} /><section className="intro"><p className="eyebrow">ÜBUNG 02 · ERÖFFNUNG</p><h1>{resourceDecision.title}</h1><p>{resourceDecision.goal}</p></section><section className="resource-layout"><div className="resource-panel"><p>{resourceDecision.context}</p><div className="selection-meter"><strong>{selected.length} / 2</strong><span>Karten als Ressourcen wählen</span></div><div className="hand" aria-label="Deine Starthand">{resourceDecision.hand.map(card => <button className={`resource-card ${selected.includes(card.id) ? 'resource-selected' : ''}`} key={card.id} onClick={() => toggle(card.id)} aria-pressed={selected.includes(card.id)}><img src={card.imageUrl} alt={`${card.name}, deutsche SWU-Karte`} /><span>{selected.includes(card.id) ? 'Als Ressource gewählt' : `${card.cost} Kosten`}</span></button>)}</div></div><aside className="panel resource-help"><p className="eyebrow">DEINE ENTSCHEIDUNG</p><h2>{checked ? answerIsCorrect ? 'Gute Reserve.' : 'Noch einmal prüfen.' : 'Wähle zwei Karten'}</h2><p>{checked ? answerIsCorrect ? 'Du behältst vier günstige Spieloptionen. Anakin und der Dagoyanische Meister sind stark, aber für den Einstieg dieser Hand zu teuer.' : 'Für diese Hand willst du deine günstigen Einheiten behalten. Überlege, welche beiden Karten du mit fünf oder sechs Ressourcen erst sinnvoll einsetzen kannst.' : 'Für die Anfangsressourcen sind Karten mit hohen Kosten oft die besseren Kandidaten, wenn deine Hand bereits frühe Spielzüge abdeckt.'}</p><button className="primary" disabled={selected.length !== 2} onClick={() => setChecked(true)}>Entscheidung prüfen</button>{checked && !answerIsCorrect && <button className="hint" onClick={() => setSelected(resourceDecision.answer)}>Lösung markieren</button>}<button className="text-button" onClick={() => { setSelected([]); setChecked(false); }}>Auswahl zurücksetzen</button></aside></section></main>;
}

function Menu({ select }: { select: (view: View) => void }) {
  return <main><Header /><section className="intro"><p className="eyebrow">DEIN DECK · AHSOKA TANO</p><h1>Was möchtest du üben?</h1><p>Kurze Spielsituationen mit deutschen Kartenbildern aus deinem Deck.</p></section><section className="scenario-list"><button className="scenario" onClick={() => select('attack')}><span className="scenario-number">01</span><span><strong>Den Weg freikämpfen</strong><small>Angriffsreihenfolge · Wachposten</small></span><b>Spielen</b></button><button className="scenario" onClick={() => select('resources')}><span className="scenario-number">02</span><span><strong>Die richtige Reserve</strong><small>Eröffnung · Ressourcenentscheidung</small></span><b>Spielen</b></button></section></main>;
}

export function App() {
  const [view, setView] = useState<View>('menu');
  if (view === 'attack') return <AttackPuzzle back={() => setView('menu')} />;
  if (view === 'resources') return <ResourcePuzzle back={() => setView('menu')} />;
  return <Menu select={setView} />;
}
