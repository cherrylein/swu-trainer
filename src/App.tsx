import { useState } from 'react';
import { attack, legalTargets, status, type State, type Unit } from '../packages/swu-engine';
import { puzzle } from './puzzles/first-strike';

export function App() {
  const [history, setHistory] = useState<State[]>([structuredClone(puzzle.initial)]);
  const [selected, setSelected] = useState<string | null>(null);
  const [hint, setHint] = useState(false);
  const state = history[history.length - 1];
  const outcome = status(state);
  const targets = selected ? legalTargets(state, selected) : [];
  function hit(targetId: string) {
    if (!selected || !targets.includes(targetId)) return;
    setHistory([...history, attack(state, { attackerId: selected, targetId })]);
    setSelected(null);
  }
  function card(unit: Unit) {
    const own = unit.side === 'player';
    return <button key={unit.id} className={`card ${own ? 'ally' : 'enemy'} ${selected === unit.id ? 'selected' : ''}`}
      disabled={own ? !unit.ready || outcome !== 'playing' : !targets.includes(unit.id)}
      aria-pressed={own ? selected === unit.id : undefined}
      onClick={() => own ? setSelected(selected === unit.id ? null : unit.id) : hit(unit.id)}>
      <span className="eyebrow">{unit.sentinel ? 'WACHPOSTEN · SENTINEL' : 'BODENEINHEIT'}</span>
      <strong>{unit.name}</strong><span className="stats">{unit.power} <small>Angriff</small> / {unit.hp - unit.damage} <small>LP</small></span>
      <span>{unit.ready ? 'Bereit' : 'Erschöpft'}{unit.damage > 0 ? ` · ${unit.damage} Schaden` : ''}</span>
    </button>;
  }
  return <main>
    <header><a href="/" className="brand">SWU <span>TRAINER</span></a><span className="badge">PUZZLE 01 · GRUNDLAGEN</span></header>
    <section className="intro"><p className="eyebrow">TAKTIK BEGINNT MIT EINER ENTSCHEIDUNG</p><h1>{puzzle.title}</h1><p>{puzzle.goal}</p></section>
    <div className="layout"><section className="board" aria-label="Spielbrett">
      <div className="zone-heading"><h2>Gegner</h2><span>Passt nach jedem deiner Angriffe</span></div>
      <button className="base" disabled={!targets.includes('base')} onClick={() => hit('base')}><span>GEGNERISCHE BASIS</span><strong>{state.baseHp} <small>LP</small></strong></button>
      <div className="cards">{state.units.filter(u => u.side === 'opponent').map(card)}</div>
      <div className="arena">BODENARENA</div>
      <div className="cards">{state.units.filter(u => u.side === 'player').map(card)}</div>
      <div className="zone-heading"><h2>Deine Einheiten</h2><span>{state.units.filter(u => u.side === 'player' && u.ready).length} bereit</span></div>
    </section><aside>
      <section className="panel"><p className="eyebrow">DEIN NÄCHSTER SCHRITT</p>
        <h2 role="status">{outcome === 'won' ? 'Puzzle gelöst!' : outcome === 'lost' ? 'Die Basis steht noch.' : selected ? 'Wähle dein Angriffsziel' : 'Wähle eine bereite Einheit'}</h2>
        <p>{outcome === 'won' ? 'Du hast den Wachposten mit dem Spähtrupp entfernt und die Schlagkraft des Stoßtrupps für die Basis aufgehoben.' : outcome === 'lost' ? 'Keine bereite Einheit übrig. Probiere eine andere Reihenfolge.' : 'Ein Wachposten schützt die Basis. Im Kampf verursachen beide Einheiten gleichzeitig Schaden.'}</p>
        <div className="actions"><button onClick={() => { setHistory(history.slice(0, -1)); setSelected(null); }} disabled={history.length === 1}>Rückgängig</button><button onClick={() => { setHistory([structuredClone(puzzle.initial)]); setSelected(null); setHint(false); }}>Neu starten</button></div>
        <button className="hint" aria-expanded={hint} onClick={() => setHint(!hint)}>Hinweis {hint ? 'ausblenden' : 'anzeigen'}</button>{hint && <p>{puzzle.hint}</p>}
      </section>
      <section className="panel"><h2>Aktionsprotokoll</h2>{state.log.length ? <ol>{state.log.map((line, i) => <li key={i}>{line}</li>)}</ol> : <p>Noch kein Angriff. Du beginnst.</p>}</section>
    </aside></div>
    <footer>Inoffizieller Lernprototyp mit fiktiven Übungseinheiten. Nur Angriffe, Wachposten und Schaden; keine vollständige SWU-Regelengine. Der Gegner passt immer, es gibt keine neue Runde.</footer>
  </main>;
}
