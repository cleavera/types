import { Expect, Setup, Test, TestFixture } from 'alsatian';

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
