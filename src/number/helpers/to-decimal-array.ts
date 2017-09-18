import { $forEach } from '../../shared';

import { IDecimalNumber } from '../interfaces/decimal-number.interface';

export function $toDecimalArray(chars: Array<string>, radix: number): Array<IDecimalNumber> {
    let counter: number = 0;
    const out: Array<IDecimalNumber> = [];
    let multiplier: number = 0;

    $forEach<string>(chars, (char: string, index: number) => {
        counter += (parseInt(char, radix) * Math.pow(radix, multiplier));

        if (counter > 9) {
            out.push((counter % 10) as IDecimalNumber);
            counter -= 10;
            multiplier = 0;
        } else {
            multiplier++;
        }

        if (index === (char.length - 1)) {
            while (counter > 0) {
                out.push((counter % 10) as IDecimalNumber);
                counter -= 10;
            }
        }
    });

    return out;
}
