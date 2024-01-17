
export class ValuePair {
    constructor(x,y) {
        if(x !== undefined)
        this.x = x
        if(y !== undefined)
        this.y = y
    }

    Zero() {
        this.x = 0
        this.y = 0
        return new ValuePair(0,0)
    }

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