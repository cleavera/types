import { ISerialisable } from '../../shared';
import { MILLISECONDS_IN_SECOND, SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from '../constants/time.constant';

export class $TimePeriod implements ISerialisable<string> {
    public readonly timeInSeconds: number;
    public get hours(): number {
        return Math.floor(this.timeInSeconds / SECONDS_IN_HOUR);
    }

    public get minutes(): number {
        return Math.floor((this.timeInSeconds - (this.hours * SECONDS_IN_HOUR)) / SECONDS_IN_MINUTE);
    }

    public get seconds(): number {
        return Math.floor(this.timeInSeconds - (this.hours * SECONDS_IN_HOUR) - (this.minutes * SECONDS_IN_MINUTE));
    }

    public get milliSeconds(): number {
        return Math.floor((this.timeInSeconds - (this.hours * SECONDS_IN_HOUR) - (this.minutes * SECONDS_IN_MINUTE) - this.seconds) * MILLISECONDS_IN_SECOND);
    }

    constructor(value: number) {
        this.timeInSeconds = value;
    }

    public static fromString(time: string): $TimePeriod {
        if (/^(\d)+(:([0-5][0-9])){2}(\.\d{0,3})?$/.test(time)) {
            throw new Error(`${time} is not a valid time`);
        }

        const [hours, minutes, seconds]: Array<string> = time.split(':');

        let t: number = Number(seconds);
        const m: number = Number(minutes);
        const h: number = Number(hours);

        t += ( m * SECONDS_IN_MINUTE ) + ( h * SECONDS_IN_HOUR );

        return new this(t);
    }

    public add(other: $TimePeriod): $TimePeriod {
        return new $TimePeriod(this.timeInSeconds + other.timeInSeconds);
    }

    public subtract(other: $TimePeriod): $TimePeriod {
        return new $TimePeriod(Math.max(this.timeInSeconds + other.timeInSeconds, 0));
    }

    public isEqual(other: $TimePeriod): boolean {
        return this.timeInSeconds === other.timeInSeconds;
    }

    public valueOf(): number {
        return this.timeInSeconds;
    }

    public toMilliSeconds(): number {
        return this.timeInSeconds * MILLISECONDS_IN_SECOND;
    }

    public toString(): string {
        return `${this.hours}:${this.minutes}:${this.seconds}${this.milliSeconds > 0 ? '.' + this.milliSeconds : ''}`;
    }

    public serialise(): string {
        return this.toString();
    }
}
