export function $gcd(a: number, b: number): number {
    let c: number = a % b;

    while (c > 0) {
        a = b;
        b = c;
        c = a % b;
    }

    return b;
}
