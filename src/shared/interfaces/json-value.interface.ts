import { IJsonNativeValue } from './json-native-value.interface';

export type IJsonValue = IJsonNativeValue | Array<IJsonNativeValue> | { [key: string]: IJsonNativeValue };
