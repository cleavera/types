export class String {
    private _value: string;

    constructor(value?: string) {
        if (value) {
            this._value = value;
        }
    }

    public serialise(): string {
        return this._value || '';
    }
}
