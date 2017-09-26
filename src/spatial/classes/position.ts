import { $Number } from '../../number';
import { ISerialisable } from '../../shared';

export class $Position implements ISerialisable<Array<string>> {
    public coordinates: Array<$Number>;

    public get dimensions(): number {
        return this.coordinates.length;
    }

    constructor(...coordinates: Array<$Number>) {
        this.coordinates = coordinates;
    }

    public getPositionForDimension(dimension: number): $Number {
        if (dimension > this.dimensions) {
            throw new Error(`This ${this.dimensions}d coordinate does not a have a position for the ${dimension} dimension`);
        }

        return this.coordinates[dimension - 1];
    }

    public raiseToDimension(newDimension: number): $Position {
        if (newDimension < this.dimensions) {
            throw new Error(`${this.dimensions}d coordinate can only be raised to higher dimensions - Value: ${newDimension}d`);
        }

        const newCoordinate: Array<$Number> = this.coordinates.slice();

        for (let x: number = newCoordinate.length; x <= newDimension; x++) {
            newCoordinate.push($Number.nothing());
        }

        return new $Position(...newCoordinate);
    }

    public serialise(): Array<string> {
        return this.coordinates.map((position: $Number) => {
            return position.serialise();
        });
    }
}
