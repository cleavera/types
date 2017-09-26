import { $Number } from '../../number';
import { IComparable, ISerialisable } from '../../shared';

import { DEGREES_IN_TURN, RADIANS_IN_TURN } from '../constants/angles.constant';

export class $Angle implements ISerialisable<string>, IComparable {
    public turns: $Number;

    public get radians(): $Number {
        return this.turns.multiply(RADIANS_IN_TURN);
    }

    public get degrees(): $Number {
        return this.turns.multiply(DEGREES_IN_TURN);
    }

    constructor(turns: $Number) {
        this.turns = turns;
    }

    public static fromRadians(radians: $Number): $Angle {
        return new this(radians.divide(RADIANS_IN_TURN));
    }

    public static fromDegrees(degrees: $Number): $Angle {
        return new this(degrees.divide(DEGREES_IN_TURN));
    }

    public add(other: $Angle): $Angle {
        return new $Angle(this.turns.add(other.turns));
    }

    public subtract(other: $Angle): $Angle {
        return new $Angle(this.turns.subtract(other.turns));
    }

    public isEqual(other: $Angle): boolean {
        return this.turns.isEqual(other.turns);
    }

    public valueOf(): number {
        return this.turns.valueOf();
    }

    public serialise(): string {
        return this.turns.serialise();
    }
}
