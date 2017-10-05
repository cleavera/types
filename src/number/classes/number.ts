import { IComparable, ISerialisable } from '../../shared';
import { $gcd } from '../helpers/gcd.helper';

export class $Number implements IComparable, ISerialisable<string> {
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

    public static two(): $Number {
        const one: $Number = $Number.identity();

        return one.add(one);
    }

    public static half(): $Number {
        return $Number.two().invert();
    }

    public static identity(): $Number {
        return this.fromString('1');
    }

    public static nothing(): $Number {
        return this.fromString('0');
    }

    public static series(operator: (value: $Number) => $Number, start: $Number = $Number.nothing(), limit: $Number = $Number.fromString('100')): $Number {
        start = start.integer();
        limit = limit.integer();

        if (start > limit) {
            [start, limit] = [limit, start];
        }

        let sum: $Number = $Number.nothing();

        while (start < limit) {
            sum = sum.add(operator(start));
            start = start.increment();
        }

        return sum;
    }

    public static E(precision: number = 100): $Number {
        return this.series((num: $Number) => {
            return this.identity().divide(num.factorial());
        }, void 0, new this(precision, 1));
    }

    public static PI(precision: number = 5): $Number {
        const constants: Array<$Number> = [
            $Number.fromString('2').multiply($Number.fromString('2').nthRoot($Number.fromString('2'))).divide($Number.fromString('9801')),
            $Number.fromString('1103'),
            $Number.fromString('26390'),
            $Number.fromString('396'),
            $Number.fromString('4')
        ];

        return this.series((num: $Number) => {
            return num.multiply(constants[4]).factorial().multiply(constants[1].add(constants[2].multiply(num))).divide(num.factorial().power(constants[4]).multiply(constants[3].power(constants[4].multiply(num))));
        }, void 0, new this(precision, 1)).multiply(constants[0]).invert();
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

    public power(power: $Number): $Number {
        return new $Number(this.numerator ** power.valueOf(), this.denomenator ** power.valueOf());
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
        const one: $Number =  $Number.identity();

        if (num.isEqual($Number.nothing())) {
            return one;
        }

        let result: $Number = this.integer();

        while (num > one) {
            num = num.decrement();

            result = result.multiply(num);
        }

        return result;
    }

    public invert(): $Number {
        return new $Number(this.denomenator, this.numerator);
    }

    public log(): $Number {
        return new $Number(Math.log(this.numerator) - Math.log(this.denomenator), 1);
    }

    public nthRoot(n: $Number): $Number {
        return this.power(n.invert());
    }

    public integer(): $Number {
        return $Number.parseInt(this.toString());
    }

    public isEqual(other: $Number): boolean {
        return this.toString() === other.toString();
    }

    public toString(radix: number = 10): string {
        return (this.numerator / this.denomenator).toString(radix);
    }

    public valueOf(): number {
        return Number(this.toString());
    }

    public serialise(): string {
        return this.toString();
    }
}
