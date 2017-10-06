import { Expect, Setup, Test, TestCase, TestFixture } from 'alsatian';

import { $Number } from '../../number';
import { spyStore } from '../../shared';

import { $Angle } from './angle';
import { $Position } from './position';
import { $PositionStub } from './position.stub';
import { $Vector } from './vector';
import { $NumberStub } from '../../number/classes/number.stub';

@TestFixture('$Vector.serialise')
export class SerialiseSpec {
    private _instance: $Vector;
    private _start: $Position;
    private _end: $Position;

    @Setup
    public setup(): void {
        this._start = new $PositionStub(0, 0);
        this._end = new $PositionStub(2, 2);

        spyStore.get(this._start, 'serialise').andReturn(['0', '0']);
        spyStore.get(this._end, 'serialise').andReturn(['2', '2']);
        this._instance = new $Vector(this._start, this._end);
    }

    @Test('should serialise correctly')
    public serialise(): void {
        Expect(this._instance.serialise()).toEqual({
            start: ['0', '0'],
            end: ['2', '2']
        });
    }
}

@TestFixture('$Vector.constructor')
export class ConstructorSpec {
    private _instance: $Vector;
    private _start: $Position;
    private _end: $Position;

    @Setup
    public setup(): void {
        this._start = new $PositionStub(0, 0);
        this._end = new $PositionStub(2, 2);
    }

    @Test('should raise the start dimensions when there are less start dimensions than end')
    public raiseStartDimensions(): void {
        spyStore.get(this._start, 'dimensions.get').andReturn(1);
        spyStore.get(this._end, 'dimensions.get').andReturn(2);
        this._instance = new $Vector(this._start, this._end);

        Expect(this._start.raiseToDimension).toHaveBeenCalledWith(2);
        Expect(this._end.raiseToDimension).not.toHaveBeenCalled();
    }

    @Test('should raise the end dimensions when there are less end dimensions than start')
    public raiseEndDimensions(): void {
        spyStore.get(this._start, 'dimensions.get').andReturn(2);
        spyStore.get(this._end, 'dimensions.get').andReturn(1);
        this._instance = new $Vector(this._start, this._end);

        Expect(this._end.raiseToDimension).toHaveBeenCalledWith(2);
        Expect(this._start.raiseToDimension).not.toHaveBeenCalled();
    }

    @Test('should not raise either positions dimensions when they have the same number of dimensions')
    public raiseNeitherDimensions(): void {
        spyStore.get(this._start, 'dimensions.get').andReturn(2);
        spyStore.get(this._end, 'dimensions.get').andReturn(2);
        this._instance = new $Vector(this._start, this._end);

        Expect(this._start.raiseToDimension).not.toHaveBeenCalled();
        Expect(this._end.raiseToDimension).not.toHaveBeenCalled();
    }
}

@TestFixture('$Vector.magnitude')
export class MagnitudeSpec {
    @TestCase(1, [0], [1])
    @TestCase(4, [0], [4])
    @TestCase(3, [1], [4])
    @TestCase(4, [0, 0], [4])
    @TestCase(5, [0, 0], [3, 4])
    @TestCase(13, [1, 2], [6, 14])
    @TestCase(3, [0], [1, 2, 2])
    @TestCase(25, [0], [12, 15, 16])
    @TestCase(3.2341923257592455, [1.2, 4.4, 5.5], [4.3, 3.7, 6.1])
    @Test('should return the correct magnitude')
    public magnitude(magnitude: number, start: Array<number>, end: Array<number>): void {
        const startPos: $Position = new $Position(...start.map((num: number) => {
            return new $Number(num, 1);
        }));

        const endPos: $Position = new $Position(...end.map((num: number) => {
            return new $Number(num, 1);
        }));

        const instance: $Vector = new $Vector(startPos, endPos);

        Expect(instance.magnitude.valueOf()).toEqual(magnitude);
    }
}

@TestFixture('$Vector.normalise')
export class NormaliseSpec {
    @TestCase([0], [1], ['0'], ['1'])
    @TestCase([2], [4], ['0'], ['1'])
    @TestCase([0, 0], [7, 24], ['0', '0'], ['0.28', '0.96'])
    @TestCase([2, 5], [30, 50], ['0', '0'], ['0.5283018867924528', '0.8490566037735849'])
    @TestCase([0], [3, 6, 22], ['0', '0', '0'], ['0.13043478260869565', '0.2608695652173913', '0.9565217391304348'])
    @Test('should return the normalised vector')
    public normalise(start: Array<number>, end: Array<number>, newStart: Array<number>, newEnd: Array<number>): void {
        const startPos: $Position = new $Position(...start.map((num: number) => {
            return new $Number(num, 1);
        }));

        const endPos: $Position = new $Position(...end.map((num: number) => {
            return new $Number(num, 1);
        }));

        const instance: $Vector = new $Vector(startPos, endPos);
        const normalised: $Vector = instance.normalise();

        Expect(normalised.serialise()).toEqual({ start: newStart, end: newEnd });
        Expect(normalised.magnitude.valueOf()).toEqual($Number.identity().valueOf());
    }
}

@TestFixture('$Vector.getAngleForDimensions')
export class GetAngleForDimensionsSpec {
    @TestCase([0, 0], [1, 1], 1, Math.atan(1))
    @TestCase([0, 0], [20, 20], 1, Math.atan(1))
    @TestCase([0, 0], [20, 10], 1, Math.atan(0.5))
    @TestCase([0, 0], [3, 1], 1, Math.atan(1 / 3))
    @TestCase([0, 0], [-1, 1], 1, Math.PI - Math.atan(1))
    @Test('should return the the angle for the vector at a dimension')
    public normalise(start: Array<number>, end: Array<number>, dimension: number, result: number): void {
        const startPos: $Position = new $Position(...start.map((num: number) => {
            return new $Number(num, 1);
        }));

        const endPos: $Position = new $Position(...end.map((num: number) => {
            return new $Number(num, 1);
        }));

        const angleDimension: $Number = new $Number(dimension, 1);
        const resultAngle: $Number = $Angle.fromRadians(new $Number(result, 1)).turns;

        const instance: $Vector = new $Vector(startPos, endPos);
        const decimalPlaces: $Number = $Number.two();

        Expect(instance.getAngleForDimension(angleDimension).turns.round(decimalPlaces).serialise()).toEqual(resultAngle.round(decimalPlaces).serialise());
    }
}

@TestFixture('$Vector.dimensions')
export class DimensionsSpec {
    private _instance: $Vector;
    private _start: $Position;
    private _end: $Position;
    private _dimensions: $Number;

    @Setup
    public setup(): void {
        this._start = new $PositionStub(0, 0);
        this._end = new $PositionStub(2, 2);
        this._dimensions = new $NumberStub(1);

        spyStore.get(this._start, 'dimensions.get').andReturn(this._dimensions);
        this._instance = new $Vector(this._start, this._end);
    }

    @Test('should return the correct number of dimensions')
    public dimensions(): void {
        Expect(spyStore.get(this._start, 'dimensions.get')).toHaveBeenCalledWith();
        Expect(this._instance.dimensions).toEqual(this._dimensions);
    }
}
