import { Expect, Setup, Test, TestFixture } from 'alsatian';
import { $Boolean } from './boolean';

@TestFixture('$Boolean.serialise')
export class SerialiseSpec {
    private _instance: $Boolean;

    @Setup
    public setup(): void {
        this._instance = new $Boolean(true);
    }

    @Test('should serialise correctly')
    public serialise(): void {
        Expect(this._instance.serialise()).toEqual(true);
    }
}
