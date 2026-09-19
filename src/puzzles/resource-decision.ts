export type HandCard = { id: string; name: string; cost: number; imageUrl: string };

export const resourceDecision = {
  title: 'Die richtige Reserve',
  goal: 'Wähle genau zwei Karten aus deiner Starthand als Ressourcen.',
  context: 'Du bist am Anfang der Partie. Deine günstigen Einheiten sollen deinen ersten Zug absichern; teure Karten möchtest du später nachziehen.',
  hand: [
    { id: 'refugee-a', name: 'Flüchtling des Pfades', cost: 1, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF242-de.jpg' },
    { id: 'refugee-b', name: 'Flüchtling des Pfades', cost: 1, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF242-de.jpg' },
    { id: 'consular-a', name: 'Jedi-Botschafter', cost: 2, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF094-de.jpg' },
    { id: 'consular-b', name: 'Jedi-Botschafter', cost: 2, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF094-de.jpg' },
    { id: 'dagoyan', name: 'Dagoyanischer Meister', cost: 5, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF115-de.jpg' },
    { id: 'anakin', name: 'Anakin Skywalker · Champion von Mortis', cost: 6, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF070-de.jpg' },
  ] satisfies HandCard[],
  answer: ['dagoyan', 'anakin'],
};
