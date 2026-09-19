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
  goal: 'Wähle eine Karte aus deiner Hand als Ressource.',
  context: 'Du hast bereits fünf Ressourcen und willst im nächsten Zug eine Einheit für sechs Ressourcen spielen. Deine Hand soll danach weiter Spieloptionen für kleinere Züge behalten.',
  hand: [
    { id: 'refugee', name: 'Flüchtling des Pfades', cost: 1, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF242-de.jpg' },
    { id: 'consular', name: 'Jedi-Botschafter', cost: 2, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF094-de.jpg' },
    { id: 'chirrut', name: 'Chirrut Îmwe · Blind, aber nicht taub', cost: 4, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF067-de.jpg' },
    { id: 'dagoyan', name: 'Dagoyanischer Meister', cost: 5, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF115-de.jpg' },
    { id: 'anakin', name: 'Anakin Skywalker · Champion von Mortis', cost: 6, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF070-de.jpg' },
  ] satisfies HandCard[],
  answer: ['dagoyan'],
  selectionCount: 1,
  success: 'Anakin ist der geplante Zug für sechs Ressourcen. Der Dagoyanische Meister ist hier die entbehrlichere Karte.',
  retry: 'Die Karte für deinen nächsten Sechs-Ressourcen-Zug möchtest du behalten.',
  hint: 'Welche Karte kostet genau fünf, obwohl du im nächsten Zug eine Karte mit sechs Kosten spielen willst?',
};

export const resourceVariants = [resourceDecision, resourceDecisionSix, resourceDecisionPresence, resourceDecisionCurve];
