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

export const woundedGundark = {
  title: 'Unter Druck entscheiden',
  goal: 'Zerstöre die Basis. Der Gefräßige Gundark hält keinen Gegenschaden mehr aus.',
  hint: 'Der Gundark hat bereits 2 Schaden. Nach einem Kampf gegen den Loth-Wolf würde er insgesamt 5 Schaden haben.',
  success: 'Vernestra beseitigt den Wachposten. So bleibt der bereits verwundete Gundark für die 5 Schaden auf die Basis bereit.',
  guidance: 'Schau nicht nur auf die Angriffsstärke: Bereits erlittenen Schaden musst du in die Angriffsreihenfolge einplanen.',
  initial: {
    baseHp: 5, baseMaxHp: 30, baseName: 'Kommandostelle · Todesstern',
    baseImageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/SOR/_de/SOR023-de.jpg',
    baseImageAlt: 'Kommandostelle · Todesstern, deutsche SWU-Basis',
    baseDamageTokens: [10, 10, 5], log: [],
    units: [
      { id: 'vernestra', name: 'Vernestra Rwoh', side: 'player', arena: 'ground', power: 3, hp: 4, damage: 0, ready: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF195-de.jpg', imageAlt: 'Vernestra Rwoh, deutsche SWU-Karte' },
      { id: 'gundark', name: 'Gefräßiger Gundark', side: 'player', arena: 'ground', power: 5, hp: 4, damage: 2, ready: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF259-de.jpg', imageAlt: 'Gefräßiger Gundark, deutsche SWU-Karte' },
      { id: 'loth-wolf', name: 'Loth-Wolf', side: 'opponent', arena: 'ground', power: 3, hp: 3, damage: 0, ready: false, sentinel: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF044-de.jpg', imageAlt: 'Loth-Wolf, deutsche SWU-Karte' },
    ],
  } satisfies State,
};

export const woundedVernestra = {
  title: 'Den letzten Schild lesen',
  goal: 'Zerstöre die Basis. Vernestra Rwoh ist bereits verwundet.',
  hint: 'Vernestra überlebt den Kampf gegen den Loth-Wolf nicht. Die Basis braucht anschließend genau 3 Schaden.',
  success: 'Der Gundark entfernt den Wachposten. Die verwundete Vernestra setzt danach genau den nötigen Schaden auf die Basis.',
  guidance: 'Eine verwundete Einheit kann immer noch angreifen. Entscheidend ist, ob sie für diesen Kampf überleben muss.',
  initial: {
    baseHp: 3, baseMaxHp: 30, baseName: 'Kommandostelle · Todesstern',
    baseImageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/SOR/_de/SOR023-de.jpg',
    baseImageAlt: 'Kommandostelle · Todesstern, deutsche SWU-Basis',
    baseDamageTokens: [10, 10, 5, 2], log: [],
    units: [
      { id: 'vernestra', name: 'Vernestra Rwoh', side: 'player', arena: 'ground', power: 3, hp: 4, damage: 2, ready: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF195-de.jpg', imageAlt: 'Vernestra Rwoh, deutsche SWU-Karte' },
      { id: 'gundark', name: 'Gefräßiger Gundark', side: 'player', arena: 'ground', power: 5, hp: 4, damage: 0, ready: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF259-de.jpg', imageAlt: 'Gefräßiger Gundark, deutsche SWU-Karte' },
      { id: 'loth-wolf', name: 'Loth-Wolf', side: 'opponent', arena: 'ground', power: 3, hp: 3, damage: 0, ready: false, sentinel: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF044-de.jpg', imageAlt: 'Loth-Wolf, deutsche SWU-Karte' },
    ],
  } satisfies State,
};

function situation(title: string, goal: string, hint: string, success: string, guidance: string, baseHp: number, baseDamageTokens: number[], units: State['units']) {
  return {
    title, goal, hint, success, guidance,
    initial: {
      baseHp, baseMaxHp: 30, baseName: 'Kommandostelle · Todesstern',
      baseImageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/SOR/_de/SOR023-de.jpg',
      baseImageAlt: 'Kommandostelle · Todesstern, deutsche SWU-Basis',
      baseDamageTokens, log: [], units,
    } satisfies State,
  };
}

const vernestra = (damage = 0) => ({ id: 'vernestra', name: 'Vernestra Rwoh', side: 'player' as const, arena: 'ground' as const, power: 3, hp: 4, damage, ready: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF195-de.jpg', imageAlt: 'Vernestra Rwoh, deutsche SWU-Karte' });
const gundark = (damage = 0) => ({ id: 'gundark', name: 'Gefräßiger Gundark', side: 'player' as const, arena: 'ground' as const, power: 5, hp: 4, damage, ready: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF259-de.jpg', imageAlt: 'Gefräßiger Gundark, deutsche SWU-Karte' });
const chirrut = (damage = 0) => ({ id: 'chirrut', name: 'Chirrut Îmwe · Blind, aber nicht taub', side: 'player' as const, arena: 'ground' as const, power: 3, hp: 5, damage, ready: true, sentinel: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF067-de.jpg', imageAlt: 'Chirrut Îmwe, deutsche SWU-Karte' });
const lothWolf = () => ({ id: 'loth-wolf', name: 'Loth-Wolf', side: 'opponent' as const, arena: 'ground' as const, power: 3, hp: 3, damage: 0, ready: false, sentinel: true, imageUrl: 'https://d1n2ba7uw8bkm1.cloudfront.net/swu/LOF/_de/LOF044-de.jpg', imageAlt: 'Loth-Wolf, deutsche SWU-Karte' });

const chirrutMakesRoom = situation('Der standhafte Wegbereiter', 'Zerstöre die Basis mit 5 verbleibenden Lebenspunkten.', 'Chirrut kann den Loth-Wolf besiegen und überlebt dabei. Welche Einheit behältst du für die Basis?', 'Chirrut hält den Loth-Wolf auf. Der Gundark setzt die 5 Schaden auf die ungeschützte Basis.', 'Nutze eine robuste Einheit für den Wachposten und spare die passende Schlagkraft für die Basis.', 5, [10, 10, 5], [chirrut(), gundark(), lothWolf()]);
const hurtChirrut = situation('Der verletzte Beschützer', 'Zerstöre die gegnerische Basis mit genau zwei Angriffen.', 'Chirrut hat schon 3 Schaden und würde den Kampf gegen den Loth-Wolf nicht überleben.', 'Vernestra räumt den Weg frei. Chirrut kann trotz seiner Verwundung noch die 3 Schaden für die Basis liefern.', 'Verwundete Einheiten dürfen angreifen. Sie müssen nicht jeden Kampf überleben, wenn ihr Angriff den Zug beendet.', 3, [10, 10, 5, 2], [vernestra(), chirrut(3), lothWolf()]);
const threeUnitPush = situation('Drei Einheiten, ein Fenster', 'Zerstöre eine Basis mit 8 verbleibenden Lebenspunkten.', 'Nach dem Wachposten brauchst du zusammen genau 8 Angriffsstärke für die Basis.', 'Eine 3er-Einheit beseitigt den Wachposten; die andere zusammen mit dem Gundark erreicht exakt 8 Schaden.', 'Bei mehreren Einheiten zählt die Summe der Angriffe nach dem Kampf gegen den Wachposten.', 8, [10, 10, 2], [vernestra(), chirrut(), gundark(), lothWolf()]);
const finalThree = situation('Drei Schaden reichen', 'Finde den Angriff, der die Basis sofort zerstört.', 'Die Basis hat nur noch 3 Lebenspunkte und wird nicht von einem Wachposten geschützt.', 'Vernestra trifft die Basis exakt für den fehlenden Schaden.', 'Wenn kein Wachposten schützt, darfst du direkt die Basis angreifen. Suche zuerst nach tödlichem Schaden.', 3, [10, 10, 5, 2], [vernestra(), gundark()]);
const lastUnitStanding = situation('Der letzte Angriff', 'Zerstöre die Basis, obwohl Vernestra bereits 1 Schaden hat.', 'Vernestra würde im Kampf gegen den Loth-Wolf besiegt. Chirrut hält dagegen länger durch.', 'Chirrut entfernt den Wachposten. Der Gundark bleibt für die letzten 5 Schaden bereit.', 'Die Restlebenspunkte deiner Einheiten entscheiden, welche von ihnen den Kampf übernehmen kann.', 5, [10, 10, 5], [vernestra(1), chirrut(), gundark(), lothWolf()]);

export const attackVariants = [puzzle, saveTheStrike, woundedGundark, woundedVernestra, chirrutMakesRoom, hurtChirrut, threeUnitPush, finalThree, lastUnitStanding];
