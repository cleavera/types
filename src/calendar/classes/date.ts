import { $DateTime } from './datetime';

export class $Date extends $DateTime {
    public static fromString(date: string): $Date {
        date = date.split('T')[0];

        if (/^(\d){4}-(((0)?[1-9])|(1[0-2]))-(((0)?[1-9])|([1-2][0-9])|(3[0-1]))$/.test(date)) {
            throw new Error(`${date} is not a valid date`);
        }

        return new this(new Date(date));
    }

    public isEqual(other: $Date): boolean {
        return this.valueOf() === other.valueOf();
    }

    public toString(): string {
        return `${this.dateObject.getFullYear()}-${this.dateObject.getMonth() + 1}-${this.dateObject.getDate()}`;
    }
}
