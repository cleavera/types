import { $Number } from '../../number';
import { ISerialisable } from '../../shared';

import { $Position } from './position';

export class $Vector implements ISerialisable<{ start: Array<string>, end: Array<string> }>  {
    public start: $Position;
    public end: $Position;

    public get magnitude(): $Number {
        return $Number.series((dimension: $Number) => {
            return this.end.getPositionForDimension(dimension.increment()).subtract(this.start.getPositionForDimension(dimension.increment())).power($Number.fromString('2'));
        }, $Number.nothing(), this.start.dimensions).nthRoot($Number.fromString('2'));
    }

    constructor(start: $Position, end: $Position) {
        if (start.dimensions > end.dimensions) {
            end = end.raiseToDimension(start.dimensions);
        } else if (start.dimensions < end.dimensions) {
            start = start.raiseToDimension(end.dimensions);
        }

        this.start = start;
        this.end = end;
    }

    public serialise(): { start: Array<string>, end: Array<string> } {
        return {
            start: this.start.serialise(),
            end: this.end.serialise()
        };
    }
}
