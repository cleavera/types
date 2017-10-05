import { Expect, Setup, Test, TestCase, TestFixture } from 'alsatian';

import { $Number, $NumberStub } from '../../number';
import { spyStore } from '../../shared';

import { DEGREES_IN_TURN, RADIANS_IN_TURN } from '../constants/angles.constant';
import { $Angle } from './angle';
import { $AngleStub } from './angle.stub';

@TestFixture('$Angle.static.fromRadians')
export class FromRadiansSpec {
    private _instance: $Angle;
    private _radians: $Number;

    @Setup
    public setup(): void {
        this._radians = new $NumberStub(2);

        spyStore.get(this._radians, 'divide').andReturn(this._radians);

        this._instance = $Angle.fromRadians(this._radians);
    }

    @Test('should construct correctly')
    public construct(): void {
        Expect(spyStore.get(this._radians, 'divide')).toHaveBeenCalledWith(RADIANS_IN_TURN);
        Expect(this._instance.turns.valueOf()).toEqual(2);
    }
}

@TestFixture('$Angle.static.fromDegrees')
export class FromDegreesSpec {
    private _instance: $Angle;
    private _degrees: $Number;

    @Setup
    public setup(): void {
        this._degrees = new $NumberStub(2);

        spyStore.get(this._degrees, 'divide').andReturn(this._degrees);

        this._instance = $Angle.fromDegrees(this._degrees);
    }

    @Test('should construct correctly')
    public construct(): void {
        Expect(spyStore.get(this._degrees, 'divide')).toHaveBeenCalledWith(DEGREES_IN_TURN);
        Expect(this._instance.turns.valueOf()).toEqual(2);
    }
}

@TestFixture('$Angle.static.rightAngle')
export class RightAngleSpec {
    private _instance: $Angle;

    @Setup
    public setup(): void {
        this._instance = $Angle.rightAngle();
    }

    @Test('should construct correctly')
    public construct(): void {
        Expect(this._instance.turns.valueOf()).toEqual(0.25);
    }
}

@TestFixture('$Angle.static.straightAngle')
export class StraightAngleSpec {
    private _instance: $Angle;

    @Setup
    public setup(): void {
        this._instance = $Angle.straightAngle();
    }

    @Test('should construct correctly')
    public construct(): void {
        Expect(this._instance.turns.valueOf()).toEqual(0.5);
    }
}

@TestFixture('$Angle.static.zeroAngle')
export class ZeroAngleSpec {
    private _instance: $Angle;

    @Setup
    public setup(): void {
        this._instance = $Angle.zeroAngle();
    }

    @Test('should construct correctly')
    public construct(): void {
        Expect(this._instance.turns.valueOf()).toEqual(0);
    }
}

@TestFixture('$Angle.static.circleAngle')
export class CircleAngleSpec {
    private _instance: $Angle;

    @Setup
    public setup(): void {
        this._instance = $Angle.circleAngle();
    }

    @Test('should construct correctly')
    public construct(): void {
        Expect(this._instance.turns.valueOf()).toEqual(1);
    }
}

@TestFixture('$Angle.degrees')
export class DegreesSpec {
    private _instance: $Angle;
    private _turns: $Number;

    @Setup
    public setup(): void {
        this._turns = new $NumberStub(1);

        spyStore.get(this._turns, 'multiply').andReturn(this._turns);

        this._instance = new $Angle(this._turns);
    }

    @Test('should return the number of degrees')
    public degrees(): void {
        Expect(this._instance.degrees.valueOf()).toEqual(1);
        Expect(spyStore.get(this._turns, 'multiply')).toHaveBeenCalledWith(DEGREES_IN_TURN);
    }
}

@TestFixture('$Angle.radians')
export class RadiansSpec {
    private _instance: $Angle;
    private _turns: $Number;

    @Setup
    public setup(): void {
        this._turns = new $NumberStub(1);

        spyStore.get(this._turns, 'multiply').andReturn(this._turns);

        this._instance = new $Angle(this._turns);
    }

    @Test('should return the number of radians')
    public radians(): void {
        Expect(this._instance.radians.valueOf()).toEqual(1);
        Expect(spyStore.get(this._turns, 'multiply')).toHaveBeenCalledWith(RADIANS_IN_TURN);
    }
}

@TestFixture('$Angle.add')
export class AddSpec {
    private _instance: $Angle;
    private _turns: $Number;
    private _other: $AngleStub;
    private _new: $Number;

    @Setup
    public setup(): void {
        this._turns = new $NumberStub(1);
        this._other = new $AngleStub(2);
        this._new = new $NumberStub(3);

        spyStore.get(this._turns, 'add').andReturn(this._new);

        this._instance = new $Angle(this._turns);
    }

    @Test('should add the turns together and return a new angle')
    public add(): void {
        Expect(this._instance.add(this._other)).toEqual(new $Angle(this._new));
        Expect(spyStore.get(this._turns, 'add')).toHaveBeenCalledWith(this._other.turns);
    }
}

@TestFixture('$Angle.subtract')
export class SubtractSpec {
    private _instance: $Angle;
    private _turns: $Number;
    private _other: $AngleStub;
    private _new: $Number;

    @Setup
    public setup(): void {
        this._turns = new $NumberStub(1);
        this._other = new $AngleStub(2);
        this._new = new $NumberStub(3);

        spyStore.get(this._turns, 'subtract').andReturn(this._new);

        this._instance = new $Angle(this._turns);
    }

