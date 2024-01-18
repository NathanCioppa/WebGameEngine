import { ValuePair } from "./ValuePair.js"
import { things } from "../index.js"
import { CanvasContext } from "../index.js"

export class Entity {
    constructor(position, width, height, velocity) {
        // Sets 'this.property' instead of 'this._property' so that types are checked.
        this.position = position ?? new ValuePair().Zero()
        this.width = width ?? 0
        this.height = height ?? 0
        this.velocity = velocity ?? new ValuePair().Zero()

        this.index = things.entities.length
        
        things.entities.push(this)
    }

    // 'set' methods insure that the set value is of the correct type.
    // 'this._property' should only be explicitly set if type checking has alredy been completed.
    // 'this._property' should almost never be set outside this class. Set 'this.property' instead. 

    set position(value) {
        if(!(value instanceof ValuePair)) throw new Error("Type Error. 'position' must be of type 'ValuePair'.");
        this._position = value
    } get position() {return this._position}

    set velocity(value) {
        if(!(value instanceof ValuePair)) throw new Error("Type Error. 'velocity' must be of type 'ValuePair'.");
        this._velocity = value
    } get velocity() {return this._velocity}

    set width(value) {
        if(typeof value !== 'number') throw new Error("Type Error. 'width' must be a number.")
        this._width = value
    } get width() {return this._width}

    set height(value) {
        if(typeof value !== 'number') throw new Error("Type Error. 'height' must be a number.")
        this._height = value
    } get height() {return this._height}


    
    draw() {
        return CanvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    
}