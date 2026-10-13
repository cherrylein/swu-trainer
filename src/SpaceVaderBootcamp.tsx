import { useMemo, useState } from 'react';
import {
  spaceVaderExercises,
  spaceVaderFamilies,
  type DecisionGrade,
  type ExerciseStage,
  type TrainerCard,
} from './puzzles/space-vader-bootcamp';

const scoreFor: Record<DecisionGrade, number> = { optimal: 3, solid: 2, risky: 1, error: 0 };
const labelFor: Record<DecisionGrade, string> = { optimal: 'Optimal', solid: 'Solide', risky: 'Riskant', error: 'Fehler' };
const stageLabel: Record<ExerciseStage, string> = {
  source: 'Lehrbeispiel',
  transfer: 'Transfer',
  counterexample: 'Gegenbeispiel',
};

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
  const familyExercises = spaceVaderExercises.filter(item => item.familyId === exercise.familyId);
  const familyPosition = familyExercises.findIndex(item => item.id === exercise.id) + 1;
  const currentFamilyIndex = spaceVaderFamilies.findIndex(item => item.id === exercise.familyId) + 1;

  const activeResults = useMemo(
    () => spaceVaderExercises.flatMap(item => results[item.id] ? [results[item.id]] : []),
    [results],
  );

  const readiness = useMemo(() => {
    if (!activeResults.length) return 0;
    return Math.round((activeResults.reduce((sum, result) => sum + scoreFor[result.grade], 0) / (activeResults.length * 3)) * 100);
  }, [activeResults]);

  const familyScores = useMemo(() => {
    return spaceVaderFamilies.map(item => {
      const exercises = spaceVaderExercises.filter(exerciseItem => exerciseItem.familyId === item.id);
      const answered = exercises.flatMap(exerciseItem => results[exerciseItem.id] ? [results[exerciseItem.id]] : []);
      const score = answered.length
        ? Math.round((answered.reduce((sum, result) => sum + scoreFor[result.grade], 0) / (answered.length * 3)) * 100)
        : 0;
      return { ...item, answered: answered.length, total: exercises.length, score };
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

  function jumpToFamily(familyId: string) {
    const target = spaceVaderExercises.findIndex(item => item.familyId === familyId);
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
      <span className="badge vader-badge">SPACE VADER · MOTIVTRAINING</span>
    </header>

    <section className="vader-hero">
      <div>
        <p className="eyebrow">MOTIV {currentFamilyIndex} / {spaceVaderFamilies.length} · {stageLabel[exercise.stage]} {familyPosition} / {familyExercises.length}</p>
        <h1>{exercise.title}</h1>
        <p>{exercise.prompt}</p>
      </div>
      <div className="readiness" aria-label={`Space Vader Readiness ${readiness} Prozent`}>
        <strong>{readiness}%</strong>
        <span>Readiness</span>
      </div>
    </section>

    <section className="family-intro">
      <div>
        <p className="eyebrow">TRAININGSMOTIV</p>
        <h2>{exercise.familyTitle}</h2>
      </div>
      <p>{exercise.familyGoal}</p>
    </section>

    <div className="vader-chapter-strip" aria-label="Trainingsmotive">
      {familyScores.map(item => <button key={item.id} className={item.id === exercise.familyId ? 'active' : ''} onClick={() => jumpToFamily(item.id)}>
        <strong>{item.title}</strong>
        <small>{item.answered}/{item.total} · {item.score}%</small>
      </button>)}
    </div>

    <section className="vader-grid">
      <div className="vader-main">
        <div className="vader-meta">
          <span>{exercise.chapter}</span>
          <span className={`stage-${exercise.stage}`}>{stageLabel[exercise.stage]}</span>
          <span>{exercise.sourceType === 'turnierfall' ? 'Aus Björns Match' : exercise.sourceType === 'gegenbeispiel' ? 'Bewusste Ausnahme' : 'Neu abgeleitete Situation'}</span>
        </div>

        <p className="vader-context">{exercise.context}</p>

        {exercise.cards.length ? <div className="vader-cards">
          {exercise.cards.map(card => <CardFigure card={card} onOpen={setFocusCard} key={card.id} />)}
        </div> : null}

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
          <h2>{selected ? labelFor[selected.grade] : 'Erkenne das Motiv'}</h2>
          <p>{selected
            ? selected.feedback
            : exercise.stage === 'source'
              ? 'Das ist das Lehrbeispiel. Entscheidend ist nicht, die alte Partie zu merken, sondern den Grund hinter der Entscheidung.'
              : exercise.stage === 'transfer'
                ? 'Die Situation wurde verändert. Nutze das Prinzip – nicht die konkrete Lösung aus dem Lehrbeispiel.'
                : 'Achtung: Diese Aufgabe prüft, wann die gelernte Heuristik gerade NICHT gilt.'}</p>

          {selected ? <>
            <div className="principle">
              <strong>Das eigentliche Prinzip</strong>
              <p>{exercise.principle}</p>
            </div>
            <div className="transfer-note">
              <strong>Was sich übertragen soll</strong>
              <p>{exercise.transferNote}</p>
            </div>
          </> : null}

          <button className="primary" onClick={next} disabled={!selected}>
            {familyPosition < familyExercises.length ? 'Nächste Variante' : 'Nächstes Motiv'}
          </button>
        </section>

        <section className="panel">
          <h2>Dein Lernstand</h2>
          <div className="vader-stats">
            <span><strong>{activeResults.length}</strong> / {spaceVaderExercises.length} beantwortet</span>
            <span><strong>{activeResults.filter(result => result.grade === 'optimal').length}</strong> optimal</span>
            <span><strong>{readiness}%</strong> Readiness</span>
          </div>
          <div className="stage-key">
            <span><b>1</b> Lehrbeispiel verstehen</span>
            <span><b>2</b> Motiv übertragen</span>
            <span><b>3</b> Ausnahme erkennen</span>
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
