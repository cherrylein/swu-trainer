import { describe, expect, it } from 'vitest';
import { attack, legalTargets, status, type State } from './index';
import { puzzle } from '../../src/puzzles/first-strike';

describe('attack puzzle', () => {
  it('requires removing the sentinel before attacking the base', () => {
    expect(legalTargets(puzzle.initial, 'scout')).toEqual(['guard']);
    expect(() => attack(puzzle.initial, { attackerId: 'scout', targetId: 'base' })).toThrow();
  });
  it('wins with the correct order, resolving damage simultaneously without mutating the input', () => {
    const initial = structuredClone(puzzle.initial);
    const next = attack(initial, { attackerId: 'scout', targetId: 'guard' });
    expect(next.units.find(u => u.id === 'guard')).toBeUndefined();
    expect(next.units.find(u => u.id === 'scout')).toMatchObject({ damage: 2, ready: false });
    expect(initial).toEqual(puzzle.initial);
    const won = attack(next, { attackerId: 'heavy', targetId: 'base' });
    expect(status(won)).toBe('won');
    expect(won.baseHp).toBe(0);
    expect(legalTargets(won, 'heavy')).toEqual([]);
  });
  it('loses when the heavy attacker is spent on the guard', () => {
    const next = attack(puzzle.initial, { attackerId: 'heavy', targetId: 'guard' });
    const lost = attack(next, { attackerId: 'scout', targetId: 'base' });
    expect(status(lost)).toBe('lost');
    expect(lost.baseHp).toBe(2);
  });
  it('rejects exhausted, opposing, missing and cross-arena attackers or targets', () => {
    const next = attack(puzzle.initial, { attackerId: 'scout', targetId: 'guard' });
    for (const attackerId of ['scout', 'guard', 'missing']) expect(legalTargets(next, attackerId)).toEqual([]);
    const split: State = structuredClone(puzzle.initial);
    split.units[0].arena = 'space';
    expect(legalTargets(split, 'scout')).toEqual(['base']);
    expect(() => attack(split, { attackerId: 'scout', targetId: 'guard' })).toThrow();
  });
  it('removes both units after lethal simultaneous combat damage', () => {
    const initial = structuredClone(puzzle.initial);
    initial.units[0].hp = 2;
    const next = attack(initial, { attackerId: 'scout', targetId: 'guard' });
    expect(next.units.map(u => u.id)).toEqual(['heavy']);
  });
});
