import { FunctionSpy } from 'alsatian';

import { spyStore } from '../classes/spy-store';
import { $GetPrototypeMethods } from '../helpers/get-prototype-methods.helper';

// tslint:disable no-any no-invalid-this

export function Stub(StaticClass: any): void {
    'use strict';

    const methods: Array<string> = $GetPrototypeMethods(StaticClass);

    methods.forEach((methodName: string) => {
        Object.defineProperty(StaticClass.prototype, methodName, {
            get(): FunctionSpy {
                return spyStore.get(this, methodName);
            },
            enumerable: true,
            configurable: true
        });
    });
}
