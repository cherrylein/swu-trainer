import { describe, expect, it } from 'vitest';
import { attack, legalTargets, status, type State } from './index';
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
