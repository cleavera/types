import { ISerialisable } from '../../shared';
import { MILLISECONDS_IN_SECOND, SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from '../constants/time.constant';

export class $Time implements ISerialisable<string> {
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

    public static fromString(time: string): $Time {
        const [hours, minutes, seconds]: Array<string> = time.split(':');

        if (seconds === undefined) {
            throw new Error(`${time} is not a valid time`);
        }

        let t: number = Number(seconds);
        const m: number = Number(minutes);
        const h: number = Number(hours);

        if (isNaN(t) || isNaN(m) || isNaN(h)) {
            throw new Error(`${time} is not a valid time`);
        }

        t += ( m * SECONDS_IN_MINUTE ) + ( h * SECONDS_IN_HOUR );

        return new this(t);
    }

    public add(other: $Time): $Time {
        return new $Time(this.timeInSeconds + other.timeInSeconds);
    }

    public subtract(other: $Time): $Time {
        return new $Time(Math.max(this.timeInSeconds + other.timeInSeconds, 0));
    }

    public isEqual(other: $Time): boolean {
        return this.timeInSeconds === other.timeInSeconds;
    }

    public valueOf(): number {
        return this.timeInSeconds;
    }

    public toString(): string {
        return `${this.hours}:${this.minutes}:${this.seconds}${this.milliSeconds > 0 ? '.' + this.milliSeconds : ''}`;
    }

    public serialise(): string {
        return this.toString();
    }
}
