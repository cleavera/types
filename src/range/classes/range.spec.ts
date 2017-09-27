import { Expect, Setup, Test, TestFixture } from 'alsatian';

import { $Number, $NumberStub } from '../../number';
import { spyStore } from '../../shared';

import { $Range } from './range';

@TestFixture('$Range.serialise')
export class SerialiseSpec {
    private _numberStub1: $Number;
    private _numberStub2: $Number;
    private _instance: $Range<$Number>;

    @Setup
    public setup(): void {
        this._numberStub1 = new $NumberStub();
        this._numberStub2 = new $NumberStub();
        spyStore.get(this._numberStub1, 'serialise').andReturn('1');
        spyStore.get(this._numberStub2, 'serialise').andReturn('3');
        this._instance = new $Range<$Number>(this._numberStub1, this._numberStub2);
    }

    @Test('should serialise correctly')
    public serialise(): void {
        Expect(this._instance.serialise()).toEqual({
            start: '1',
            end: '3'
        });
    }
}
