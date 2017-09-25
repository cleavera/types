import { $gcd } from '../helpers/gcd.helper';

export class $Number {
    public numerator: number;
    public denomenator: number;

    constructor(numerator: number, denominator: number) {
        const gcd: number = $gcd(numerator, denominator);
        this.numerator = numerator / gcd;
        this.denomenator = denominator / gcd;
    }

    public static fromString(str: string, radix: number = 10): $Number {
        const parts: [string, string] = str.split('.') as [string, string];

        if (!parts[0]) {
            throw new Error(`${str} is not a number`);
        }

        const numerator: number = parseInt(parts[0] + (parts[1] || ''), radix);
        const denominator: number = Math.pow(radix, (parts[1] || '').length);

        return new this(numerator, denominator);
    }

    public static parseInt(str: string, radix: number = 10): $Number {
        const parts: [string, string] = str.split('.') as [string, string];

        if (!parts[0]) {
            throw new Error(`${str} is not a number`);
        }

        const numerator: number = parseInt(parts[0], radix);
        const denominator: number = 1;

        return new this(numerator, denominator);
    }

    public static identity(): $Number {
        return this.fromString('1');
    }

    public add(other: $Number): $Number {
        return new $Number((this.numerator * other.denomenator) + (other.numerator * this.denomenator), this.denomenator * other.denomenator);
    }

    public multiply(other: $Number): $Number {
        return new $Number(this.numerator * other.numerator, this.denomenator * other.denomenator);
    }

    public subtract(other: $Number): $Number {
        return new $Number((this.numerator * other.denomenator) - (other.numerator * this.denomenator), this.denomenator * other.denomenator);
    }

    public divide(other: $Number): $Number {
        return new $Number(this.numerator * other.denomenator, this.denomenator * other.numerator);
    }

    public power(power: number): $Number {
        return new $Number(this.numerator ** power, this.denomenator ** power);
    }

    public modulus(mod: $Number): $Number {
        const divisor: $Number = this.divide(mod);

        return divisor.subtract(divisor.integer()).multiply(mod);
    }

    public negate(): $Number {
        return this.multiply($Number.fromString('-1'));
    }

    public increment(): $Number {
        return this.add($Number.identity());
    }

    public decrement(): $Number {
        return this.subtract($Number.identity());
    }

    public factorial(): $Number {
        let num: $Number = this.integer();
        let result: $Number = this.integer();
        const one: $Number =  $Number.identity();

        while (num > one) {
            num = num.decrement();

            result = result.multiply(num);
        }

        return result;
    }

    public integer(): $Number {
        return $Number.parseInt(this.toString());
    }

    public toString(radix: number = 10): string {
        return (this.numerator / this.denomenator).toString(radix);
    }

    public valueOf(): number {
        return Number(this.toString());
    }
}
