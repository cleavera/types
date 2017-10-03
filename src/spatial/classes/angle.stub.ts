import { $NumberStub } from '../../number';
import { Stub } from '../../shared';

import { $Angle } from './angle';

@Stub
export class $AngleStub extends $Angle {
    constructor(value: number = 3) {
        super(new $NumberStub(value));
    }
}
