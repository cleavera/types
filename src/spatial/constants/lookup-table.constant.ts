import { $Number } from '../../number/classes/number';

const zero: $Number = new $Number(0, 1);
const one: $Number = $Number.identity();

export const SIN: { [key: string]: $Number } = {
    0: zero,
    0.5: zero,
    '-0.5': zero,
    0.25: one,
    '-0.25': one.negate()
};

export const COS: { [key: string]: $Number } = {
    0: one,
    1: one,
    0.5: one.negate(),
    0.25: zero,
    0.75: zero
};
