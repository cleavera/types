import { ISerialisable } from '../../shared';
import { $Date } from './date';
import { $TimePeriod } from './time-period';

export class $DateTime implements ISerialisable<string> {
    protected readonly dateObject: Date;

    constructor(value: Date) {
        this.dateObject = value;
    }

    public static fromUnixTimestamp(unixTimeStamp: number): $DateTime {
        return new this(new Date(unixTimeStamp));
    }

    public static fromString(date: string): $DateTime {
        if (/^(\d){4}-(((0)?[1-9])|(1[0-2]))-(((0)?[1-9])|([1-2][0-9])|(3[0-1]))T(([0-1]?[0-9])|(2[0-3]))(:([0-5][0-9])){2}(\.\d{0,3})?([Zz]?)$/.test(date)) {
            throw new Error(`${date} is not a valid date time`);
        }

        return new this(new Date(date));
    }

    public addPeriod(period: $TimePeriod): $DateTime {
        return $DateTime.fromUnixTimestamp(period.toMilliSeconds() + this.valueOf());
    }

    public toDate(): $Date {
        return $Date.fromString(this.toString());
    }

    public isEqual(other: $DateTime): boolean {
        return this.valueOf() === other.valueOf();
    }

    public valueOf(): number {
        return this.dateObject.getTime();
    }

    public toString(): string {
        return this.dateObject.toISOString();
    }

    public serialise(): string {
        return this.toString();
    }
}
