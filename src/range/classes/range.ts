import { ISerialisable } from '../../shared';
import { IRangeItem } from '../interfaces/range-item.interface';

export class $Range<T extends IRangeItem> implements ISerialisable<{ start: any, end: any }> { // tslint:disable-line no-any
    public start: T;
    public end: T;

    constructor(start: T, end: T) {
        this.start = start;
        this.end = end;
    }

    public serialise(): { start: any, end: any } { // tslint:disable-line no-any
        return {
            start: this.start.serialise(),
            end: this.end.serialise()
        };
    }
}
