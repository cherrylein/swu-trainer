import type { State } from '../../packages/swu-engine';

export const puzzle = {
  title: 'Den Weg freikämpfen',
  goal: 'Zerstöre die gegnerische Basis mit deinen zwei bereiten Einheiten.',
  hint: 'Der Loth-Wolf hat 3 Lebenspunkte. Welche Einheit brauchst du danach für die 5 Lebenspunkte der Basis?',
  success: 'Du hast den Loth-Wolf mit Vernestra Rwoh entfernt und die Schlagkraft des Gefräßigen Gundarks für die Basis aufgehoben.',
  guidance: 'Der Loth-Wolf schützt die Basis mit Wachposten. Im Kampf verursachen beide Einheiten gleichzeitig Schaden.',
  initial: {
    baseHp: 5, baseMaxHp: 30, baseName: 'Kommandostelle · Todesstern',
    baseImageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/SOR/_de/SOR023-de.jpg',
    baseImageAlt: 'Kommandostelle · Todesstern, deutsche SWU-Basis',
    baseDamageTokens: [10, 10, 5], log: [],
    units: [
      { id: 'vernestra', name: 'Vernestra Rwoh', side: 'player', arena: 'ground', power: 3, hp: 4, damage: 0, ready: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF195-de.jpg', imageAlt: 'Vernestra Rwoh, deutsche SWU-Karte' },
      { id: 'gundark', name: 'Gefräßiger Gundark', side: 'player', arena: 'ground', power: 5, hp: 4, damage: 0, ready: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF259-de.jpg', imageAlt: 'Gefräßiger Gundark, deutsche SWU-Karte' },
      { id: 'loth-wolf', name: 'Loth-Wolf', side: 'opponent', arena: 'ground', power: 3, hp: 3, damage: 0, ready: false, sentinel: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF044-de.jpg', imageAlt: 'Loth-Wolf, deutsche SWU-Karte' },
    ],
} satisfies State,
};

export const saveTheStrike = {
  title: 'Kraft für den Endstoß',
  goal: 'Zerstöre die gegnerische Basis. Entscheide, welche Einheit den Wachposten angreifen soll.',
  hint: 'Die Basis hat nur noch 3 Lebenspunkte. Welche deiner Einheiten sollte nach dem Loth-Wolf noch bereit sein?',
  success: 'Der Gefräßige Gundark räumt den Wachposten weg. Vernestra Rwoh behältst du für den präzisen Endstoß auf die Basis.',
  guidance: 'Ein Wachposten muss zuerst besiegt werden. Plane daher schon vor dem Angriff, welche Einheit danach noch die Basis erreichen soll.',
  initial: {
    baseHp: 3, baseMaxHp: 30, baseName: 'Kommandostelle · Todesstern',
    baseImageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/SOR/_de/SOR023-de.jpg',
    baseImageAlt: 'Kommandostelle · Todesstern, deutsche SWU-Basis',
    baseDamageTokens: [10, 10, 5, 2], log: [],
    units: [
      { id: 'vernestra', name: 'Vernestra Rwoh', side: 'player', arena: 'ground', power: 3, hp: 4, damage: 0, ready: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF195-de.jpg', imageAlt: 'Vernestra Rwoh, deutsche SWU-Karte' },
      { id: 'gundark', name: 'Gefräßiger Gundark', side: 'player', arena: 'ground', power: 5, hp: 4, damage: 0, ready: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF259-de.jpg', imageAlt: 'Gefräßiger Gundark, deutsche SWU-Karte' },
      { id: 'loth-wolf', name: 'Loth-Wolf', side: 'opponent', arena: 'ground', power: 3, hp: 3, damage: 0, ready: false, sentinel: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF044-de.jpg', imageAlt: 'Loth-Wolf, deutsche SWU-Karte' },
    ],
  } satisfies State,
};
