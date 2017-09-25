import { ISerialisable } from '../../shared';

export class $Boolean implements ISerialisable<boolean> {
    private _value: boolean;

    constructor(value?: boolean) {
        if (value) {
            this._value = value;
        }
    }

    public serialise(): boolean {
        return this._value || false;
    }
}