    @Test('should add the turns together and return a new angle')
    public add(): void {
        Expect(this._instance.subtract(this._other)).toEqual(new $Angle(this._new));
        Expect(spyStore.get(this._turns, 'subtract')).toHaveBeenCalledWith(this._other.turns);
    }
}

@TestFixture('$Angle.isEqual')
export class IsEqualSpec {
    private _instance: $Angle;
    private _turns: $Number;
    private _other: $AngleStub;

    @Setup
    public setup(): void {
        this._turns = new $NumberStub(1);
        this._other = new $AngleStub(2);

        this._instance = new $Angle(this._turns);
    }

    @Test('should return true when the angles are equal')
    public isEqual(): void {
        spyStore.get(this._turns, 'isEqual').andReturn(true);

        Expect(this._instance.isEqual(this._other)).toEqual(true);
    }

    @Test('should return false when the angles are not equal')
    public isNotEqual(): void {
        spyStore.get(this._turns, 'isEqual').andReturn(false);

        Expect(this._instance.isEqual(this._other)).toEqual(false);
    }
}

@TestFixture('$Angle.valueOf')
export class ValueOfSpec {
    private _instance: $Angle;
    private _turns: $Number;

    @Setup
    public setup(): void {
        this._turns = new $NumberStub(1);

        this._instance = new $Angle(this._turns);
    }

    @Test('should the value of turns')
    public isEqual(): void {
        Expect(this._instance.valueOf()).toEqual(this._turns.valueOf());
    }
}

@TestFixture('$Angle.serialise')
export class SerialiseSpec {
    private _instance: $Angle;
    private _turns: $Number;

    @Setup
    public setup(): void {
        this._turns = new $NumberStub(1);
        spyStore.get(this._turns, 'serialise').andReturn('1');

        this._instance = new $Angle(this._turns);
    }

    @Test('should serialise correctly')
    public serialise(): void {
        Expect(this._instance.serialise()).toEqual('1');
    }
}

@TestFixture('$Angle.sin')
export class SinSpec {
    @TestCase(0, 0)
    @TestCase(1, 0)
    @TestCase(20, 0)
    @TestCase(200.5, 0)
    @TestCase(459.25, 1)
    @TestCase(0.5, 0)
    @TestCase(0.25, 1)
    @TestCase(0.75, -1)
    @TestCase(0.1, Math.sin(0.1 * Math.PI * 2))
    @TestCase(-0.1, Math.sin(-0.1 * Math.PI * 2))
    @TestCase(0.3, Math.sin(0.3 * Math.PI * 2))
    @TestCase(-0.3, Math.sin(-0.3 * Math.PI * 2))
    @TestCase(0.7, Math.sin(0.7 * Math.PI * 2))
    @TestCase(-0.7, Math.sin(-0.7 * Math.PI * 2))
    @Test('should return the sin of the angle')
    public sin(turns: number, value: number): void {
        const turnsCount: $Number = new $Number(turns, 1);
        const instance: $Angle = new $Angle(turnsCount);

        Expect(instance.sin().valueOf().toString().substr(0, 7)).toEqual(value.toString().substr(0, 7));
    }
}

@TestFixture('$Angle.cos')
export class CosSpec {
    @TestCase(0, 1)
    @TestCase(1, 1)
    @TestCase(20, 1)
    @TestCase(200.5, -1)
    @TestCase(459.25, 0)
    @TestCase(0.5, -1)
    @TestCase(0.25, 0)
    @TestCase(0.75, 0)
    @TestCase(0.1, Math.cos(0.1 * Math.PI * 2))
    @TestCase(-0.1, Math.cos(-0.1 * Math.PI * 2))
    @TestCase(0.3, Math.cos(0.3 * Math.PI * 2))
    @TestCase(-0.3, Math.cos(-0.3 * Math.PI * 2))
    @TestCase(0.7, Math.cos(0.7 * Math.PI * 2))
    @TestCase(-0.7, Math.cos(-0.7 * Math.PI * 2))
    @Test('should return the cos of the angle')
    public cos(turns: number, value: number): void {
        const turnsCount: $Number = new $Number(turns, 1);
        const instance: $Angle = new $Angle(turnsCount);

        Expect(instance.cos().valueOf().toString().substr(0, 7)).toEqual(value.toString().substr(0, 7));
    }
}

@TestFixture('$Angle.tan')
export class TanSpec {
    @TestCase(0, 0)
    @TestCase(1, 0)
    @TestCase(20, 0)
    @TestCase(200.5, 0)
    @TestCase(459.25, NaN)
    @TestCase(0.5, 0)
    @TestCase(0.25, NaN)
    @TestCase(0.75, NaN)
    @TestCase(0.1, Math.tan(0.1 * Math.PI * 2))
    @TestCase(-0.1, Math.tan(-0.1 * Math.PI * 2))
    @TestCase(0.3, Math.tan(0.3 * Math.PI * 2))
    @TestCase(-0.3, Math.tan(-0.3 * Math.PI * 2))
    @TestCase(0.7, Math.tan(0.7 * Math.PI * 2))
    @TestCase(-0.7, Math.tan(-0.7 * Math.PI * 2))
    @Test('should return the tan of the angle')
    public tan(turns: number, value: number): void {
        const turnsCount: $Number = new $Number(turns, 1);
        const instance: $Angle = new $Angle(turnsCount);

        Expect(instance.tan().valueOf().toString().substr(0, 6)).toEqual(value.toString().substr(0, 6));
    }
}
