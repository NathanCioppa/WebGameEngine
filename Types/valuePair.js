
// A type that contains a pair of two number values: 'x' and 'y'.
// If 'x' and 'y' are null or undefined, they will be set to zero.
    // If 'x' is passed and 'y' is null or undefined, both 'x' and
    // 'y' will be set to the value of 'x'. 
    // ex. new ValuePair(2) will create Valuepair(2,2), makes it easy
    // to create a ValuePair of equal 'x' and 'y'
export class ValuePair {
    constructor(x,y) {
        if(x == null && y == null) return this.Zero();
        if(typeof x !== 'number') throw new Error("Type Error. 'x' must be of type 'number'");
        if(y == null) y = x;
        if(typeof y !== "number") throw new Error("Type Error. 'y' must be of type 'number'");

        this.x = x
        this.y = y
    }

    // Sets this pair's 'x' and 'y' to 0, and returns a new ValuePair(0,0).
        // Can be used on an existing ValuePair to set its values to 0, or
        // can be used when creating a new ValuePair who's values should be 0.
    Zero() {
        this.x = 0
        this.y = 0
        return new ValuePair(0,0)
    }

    // Adds the 'x' and 'y' of a ValuePair 'n' to the 'x' and 'y' respectively of this ValuePair.
    // A single number 'n' can be passed to be added to both the 'x' and 'y' of this ValuePair by 'n'.
    add(n) {
        if(n instanceof ValuePair) {
            this.x += n.x
            this.y += n.y
            return;
        }
        if(typeof n === 'number') {
            this.x += n
            this.y += n
            return;
        }
        throw new Error("Type error. Can only add numbers or a ValuePair via ValuePair.add(n)")
    }

    // Multiplies the 'x' and 'y' of a ValuePair 'n' to the 'x' and 'y' respectively of this ValuePair.
    // A single number 'n' can be passed to multiply both the 'x' and 'y' of this ValuePair by 'n'.
    multiply(n) {
        if(n instanceof ValuePair) {
            this.x *= n.x
            this.y *= n.y
            return;
        }
        if(typeof n === 'number') {
            this.x *= n
            this.y *= n
            return;
        }
        throw new Error("Type error. Can only multiply numbers or a ValuePair via ValuePair.multiply(n)")
    }
}