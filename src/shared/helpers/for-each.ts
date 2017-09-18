export function $forEach<T = any>(arr: Array<T>, cb: (value: T, index: number) => boolean | void): void {
    let x: number = -1;
    const y: number = arr.length;

    while (++x < y) {
        if (cb(arr[x], x) === false) {
            break;
        }
    }
}
