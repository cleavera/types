import { Expect, Test, TestCase, TestFixture } from 'alsatian';

import { $gcd } from './gcd.helper';

@TestFixture('$gcd')
export class SerialiseSpec {
    @TestCase(10, 5, 5)
    @TestCase(1, 1, 1)
    @TestCase(7, 5, 1)
    @TestCase(0.5, 0.25, 0.25)
    @TestCase(100, 0.5, 0.5)
    @Test('should return the greatest common denominator')
    public serialise(a: number, b: number, out: number): void {
        Expect($gcd(a, b)).toEqual(out);
    }
}
