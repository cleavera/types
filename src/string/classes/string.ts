import { ISerialisable } from '../../shared';

export class $String implements ISerialisable<string> {
    private _value: string;

    constructor(value: string = '') {
        this._value = value;
    }

    public serialise(): string {
        return this._value || '';
    }
}
