export function $recursePrototype(Static: any, callback: (proto: any) => void): void { // tslint:disable-line no-any
    let proto: any = Static.prototype; // tslint:disable-line no-any

    while (proto && proto !== Object.prototype) {
        callback(proto);

        proto = Object.getPrototypeOf(proto);
    }
}
