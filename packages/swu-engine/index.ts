export type Arena = 'ground' | 'space';
export type Unit = {
  id: string; name: string; side: 'player' | 'opponent'; arena: Arena;
  power: number; hp: number; damage: number; ready: boolean; sentinel?: boolean;
  imageUrl?: string; imageAlt?: string;
};
export type HandUnit = Omit<Unit, 'side' | 'damage' | 'ready'> & { cost: number };
export type Resource = { cardId: string; exhausted: boolean };
export type State = {
  units: Unit[]; baseHp: number; log: string[];
  baseMaxHp?: number; baseName?: string; baseImageUrl?: string; baseImageAlt?: string;
  baseDamageTokens?: number[];
  hand?: HandUnit[];
  resources?: Resource[];
};
export type Attack = { attackerId: string; targetId: string };
export type Status = 'playing' | 'won' | 'lost';

export function status(state: State): Status {
  if (state.baseHp <= 0) return 'won';
  return state.units.some(u => u.side === 'player' && u.ready) ? 'playing' : 'lost';
}

export function legalTargets(state: State, attackerId: string): string[] {
  const attacker = state.units.find(u => u.id === attackerId);
  if (status(state) !== 'playing' || !attacker || attacker.side !== 'player' || !attacker.ready) return [];
  const enemies = state.units.filter(u => u.side === 'opponent' && u.arena === attacker.arena);
  const sentinels = enemies.filter(u => u.sentinel);
  return sentinels.length ? sentinels.map(u => u.id) : ['base', ...enemies.map(u => u.id)];
}

// Deliberately a small attack-only rules subset. The puzzle opponent always passes.
export function attack(state: State, action: Attack): State {
  if (!legalTargets(state, action.attackerId).includes(action.targetId)) throw new Error('Dieses Angriffsziel ist nicht erlaubt.');
  const next = structuredClone(state);
  const attacker = next.units.find(u => u.id === action.attackerId)!;
  attacker.ready = false;
  if (action.targetId === 'base') {
    next.baseHp = Math.max(0, next.baseHp - attacker.power);
    if (next.baseDamageTokens) next.baseDamageTokens.push(attacker.power);
    next.log.push(`${attacker.name} fügt der Basis ${attacker.power} Schaden zu.`);
  } else {
    const target = next.units.find(u => u.id === action.targetId)!;
    target.damage += attacker.power;
    attacker.damage += target.power;
    next.log.push(`${attacker.name} greift ${target.name} an: ${attacker.power} Schaden, ${target.power} Gegenschaden.`);
    next.units = next.units.filter(u => u.damage < u.hp);
  }
  if (status(next) === 'playing') next.log.push('Der Gegner passt. Du bist wieder am Zug.');
  return next;
}

// Opening setup: choose two of the six hand cards as ready resources.
export function chooseStartingResources(state: State, cardIds: string[]): State {
  if (!state.hand || cardIds.length !== 2 || new Set(cardIds).size !== 2 || !cardIds.every(id => state.hand!.some(card => card.id === id))) throw new Error('Wähle genau zwei verschiedene Handkarten als Ressourcen.');
  const next = structuredClone(state);
  next.hand = next.hand!.filter(card => !cardIds.includes(card.id));
  next.resources = [...(next.resources ?? []), ...cardIds.map(cardId => ({ cardId, exhausted: false }))];
  next.log.push(`${cardIds.length} Karten werden als Ressourcen bereitgelegt.`);
  return next;
}

export function playUnit(state: State, cardId: string): State {
  const card = state.hand?.find(candidate => candidate.id === cardId);
  const readyResources = state.resources?.filter(resource => !resource.exhausted) ?? [];
  if (!card) throw new Error('Diese Karte ist nicht auf deiner Hand.');
  if (readyResources.length < card.cost) throw new Error('Nicht genügend bereite Ressourcen.');
  const next = structuredClone(state);
  const payment = next.resources!.filter(resource => !resource.exhausted).slice(0, card.cost);
  payment.forEach(resource => { resource.exhausted = true; });
  next.hand = next.hand!.filter(candidate => candidate.id !== cardId);
  next.units.push({ ...card, side: 'player', damage: 0, ready: true });
  next.log.push(`${card.name} wird für ${card.cost} Ressourcen gespielt.`);
  return next;
}

export function readyCards(state: State): State {
  const next = structuredClone(state);
  next.resources?.forEach(resource => { resource.exhausted = false; });
  next.units.filter(unit => unit.side === 'player').forEach(unit => { unit.ready = true; });
  next.log.push('Regroup: Deine Ressourcen und Einheiten werden bereitgemacht.');
  return next;
}
