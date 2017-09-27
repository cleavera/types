import { spyStore } from '../classes/spy-store';
import { $GetPrototypeMethods } from '../helpers/get-prototype-methods.helper';

// tslint:disable no-any no-invalid-this

export function Stub(StaticClass: any): void {
    'use strict';

    const methods: Array<string> = $GetPrototypeMethods(StaticClass);

    methods.forEach((methodName: string) => {
        if (methodName === 'constructor') {
            return;
        }

        StaticClass.prototype[methodName] = function(): any {
            return spyStore.get(this, methodName).call(...arguments);
        };
    });
}
