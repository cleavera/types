import { $Number } from './number';

export class $Percentage extends $Number {
    public static fromNumber(value: $Number): $Percentage {
        return new this(value.numerator, value.denomenator);
    }

    public add(other: $Percentage): $Percentage {
        return $Percentage.fromNumber(super.add(other));
    }

    public subtract(other: $Percentage): $Percentage {
        return $Percentage.fromNumber(super.add(other));
    }

    public increment(): $Number {
        return this.add($Number.ten().power($Number.two()).invert());
    }

    public decrement(): $Number {
        return this.subtract($Number.ten().power($Number.two()).invert());
    }

    public toString(): string {
        return `${this.multiply($Number.ten().power($Number.two())).toString()}%`;
    }
}
