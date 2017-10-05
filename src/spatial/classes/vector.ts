import { $Number } from '../../number';
import { ISerialisable } from '../../shared';

import { $Angle } from './angle';
import { $Position } from './position';

export class $Vector implements ISerialisable<{ start: Array<string>, end: Array<string> }>  {
    public start: $Position;
    public end: $Position;

    public get magnitude(): $Number {
        return $Number.series((dimension: $Number) => {
            return this.getMagnitudeForDimension(dimension.increment()).power($Number.fromString('2'));
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

    public getMagnitudeForDimension(dimension: $Number): $Number {
        return this.end.getPositionForDimension(dimension).subtract(this.start.getPositionForDimension(dimension));
    }

    public normalise(): $Vector {
        const coordinates: Array<$Number> = [];

        let dimension: $Number = $Number.identity();

        while (dimension <= this.end.dimensions) {
            coordinates.push(this.getMagnitudeForDimension(dimension).divide(this.magnitude));
            dimension = dimension.increment();
        }

        return new $Vector($Position.origin(), new $Position(...coordinates));
    }

    public getAngleForDimension(dimension: $Number): $Angle {
        const normalisedVector: $Vector = this.normalise();
        const x: $Number = normalisedVector.getMagnitudeForDimension($Number.identity());
        const y: $Number = normalisedVector.getMagnitudeForDimension(dimension.increment());
        const z: $Number = y.divide(x);

        let theta: $Angle = $Angle.fromRadians($Number.series((n: $Number) => {
            const k: $Number = $Number.fromString('2').multiply(n).add($Number.identity());

            return $Number.identity().negate().power(n).multiply(z.power(k)).divide(k);
        }, void 0, $Number.fromString('100')));

        if (x < $Number.nothing()) {
            theta = theta.subtract($Angle.straightAngle());
        } else if (theta < $Angle.zeroAngle()) {
            theta = theta.add($Angle.circleAngle());
        }

        return theta;
    }

    public serialise(): { start: Array<string>, end: Array<string> } {
        return {
            start: this.start.serialise(),
            end: this.end.serialise()
        };
    }
}
