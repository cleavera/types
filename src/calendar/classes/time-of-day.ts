import { $TimePeriod } from './time-period';

export class $TimeOfDay extends $TimePeriod {
    public static fromString(time: string): $TimeOfDay {
        if (/^(([0-1]?[0-9])|(2[0-3]))(:([0-5][0-9])){2}(\.\d{0,3})?$/.test(time)) {
            throw new Error(`${time} is not a valid time of day`);
        }

        return super.fromString(time);
    }
}
