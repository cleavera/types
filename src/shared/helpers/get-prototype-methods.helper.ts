import { $isFunction } from './is-function.helper';
import { $recursePrototype } from './recurse-prototype.helper';

export function $getPrototypeMethods(Static: any): Array<string> { // tslint:disable-line no-any
    const props: Array<string> = [];

    $recursePrototype(Static, (proto: any) => { // tslint:disable-line no-any
        const ownProps: Array<string> = Object.getOwnPropertyNames(proto);

        ownProps.forEach((prop: string) => {
            if (props.indexOf(prop) === -1 && $isFunction(proto, prop) && prop !== 'constructor' && prop !== 'valueOf' && prop !== 'toString') {
                props.push(prop);
            }
        });
    });

    return props;
}
