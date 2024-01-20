import { ValuePair } from "./ValuePair.js"
import { things } from "../index.js"
import { CanvasContext } from "../index.js"
import { deepFreeze } from "../Helpers/deepFreeze.js"
import { Texture } from "./Texture.js"

const EntityConstants = {
    
}
deepFreeze(EntityConstants)
export {EntityConstants}



export class Entity {
    constructor(position, texture, width, height, velocity) {
        // Sets 'this.property' instead of 'this._property' so that types are checked.
        this.position = position ?? new ValuePair().Zero()
        this.texture = texture
        if(this._texture != null && width == null && height == null) {
            width = this._texture.width ?? this._texture.textureImage.width
            height = this._texture.height ?? this._texture.textureImage.height
        }
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
        if(!(value instanceof ValuePair)) throw new Error("Type Error. 'position' must be of type 'ValuePair'.")
        this._position = value
    } get position() {return this._position}

    set texture(value) {
        if(value == null) {
            this._texture = value
            return;
        }
        if(!(value instanceof Texture)) throw new Error("Type Error. 'texture' must be of type 'Texture'.")
        this._texture = value
    } get texture() {return this._texture}

    // If true, texture 'width', 'height', and 'useSrcSize' will be ignored, and the texture will be forced match the entity's 'width' and 'height'.
    _forceTextureFit = false
    set forceTextureFit(value) {
        if(typeof value !== 'boolean') throw new Error("Type Error. 'forceTextureFit' must be a boolean.")
        this._forceTextureFit = value
    } get forceTextureFit() {return this._forceTextureFit}

    set velocity(value) {
        if(!(value instanceof ValuePair)) throw new Error("Type Error. 'velocity' must be of type 'ValuePair'.")
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
        if(typeof value !== 'number') throw new Error("Type Error. 'rotation' must be a number.")
        this._rotation = value
    } get rotation() {return this._rotation ?? 0}

    // The angle, in radians, that this entity's rotation will be increased by every tick.
    // A positive value will make the entity spin clockwise; negative for counter-clockwise.
    set rotationSpeed(value) {
        if(typeof value !== 'number') throw new Error("Type Error. 'rotationSpeeed' must be a number.")
        this._rotationSpeed = value
    } get rotationSpeed() {return this._rotationSpeed ?? 0}

    // The color to fill the space that this entity is taking up. This will display under the texture. 
    // Any string that is not valid as a color will make the fill transparent.
    set fillColor(value) {
        if(typeof value !== 'string' && value != null) throw new Error("Type Error. 'fillColor' must be a string.")
        this._fillColor = value
    } get fillColor() {return this._fillColor}

    draw() {
        CanvasContext.beginPath()
        CanvasContext.fillStyle = this._fillColor ?? 'transparent'

        if(this.rotation !== 0) {
            CanvasContext.translate((this._position.x)+(this._width/2), (this._position.y)+(this._height/2))
            CanvasContext.rotate(this.rotation)
            CanvasContext.translate(-((this._position.x)+(this._width/2)),-((this._position.y)+(this._height/2)))
        }
        
        CanvasContext.fillRect(this._position.x, this._position.y, this._width, this._height)

        const texture = this.texture

        if(texture == null) {
            CanvasContext.resetTransform()
            CanvasContext.stroke()
            return
        }

        if(this._forceTextureFit) {
            CanvasContext.drawImage(texture.textureImage, this._position.x, this._position.y, this._width, this._height)
        } 
        else if (texture.useSrcSize) {
            CanvasContext.drawImage(texture.textureImage, this._position.x, this._position.y)
        } else {
            console.log(texture.width)
            CanvasContext.drawImage(texture.textureImage, this._position.x, this._position.y, texture._width ?? texture._textureImage.width, texture._height ?? texture._textureImage.height)
        }
        
        CanvasContext.resetTransform()
        CanvasContext.stroke()
    }
    
}