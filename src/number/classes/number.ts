import { $gcd } from '../helpers/gcd.helper';

export class Number {
    public numerator: number;
    public denomenator: number;

    constructor(numerator: number, denominator: number) {
        const gcd: number = $gcd(numerator, denominator);
        this.numerator = numerator / gcd;
        this.denomenator = denominator / gcd;
    }

    public static FromString(str: string, radix: number = 10): Number {
        const parts: [string, string] = str.split('.') as [string, string];

        if (!parts[0]) {
            throw new Error(`${str} is not a number`);
        }

        const numerator: number = parseInt(parts[0] + (parts[1] || ''), radix);
        const denominator: number = Math.pow(radix, (parts[1] || '').length);

        return new this(numerator, denominator);
    }
}
