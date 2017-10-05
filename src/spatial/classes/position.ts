import { $Number } from '../../number';
import { ISerialisable } from '../../shared';

export class $Position implements ISerialisable<Array<string>> {
    public coordinates: Array<$Number>;

    public get dimensions(): $Number {
        return $Number.fromString(this.coordinates.length.toString());
    }

    constructor(...coordinates: Array<$Number>) {
        this.coordinates = coordinates;
    }

    public static origin(): $Position {
        return new $Position($Number.nothing());
    }

    public getPositionForDimension(dimension: $Number): $Number {
        dimension = dimension.integer();

        if (dimension > this.dimensions) {
            throw new Error(`This ${this.dimensions}d coordinate does not a have a position for the ${dimension} dimension`);
        }

        return this.coordinates[dimension.subtract($Number.identity()).valueOf()];
    }

    public raiseToDimension(newDimension: $Number): $Position {
        if (newDimension < this.dimensions) {
            throw new Error(`${this.dimensions}d coordinate can only be raised to higher dimensions - Value: ${newDimension}d`);
        }

        const newCoordinate: Array<$Number> = this.coordinates.slice();
        let x: $Number = $Number.fromString(newCoordinate.length.toString());

        while (x < newDimension) {
            newCoordinate.push($Number.nothing());
            x = x.increment();
        }

        return new $Position(...newCoordinate);
    }

    public serialise(): Array<string> {
        return this.coordinates.map((position: $Number) => {
            return position.serialise();
        });
    }
}
