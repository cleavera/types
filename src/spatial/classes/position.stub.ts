import { $Number, $NumberStub } from '../../number';
import { Stub } from '../../shared';

import { $Position } from './position';

@Stub
export class $PositionStub extends $Position {
    constructor(...dimensions: Array<number>) {
        dimensions = dimensions || [3, 2];

        const mappedDimensions: Array<$Number> = dimensions.map((d: number) => {
            return new $NumberStub(d);
        });

        super(...mappedDimensions);
    }
}
