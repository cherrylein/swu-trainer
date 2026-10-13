import { useMemo, useState } from 'react';
import { spaceVaderExercises, type DecisionGrade, type TrainerCard } from './puzzles/space-vader-bootcamp';

const scoreFor: Record<DecisionGrade, number> = { optimal: 3, solid: 2, risky: 1, error: 0 };
const labelFor: Record<DecisionGrade, string> = { optimal: 'Optimal', solid: 'Solide', risky: 'Riskant', error: 'Fehler' };

type StoredResult = { grade: DecisionGrade; attempts: number };

function loadResults(): Record<string, StoredResult> {
  try {
    const raw = localStorage.getItem('swu-space-vader-results');
    return raw ? JSON.parse(raw) as Record<string, StoredResult> : {};
  } catch {
    return {};
  }
}

function CardFigure({ card, onOpen }: { card: TrainerCard; onOpen: (card: TrainerCard) => void }) {
  const title = card.nameDe ?? card.nameEn;
  return <figure className="trainer-card">
    <button className="trainer-card-image" onClick={() => onOpen(card)} aria-label={`${title} vergrößern`}>
      <img src={card.imageUrl} alt={`${title}, deutsche SWU-Karte`} />
    </button>
    <figcaption>
      <strong>{title}</strong>
      {card.nameDe && card.nameDe !== card.nameEn ? <small>{card.nameEn}</small> : null}
      <em>{card.set} {card.collectorNumber}</em>
    </figcaption>
  </figure>;
}

export function SpaceVaderBootcamp({ back }: { back: () => void }) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, StoredResult>>(() => loadResults());
  const [focusCard, setFocusCard] = useState<TrainerCard | null>(null);

  const exercise = spaceVaderExercises[index];
  const selected = exercise.options.find(option => option.id === choice);

  const readiness = useMemo(() => {
    const values = Object.values(results);
    if (!values.length) return 0;
    return Math.round((values.reduce((sum, result) => sum + scoreFor[result.grade], 0) / (values.length * 3)) * 100);
  }, [results]);

  const chapterScores = useMemo(() => {
    return [...new Set(spaceVaderExercises.map(item => item.chapter))].map(chapter => {
      const exercises = spaceVaderExercises.filter(item => item.chapter === chapter);
      const answered = exercises.flatMap(item => results[item.id] ? [results[item.id]] : []);
      const score = answered.length
        ? Math.round((answered.reduce((sum, result) => sum + scoreFor[result.grade], 0) / (answered.length * 3)) * 100)
        : 0;
      return { chapter, answered: answered.length, total: exercises.length, score };
    });
  }, [results]);

  function choose(id: string) {
    if (choice) return;
    const option = exercise.options.find(item => item.id === id);
    if (!option) return;
    setChoice(id);
    setResults(current => {
      const previous = current[exercise.id];
      const next = {
        ...current,
        [exercise.id]: { grade: option.grade, attempts: (previous?.attempts ?? 0) + 1 },
      };
      localStorage.setItem('swu-space-vader-results', JSON.stringify(next));
      return next;
    });
  }

  function next() {
    setIndex(current => (current + 1) % spaceVaderExercises.length);
    setChoice(null);
  }

  function jumpTo(chapter: string) {
    const target = spaceVaderExercises.findIndex(item => item.chapter === chapter);
    if (target >= 0) {
      setIndex(target);
      setChoice(null);
    }
  }

  function reset() {
    localStorage.removeItem('swu-space-vader-results');
    setResults({});
    setChoice(null);
    setIndex(0);
  }

  return <main className="vader-shell">
    <header>
      <a href="/" className="brand" onClick={(event) => { event.preventDefault(); back(); }}>SWU <span>TRAINER</span></a>
      <span className="badge vader-badge">SPACE VADER · BOOTCAMP</span>
    </header>

    <section className="vader-hero">
      <div>
        <p className="eyebrow">UTRECHT TRAINING · {index + 1} / {spaceVaderExercises.length}</p>
        <h1>{exercise.title}</h1>
        <p>{exercise.prompt}</p>
      </div>
      <div className="readiness" aria-label={`Space Vader Readiness ${readiness} Prozent`}>
        <strong>{readiness}%</strong>
        <span>Readiness</span>
      </div>
    </section>

    <div className="vader-chapter-strip" aria-label="Kapitel">
      {chapterScores.map(item => <button key={item.chapter} className={item.chapter === exercise.chapter ? 'active' : ''} onClick={() => jumpTo(item.chapter)}>
        <strong>{item.chapter}</strong>
        <small>{item.answered}/{item.total} · {item.score}%</small>
      </button>)}
    </div>

    <section className="vader-grid">
      <div className="vader-main">
        <div className="vader-meta">
          <span>{exercise.chapter}</span>
          <span>{exercise.sourceType === 'turnierfall' ? 'Echter Turnierfall' : exercise.sourceType === 'sideboard' ? 'Sideboard' : 'Masterclass-Prinzip'}</span>
        </div>

        <p className="vader-context">{exercise.context}</p>

        <div className="vader-cards">
          {exercise.cards.map(card => <CardFigure card={card} onOpen={setFocusCard} key={card.id} />)}
        </div>

        <div className="decision-options" aria-label="Antwortmöglichkeiten">
          {exercise.options.map(option => {
            const isChosen = choice === option.id;
            return <button key={option.id} className={`decision ${isChosen ? `chosen ${option.grade}` : ''}`} onClick={() => choose(option.id)} disabled={Boolean(choice)}>
              <span>{option.label}</span>
              {isChosen ? <b>{labelFor[option.grade]}</b> : null}
            </button>;
          })}
        </div>
      </div>

      <aside>
        <section className="panel vader-feedback">
          <p className="eyebrow">COACHING</p>
          <h2>{selected ? labelFor[selected.grade] : 'Triff deine Entscheidung'}</h2>
          <p>{selected ? selected.feedback : 'Wähle die Line, die Björns Denkweise am besten trifft. Nicht jede Situation ist simples Richtig/Falsch.'}</p>
          {selected ? <div className="principle"><strong>Merksatz</strong><p>{exercise.principle}</p></div> : null}
          <button className="primary" onClick={next} disabled={!selected}>Nächste Situation</button>
        </section>

        <section className="panel">
          <h2>Deine Session</h2>
          <div className="vader-stats">
            <span><strong>{Object.keys(results).length}</strong> beantwortet</span>
            <span><strong>{Object.values(results).filter(result => result.grade === 'optimal').length}</strong> optimal</span>
            <span><strong>{readiness}%</strong> Readiness</span>
          </div>
          <button className="text-button" onClick={reset}>Fortschritt zurücksetzen</button>
        </section>
      </aside>
    </section>

    {focusCard ? <div className="card-lightbox" role="dialog" aria-modal="true" aria-label={focusCard.nameDe ?? focusCard.nameEn} onClick={() => setFocusCard(null)}>
      <button className="lightbox-close" onClick={() => setFocusCard(null)}>Schließen</button>
      <img src={focusCard.imageUrl} alt={focusCard.nameDe ?? focusCard.nameEn} onClick={event => event.stopPropagation()} />
    </div> : null}
  </main>;
}
