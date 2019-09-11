import { Expect, Setup, Test, TestFixture } from 'alsatian';
import { $String } from './string';

@TestFixture('$String.serialise')
export class SerialiseSpec {
    private _instance!: $String;

    @Setup
    public setup(): void {
        this._instance = new $String('Hello world');
    }

    @Test('should serialise correctly')
    public serialise(): void {
        Expect(this._instance.serialise()).toEqual('Hello world');
    }
}
