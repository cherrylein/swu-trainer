export type Arena = 'ground' | 'space';
export type Unit = {
  id: string; name: string; side: 'player' | 'opponent'; arena: Arena;
  power: number; hp: number; damage: number; ready: boolean; sentinel?: boolean;
  imageUrl?: string; imageAlt?: string;
};
export type State = {
  units: Unit[]; baseHp: number; log: string[];
  baseMaxHp?: number; baseName?: string; baseImageUrl?: string; baseImageAlt?: string;
  baseDamageTokens?: number[];
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
