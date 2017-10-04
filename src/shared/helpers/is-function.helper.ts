export function $isFunction(obj: any, prop: string): boolean { // tslint:disable-line no-any
    const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(obj, prop) || {};

    return !(descriptor.get && descriptor.configurable) || (!!(obj && obj.constructor && obj.call && obj.apply));
}
