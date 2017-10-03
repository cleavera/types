import { $Number } from '../../number';
import { IComparable, ISerialisable } from '../../shared';

import { DEGREES_IN_TURN, RADIANS_IN_TURN } from '../constants/angles.constant';
import { COS, SIN } from '../constants/lookup-table.constant';

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

    public sin(): $Number {
        const translate: $Number = $Number.fromString('0.25');
        const angle: $Angle = new $Angle(this.turns.add(translate).modulus($Number.identity()).subtract(translate));

        if (angle.valueOf().toString() in SIN) {
            return new $Number(SIN[angle.valueOf().toString()], 1);
        }

        return $Number.series((n: $Number): $Number => {
            const k: $Number = $Number.fromString('2').multiply(n).add($Number.identity());

            return $Number.identity().negate().power(n).multiply(angle.radians.power(k)).divide(k.factorial());
        }, void 0, $Number.fromString('10'));
    }

    public cos(): $Number {
        const angle: $Angle = new $Angle(this.turns.modulus($Number.identity()));

        if (angle.valueOf().toString() in COS) {
            return new $Number(COS[angle.valueOf().toString()], 1);
        }

        return $Number.series((n: $Number): $Number => {
            const k: $Number = $Number.fromString('2').multiply(n);

            return $Number.identity().negate().power(n).multiply(angle.radians.power(k)).divide(k.factorial());
        }, void 0, $Number.fromString('10'));
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
