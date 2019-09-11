import { createFunctionSpy, FunctionSpy } from 'alsatian';

export class SpyStoreFactory {
    private _map: Map<unknown, { [key: string]: FunctionSpy }>;

    constructor() {
        this._map = new Map();
    }

    public get(obj: unknown, methodName: string): FunctionSpy {
        if (!this._map.has(obj)) {
            this._map.set(obj, {});
        }

        const reflect: { [key: string]: FunctionSpy } = this._map.get(obj) || {};

        if (!(methodName in reflect)) {
            reflect[methodName] = createFunctionSpy();
        }

        return reflect[methodName];
    }
}

export const spyStore: SpyStoreFactory = new SpyStoreFactory();
