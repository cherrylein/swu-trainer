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

export const resourceDecisionSix = {
  title: 'Der nächste Meilenstein',
  goal: 'Wähle genau eine Karte aus deiner Hand als Ressource.',
  context: 'Du hast vier Ressourcen. Für deinen nächsten Zug möchtest du eine Karte mit fünf Kosten spielen und danach weiter sauber in die Partie wachsen.',
  hand: [
    { id: 'refugee', name: 'Flüchtling des Pfades', cost: 1, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF242-de.jpg' },
    { id: 'consular-a', name: 'Jedi-Botschafter', cost: 2, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF094-de.jpg' },
    { id: 'consular-b', name: 'Jedi-Botschafter', cost: 2, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF094-de.jpg' },
    { id: 'dagoyan', name: 'Dagoyanischer Meister', cost: 5, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF115-de.jpg' },
    { id: 'anakin', name: 'Anakin Skywalker · Champion von Mortis', cost: 6, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF070-de.jpg' },
  ] satisfies HandCard[],
  answer: ['anakin'],
  selectionCount: 1,
  success: 'Mit der sechsten Ressource bereitest du künftige Züge vor und behältst den Dagoyanischen Meister für den nächsten Zug mit fünf Ressourcen.',
  retry: 'Der Dagoyanische Meister passt genau zu deinem nächsten Zug. Die günstigen Einheiten geben dir früh Optionen.',
  hint: 'Welche Karte kannst du mit fünf Ressourcen noch nicht spielen, während der Dagoyanische Meister dann genau passt?',
};

export const resourceVariants = [resourceDecision, resourceDecisionSix];
