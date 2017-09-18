import { IJsonValue } from './json-value.interface';

export interface ISerialisable<T extends IJsonValue> {
    serialise(): T;
}
