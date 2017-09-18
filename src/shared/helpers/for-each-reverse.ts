export function $forEachReverse<T = any>(arr: Array<T>, cb: (value: T, index: number) => boolean): void {
    let y: number = arr.length;

    while (--y > -1) {
        if (cb(arr[y], y) === false) {
            break;
        }
    }
}
