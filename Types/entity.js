import { ValuePair } from "./ValuePair.js"
import { things } from "../index.js"
import { CanvasContext } from "../index.js"
import { deepFreeze } from "../Helpers/deepFreeze.js"

const EntityConstants = {
    
}
deepFreeze(EntityConstants)
export {EntityConstants}



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

    // The angle, in radians, that this entity will be rotated around its center when it is drawn.
    // Use positive values for clockwise rotations; negaitve for counter-clockwise.
    set rotation(value) {
        if(typeof value !== 'number') throw new Error("Type Error. 'rotation' must be a number")
        this._rotation = value
    } get rotation() {return this._rotation ?? 0}

    // The angle, in radians, that this entity's rotation will be increased by every tick.
    // A positive value will make the entity spin clockwise; negative for counter-clockwise.
    set rotationSpeed(value) {
        if(typeof value !== 'number') throw new Error("Type Error. 'rotationSpeeed' must be a number")
        this._rotationSpeed = value
    } get rotationSpeed() {return this._rotationSpeed ?? 0}



    draw() {
        if(this.rotation !== 0) {
            CanvasContext.translate((this.position.x)+(this.width/2), (this.position.y)+(this.height/2))
            CanvasContext.rotate(this.rotation)
            CanvasContext.translate(-((this.position.x)+(this.width/2)),-((this.position.y)+(this.height/2)))
        }
        
        CanvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
        CanvasContext.resetTransform();
    }
    
}