import { describe, expect, it } from 'vitest';
import { attack, chooseStartingResources, legalTargets, playUnit, readyCards, status, type State } from './index';
import { puzzle } from '../../src/puzzles/first-strike';

describe('attack puzzle', () => {
  it('requires removing the sentinel before attacking the base', () => {
    expect(legalTargets(puzzle.initial, 'vernestra')).toEqual(['loth-wolf']);
    expect(() => attack(puzzle.initial, { attackerId: 'vernestra', targetId: 'base' })).toThrow();
  });
  it('wins with the correct order, resolving damage simultaneously without mutating the input', () => {
    const initial = structuredClone(puzzle.initial);
    const next = attack(initial, { attackerId: 'vernestra', targetId: 'loth-wolf' });
    expect(next.units.find(u => u.id === 'loth-wolf')).toBeUndefined();
    expect(next.units.find(u => u.id === 'vernestra')).toMatchObject({ damage: 3, ready: false });
    expect(initial).toEqual(puzzle.initial);
    const won = attack(next, { attackerId: 'gundark', targetId: 'base' });
    expect(status(won)).toBe('won');
    expect(won.baseHp).toBe(0);
    expect(won.baseDamageTokens).toEqual([10, 10, 5, 5]);
    expect(legalTargets(won, 'gundark')).toEqual([]);
  });
  it('loses when the heavy attacker is spent on the guard', () => {
    const next = attack(puzzle.initial, { attackerId: 'gundark', targetId: 'loth-wolf' });
    const lost = attack(next, { attackerId: 'vernestra', targetId: 'base' });
    expect(status(lost)).toBe('lost');
    expect(lost.baseHp).toBe(2);
  });
  it('rejects exhausted, opposing, missing and cross-arena attackers or targets', () => {
    const next = attack(puzzle.initial, { attackerId: 'vernestra', targetId: 'loth-wolf' });
    for (const attackerId of ['vernestra', 'loth-wolf', 'missing']) expect(legalTargets(next, attackerId)).toEqual([]);
    const split: State = structuredClone(puzzle.initial);
    split.units[0].arena = 'space';
    expect(legalTargets(split, 'vernestra')).toEqual(['base']);
    expect(() => attack(split, { attackerId: 'vernestra', targetId: 'loth-wolf' })).toThrow();
  });
  it('removes both units after lethal simultaneous combat damage', () => {
    const initial = structuredClone(puzzle.initial);
    initial.units[0].hp = 3;
    const next = attack(initial, { attackerId: 'vernestra', targetId: 'loth-wolf' });
    expect(next.units.map(u => u.id)).toEqual(['gundark']);
  });
});

describe('opening and play basics', () => {
  const opening: State = {
    baseHp: 30, log: [], units: [],
    hand: [
      { id: 'refugee', name: 'Flüchtling des Pfades', cost: 1, arena: 'ground', power: 0, hp: 3 },
      { id: 'gungi', name: 'Gungi', cost: 2, arena: 'ground', power: 2, hp: 5 },
      { id: 'anakin', name: 'Anakin', cost: 6, arena: 'ground', power: 5, hp: 7 },
      { id: 'yaddle', name: 'Yaddle', cost: 2, arena: 'ground', power: 2, hp: 4 },
      { id: 'dagoyan', name: 'Dagoyanischer Meister', cost: 5, arena: 'ground', power: 5, hp: 5 },
      { id: 'paladin', name: 'Paladin-Trainingskorvette', cost: 5, arena: 'space', power: 3, hp: 5 },
    ],
  };
  it('moves exactly two opening cards to ready resources', () => {
    const next = chooseStartingResources(opening, ['anakin', 'dagoyan']);
    expect(next.hand).toHaveLength(4);
    expect(next.resources).toEqual([{ cardId: 'anakin', exhausted: false }, { cardId: 'dagoyan', exhausted: false }]);
    expect(opening.hand).toHaveLength(6);
  });
  it('pays ready resources and puts a unit into its arena', () => {
    const setup = chooseStartingResources(opening, ['anakin', 'dagoyan']);
    const played = playUnit(setup, 'gungi');
    expect(played.resources?.every(resource => resource.exhausted)).toBe(true);
    expect(played.units).toMatchObject([{ id: 'gungi', side: 'player', arena: 'ground', ready: true }]);
    expect(played.hand?.some(card => card.id === 'gungi')).toBe(false);
  });
  it('readies spent cards at regroup and rejects unaffordable cards', () => {
    const setup = chooseStartingResources(opening, ['anakin', 'dagoyan']);
    expect(() => playUnit(setup, 'dagoyan')).toThrow();
    const played = playUnit(setup, 'gungi');
    expect(readyCards(played).resources?.every(resource => !resource.exhausted)).toBe(true);
  });
});
