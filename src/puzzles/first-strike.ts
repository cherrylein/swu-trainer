import type { State } from '../../packages/swu-engine';

export const puzzle = {
  title: 'Der Weg zur Basis',
  goal: 'Zerstöre die gegnerische Basis mit deinen zwei bereiten Einheiten.',
  hint: 'Die Wache hat 3 Lebenspunkte. Welche Einheit brauchst du danach für die 5 Lebenspunkte der Basis?',
  initial: {
    baseHp: 5, log: [],
    units: [
      { id: 'scout', name: 'Spähtrupp', side: 'player', arena: 'ground', power: 3, hp: 3, damage: 0, ready: true },
      { id: 'heavy', name: 'Stoßtrupp', side: 'player', arena: 'ground', power: 5, hp: 4, damage: 0, ready: true },
      { id: 'guard', name: 'Wache', side: 'opponent', arena: 'ground', power: 2, hp: 3, damage: 0, ready: false, sentinel: true },
    ],
  } satisfies State,
};
