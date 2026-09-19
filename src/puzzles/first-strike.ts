import type { State } from '../../packages/swu-engine';

export const puzzle = {
  title: 'Den Weg freikämpfen',
  goal: 'Zerstöre die gegnerische Basis mit deinen zwei bereiten Einheiten.',
  hint: 'Der Loth-Wolf hat 3 Lebenspunkte. Welche Einheit brauchst du danach für die 5 Lebenspunkte der Basis?',
  initial: {
    baseHp: 5, log: [],
    units: [
      { id: 'vernestra', name: 'Vernestra Rwoh', side: 'player', arena: 'ground', power: 3, hp: 4, damage: 0, ready: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF195-de.jpg', imageAlt: 'Vernestra Rwoh, deutsche SWU-Karte' },
      { id: 'gundark', name: 'Gefräßiger Gundark', side: 'player', arena: 'ground', power: 5, hp: 4, damage: 0, ready: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF259-de.jpg', imageAlt: 'Gefräßiger Gundark, deutsche SWU-Karte' },
      { id: 'loth-wolf', name: 'Loth-Wolf', side: 'opponent', arena: 'ground', power: 3, hp: 3, damage: 0, ready: false, sentinel: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF044-de.jpg', imageAlt: 'Loth-Wolf, deutsche SWU-Karte' },
    ],
  } satisfies State,
};
