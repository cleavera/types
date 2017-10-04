import { FunctionSpy } from 'alsatian';

import { spyStore } from '../classes/spy-store';
import { $getPrototypeMethods } from '../helpers/get-prototype-methods.helper';
import { $getPrototypeProperties } from '../helpers/get-prototype-properties.helper';

// tslint:disable no-any no-invalid-this

export function Stub(StaticClass: any): void {
    'use strict';

    const methods: Array<string> = $getPrototypeMethods(StaticClass);

    methods.forEach((methodName: string) => {
        Object.defineProperty(StaticClass.prototype, methodName, {
            get(): FunctionSpy {
                return spyStore.get(this, methodName);
            },
            enumerable: true,
            configurable: false
        });
    });

    const properties: Array<string> = $getPrototypeProperties(StaticClass);

    properties.forEach((propertyName: string) => {
        Object.defineProperty(StaticClass.prototype, propertyName, {
            get(): FunctionSpy {
                return spyStore.get(this, `${propertyName}.get`).call();
            },
            set(value: any): void {
                spyStore.get(this, `${propertyName}.set`).call(value);
            },
            enumerable: true,
            configurable: false
        });
    });
}
