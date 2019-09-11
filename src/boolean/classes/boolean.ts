import { ISerialisable } from '../../shared';

export class $Boolean implements ISerialisable<boolean> {
    private _value: boolean;

    constructor(value: boolean = false) {
        this._value = value;
    }

    public serialise(): boolean {
        return this._value || false;
    }
}
