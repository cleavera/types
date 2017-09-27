export function $GetPrototypeMethods(Static: any): Array<string> { // tslint:disable-line no-any
    const props: Array<string> = [];
    let proto: any = Static.prototype; // tslint:disable-line no-any

    while (proto && proto !== Object.prototype) {
        const ownProps: Array<string> = Object.getOwnPropertyNames(proto);

        ownProps.forEach((prop: string) => {
            if (props.indexOf(prop) === -1) {
                props.push(prop);
            }
        });

        proto = Object.getPrototypeOf(proto);
    }

    return props;
}
