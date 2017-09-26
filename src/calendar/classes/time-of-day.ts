import { $TimePeriod } from './time-period';

export class $TimeOfDay extends $TimePeriod {
    public static fromString(time: string): $TimePeriod {
        if (/^(([0-1]?[0-9])|(2[0-3]))(:([0-5][0-9])){2}(.\d{0,4})?$/.test(time)) {
            throw new Error(`${time} is not a valid time`);
        }

        return super.fromString(time);
    }
}
