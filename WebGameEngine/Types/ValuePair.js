
// A type that contains a pair of two number values: 'x' and 'y'.
// If 'x' and 'y' are both null or undefined, they will be set to zero.
    // If 'x' is passed and 'y' is null or undefined, both 'x' and
    // 'y' will be set to the value of 'x'. 
    // ex. new ValuePair(2) will create ValuePair(2,2), makes it easy
    // to create a ValuePair of equal 'x' and 'y'
export class ValuePair {
    constructor(x,y) {
        if(x == null && y == null) return this.Zero();
        if(y == null) y = x;

        // Sets 'this.x' and 'this.y' instead of setting 'this._x' and 'this._y' so that types are checked by 'set' methods
        this.x = x
        this.y = y
    }

    

    // 'set' methods insure that the set value is of the correct type.
    // 'this._x' and 'this._y' should only be explicitly set if type checking has already been completed. 
    // 'this._x' and 'this._y' should almost never be set outside this class. Set 'this.x' and 'this.y' instead. 
    
    set x(value) {
        if(typeof value !== 'number') throw new Error("Type Error. 'x' must be a number")
        this._x = value
    } get x() {return this._x}

    set y(value) {
        if(typeof value !== 'number') throw new Error("Type Error. 'y' must be a number")
        this._y = value
    } get y() {return this._y}



    // Sets this pair's 'x' and 'y' to 0, and returns a new ValuePair(0,0).
        // Can be used on an existing ValuePair to set its values to 0, or
        // can be used when creating a new ValuePair who's values should be 0.
    Zero() {
        this._x = 0
        this._y = 0
        return new ValuePair(0,0)
    }

    // Adds the 'x' and 'y' of a ValuePair 'n' to the 'x' and 'y' respectively of this ValuePair.
    // A single number 'n' can be passed to be added to both the 'x' and 'y' of this ValuePair by 'n'.
    add(n) {
        if(n instanceof ValuePair) {
            this._x += n.x
            this._y += n.y
            return;
        }
        if(typeof n === 'number') {
            this._x += n
            this._y += n
            return;
        }
        throw new Error("Type error. Can only add a number or a ValuePair via ValuePair.add(n)")
    }

    // Multiplies the 'x' and 'y' of a ValuePair 'n' to the 'x' and 'y' respectively of this ValuePair.
    // A single number 'n' can be passed to multiply both the 'x' and 'y' of this ValuePair by 'n'.
    multiply(n) {
        if(n instanceof ValuePair) {
            this._x *= n.x
            this._y *= n.y
            return;
        }
        if(typeof n === 'number') {
            this._x *= n
            this._y *= n
            return;
        }
        throw new Error("Type error. Can only multiply by a number or a ValuePair via ValuePair.multiply(n)")
    }

    Clone() { return new ValuePair(this._x, this._y) }
}
