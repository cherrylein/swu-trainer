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
  goal: 'Wähle genau zwei Karten aus deiner Starthand als Ressourcen.',
  context: 'Du baust deine ersten zwei Ressourcen auf. Die günstigen Karten sollen deinen Einstieg absichern, während die teuersten Karten später wiederkommen können.',
  hand: [
    { id: 'refugee', name: 'Flüchtling des Pfades', cost: 1, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF242-de.jpg' },
    { id: 'consular-a', name: 'Jedi-Botschafter', cost: 2, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF094-de.jpg' },
    { id: 'consular-b', name: 'Jedi-Botschafter', cost: 2, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF094-de.jpg' },
    { id: 'dagoyan', name: 'Dagoyanischer Meister', cost: 5, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF115-de.jpg' },
    { id: 'anakin', name: 'Anakin Skywalker · Champion von Mortis', cost: 6, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF070-de.jpg' },
  ] satisfies HandCard[],
  answer: ['dagoyan', 'anakin'],
  success: 'Du behältst die günstigen Einheiten für die ersten Züge und nutzt die beiden Karten ab fünf beziehungsweise sechs Kosten als Ressourcen.',
  retry: 'Für die ersten zwei Ressourcen möchtest du die günstigsten Spieloptionen nicht verlieren.',
  hint: 'Welche beiden Karten kannst du erst deutlich später ausspielen?',
};

export const resourceDecisionPresence = {
  title: 'Präsenz aufbauen',
  goal: 'Wähle zwei Karten aus deiner Hand als Ressourcen.',
  context: 'Du möchtest in den ersten Zügen Einheiten auf das Feld bringen. Chirrut soll dir ab vier Ressourcen als stabiler Wachposten zur Verfügung stehen.',
  hand: [
    { id: 'refugee', name: 'Flüchtling des Pfades', cost: 1, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF242-de.jpg' },
    { id: 'consular-a', name: 'Jedi-Botschafter', cost: 2, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF094-de.jpg' },
    { id: 'consular-b', name: 'Jedi-Botschafter', cost: 2, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF094-de.jpg' },
    { id: 'chirrut', name: 'Chirrut Îmwe · Blind, aber nicht taub', cost: 4, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF067-de.jpg' },
    { id: 'dagoyan', name: 'Dagoyanischer Meister', cost: 5, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF115-de.jpg' },
    { id: 'anakin', name: 'Anakin Skywalker · Champion von Mortis', cost: 6, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF070-de.jpg' },
  ] satisfies HandCard[],
  answer: ['dagoyan', 'anakin'],
  success: 'Du behältst Karten für die ersten vier Ressourcen und legst die beiden spätesten Einheiten als Ressourcen ab.',
  retry: 'Chirrut gibt dir bereits ab vier Ressourcen Schutz. Die beiden teuersten Karten brauchst du in dieser Eröffnung später.',
  hint: 'Welche Karten helfen erst ab fünf beziehungsweise sechs Ressourcen?',
};

export const resourceDecisionCurve = {
  title: 'Die Kurve schließen',
  goal: 'Wähle genau zwei Karten aus deiner Starthand als Ressourcen.',
  context: 'Deine Hand enthält Spielzüge für eins, zwei und vier Ressourcen. Plane den Einstieg so, dass diese Karten erhalten bleiben.',
  hand: [
    { id: 'refugee', name: 'Flüchtling des Pfades', cost: 1, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF242-de.jpg' },
    { id: 'consular', name: 'Jedi-Botschafter', cost: 2, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF094-de.jpg' },
    { id: 'chirrut', name: 'Chirrut Îmwe · Blind, aber nicht taub', cost: 4, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF067-de.jpg' },
    { id: 'dagoyan', name: 'Dagoyanischer Meister', cost: 5, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF115-de.jpg' },
    { id: 'anakin', name: 'Anakin Skywalker · Champion von Mortis', cost: 6, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF070-de.jpg' },
  ] satisfies HandCard[],
  answer: ['dagoyan', 'anakin'],
  success: 'Die Hand behält ihre frühen und mittleren Spielzüge. Dagoyanischer Meister und Anakin kommen erst später ins Spiel.',
  retry: 'Die günstigeren Karten geben dir in den ersten beiden Runden die meisten Optionen.',
  hint: 'Welche beiden Karten haben die höchsten Kosten in dieser Hand?',
};

export const resourceVariants = [resourceDecision, resourceDecisionSix, resourceDecisionPresence, resourceDecisionCurve];
