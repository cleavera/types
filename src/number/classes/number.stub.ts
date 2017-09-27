import { Stub } from '../../shared';

import { $Number } from './number';

@Stub
export class $NumberStub extends $Number {
    constructor(value: number = 3) {
        super(value, 1);
    }
}
