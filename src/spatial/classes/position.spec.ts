import { Expect, Setup, Test, TestCase, TestFixture } from 'alsatian';

import { $Number, $NumberStub } from '../../number';
import { spyStore } from '../../shared';

import { $Position } from './position';

@TestFixture('$Position.serialise')
export class SerialiseSpec {
    private _instance: $Position;
    private _numberStub1: $Number;
    private _numberStub2: $Number;
    private _numberStub3: $Number;

    @Setup
    public setup(): void {
        this._numberStub1 = new $NumberStub(1);
        this._numberStub2 = new $NumberStub(3);
        this._numberStub3 = new $NumberStub(5);

        spyStore.get(this._numberStub1, 'serialise').andReturn('1');
        spyStore.get(this._numberStub2, 'serialise').andReturn('3');
        spyStore.get(this._numberStub3, 'serialise').andReturn('5');
        this._instance = new $Position(this._numberStub1, this._numberStub2, this._numberStub3);
    }

    @Test('should serialise correctly')
    public serialise(): void {
        Expect(this._instance.serialise()).toEqual(['1', '3', '5']);
    }
}

@TestFixture('$Position.dimensions')
export class DimensionsSpec {
    private _instance: $Position;
    private _numberStub1: $Number;
    private _numberStub2: $Number;
    private _numberStub3: $Number;

    @Setup
    public setup(): void {
        this._numberStub1 = new $NumberStub(1);
        this._numberStub2 = new $NumberStub(3);
        this._numberStub3 = new $NumberStub(5);

        spyStore.get(this._numberStub1, 'serialise').andReturn('1');
        spyStore.get(this._numberStub2, 'serialise').andReturn('3');
        spyStore.get(this._numberStub3, 'serialise').andReturn('5');
    }

    @TestCase(1, this._numberStub1)
    @TestCase(2, this._numberStub1, this._numberStub2)
    @TestCase(3, this._numberStub1, this._numberStub2, this._numberStub3)
    @Test('should return the correct number of dimensions')
    public serialise(dimensions: number, ...args: Array<$Number>): void {
        this._instance = new $Position(...args);
        Expect(this._instance.dimensions.valueOf()).toEqual(dimensions);
    }
}