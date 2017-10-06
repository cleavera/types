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
        const finalX: $Number = normalisedVector.getMagnitudeForDimension($Number.identity());
        const finalY: $Number = normalisedVector.getMagnitudeForDimension(dimension.increment());
        const increment: $Number = $Number.fromString('10000');
        let lastPos: $Position = new $Position($Number.identity(), $Number.nothing());

        let total: $Number = $Number.nothing();

        let theta: $Angle = $Angle.fromRadians($Number.series((y: $Number) => {
            y = y.divide(increment);
            const x: $Number = normalisedVector.magnitude.subtract(y.power($Number.two())).nthRoot($Number.two());
            const newPos: $Position = new $Position(x, y);
            const vector: $Vector = new $Vector(lastPos, newPos);
            lastPos = newPos;
            total = total.add(vector.magnitude);

            return vector.magnitude;
        }, void 0, finalY.multiply(increment)));

        if (finalX < $Number.nothing()) {
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
