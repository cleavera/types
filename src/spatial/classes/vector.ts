import { ISerialisable } from '../../shared';
import { $Position } from './position';

export class $Vector implements ISerialisable<{ start: Array<string>, end: Array<string> }>  {
    public start: $Position;
    public end: $Position;

    constructor(start: $Position, end: $Position) {
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
