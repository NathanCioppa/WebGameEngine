import { ValuePair } from "./ValuePair.js"
import { things } from "../index.js"
import { CanvasContext } from "../index.js"
import { deepFreeze } from "../Helpers/deepFreeze.js"
import { Texture } from "./Texture.js"
import { AnimatedTexture } from "./AnimatedTexture.js"

const EntityConstants = {
    
}
deepFreeze(EntityConstants)
export {EntityConstants}



export class Entity {
    constructor(position, texture, width, height, velocity) {
        // Sets 'this.property' instead of 'this._property' so that types are checked.
        this.position = position ?? new ValuePair().Zero()
        this.texture = texture
        this.width = width
        this.height = height
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
        if(!(value instanceof Texture) && value != null) throw new Error("Type Error. 'texture' must be of type 'Texture' or null.")
        this._texture = value
    } get texture() {return this._texture}



    // If true, Texture 'width', 'height', and 'useSrcSize' will be ignored, and the Texture will be forced match the Entity's 'width' and 'height'.
    // If true, and this Entity's 'width' or 'height' are null, each null dimension will return '0'.
    _forceTextureFit = false
    set forceTextureFit(value) {
        if(typeof value !== 'boolean') throw new Error("Type Error. 'forceTextureFit' must be a boolean.")
        this._forceTextureFit = value
    } get forceTextureFit() {return this._forceTextureFit}

    set velocity(value) {
        if(!(value instanceof ValuePair)) throw new Error("Type Error. 'velocity' must be of type 'ValuePair'.")
        this._velocity = value
    } get velocity() {return this._velocity}



    // If no 'width' or 'height' is set (ie, they are null/undefined), the 'width' or 'height' 
    // being used by the Texture will be used. If one of those values are null, the 'natural'
    // value of that Texture's image will be used. These will also be used if the Texture's 
    // 'useSrcSize' property is true. Otherwise, the set 'width' and 'height' values will be used.

    // Note that if this Entity's 'forceTextureFit' property is 'true', then the above will be irrelivent,
    // and the Texture will be drawn to fit over the Entity's 'width' and 'height'.
    set width(value) {
        if(typeof value !== 'number' && value != null) throw new Error("Type Error. 'width' must be a number or null.")
        this._width = value
    } get width() {
        return this._forceTextureFit
        ? this._width ?? 0
        : this._width ?? this.texture.width
    }

    set height(value) {
        if(typeof value !== 'number' && value != null) throw new Error("Type Error. 'height' must be a number or null.")
        this._height = value
    } get height() {
        if(this.texture instanceof AnimatedTexture) {
            return this._forceTextureFit
            ? this._height ?? 0
            : this._height ?? this.texture.height
        }
        return this._forceTextureFit
        ? this._height ?? 0
        : this._height ?? this.texture.height
    }



    // The angle, in radians, that this Entity will be rotated around its center when it is drawn.
    // Use positive values for clockwise rotations; negaitve for counter-clockwise.
    set rotation(value) {
        if(typeof value !== 'number') throw new Error("Type Error. 'rotation' must be a number.")
        this._rotation = value
    } get rotation() {return this._rotation ?? 0}

    // The angle, in radians, that this Entity's rotation will be increased by every tick.
    // A positive value will make the Entity spin clockwise; negative for counter-clockwise.
    set rotationSpeed(value) {
        if(typeof value !== 'number') throw new Error("Type Error. 'rotationSpeeed' must be a number.")
        this._rotationSpeed = value
    } get rotationSpeed() {return this._rotationSpeed ?? 0}



    // The color to fill the space that this Entity is taking up. This will display under the Texture. 
    // Any string that is not valid as a color will make the fill transparent.
    set fillColor(value) {
        if(typeof value !== 'string' && value != null) throw new Error("Type Error. 'fillColor' must be a string.")
        this._fillColor = value
    } get fillColor() {return this._fillColor}


    //TODO: make these into properties
    frame = 0
    animationDelay = 10
    tick = 0
    draw() {
        this.tick++
        CanvasContext.beginPath()
        CanvasContext.fillStyle = this._fillColor ?? 'transparent'

        if(this.rotation !== 0) {
            CanvasContext.translate((this._position.x)+(this.width/2), (this._position.y)+(this.height/2))
            CanvasContext.rotate(this.rotation)
            CanvasContext.translate(-((this._position.x)+(this.width/2)),-((this._position.y)+(this.height/2)))
        }
        
        CanvasContext.fillRect(this._position.x, this._position.y, this.width, this.height)

        const texture = this.texture

        if(texture == null) {
            CanvasContext.resetTransform()
            CanvasContext.stroke()
            return
        }

        if(texture instanceof AnimatedTexture) {
            

            if(this._forceTextureFit) {
                CanvasContext.drawImage(texture.textureImage, 0, texture.frames[this.frame], texture.textureImage.naturalWidth, texture.frameHeight, this.position.x, this.position.y, this.width, this.height)
            } else if (texture.useSrcSize) {
                CanvasContext.drawImage(texture.textureImage, 0, texture.frames[this.frame], texture.textureImage.naturalWidth, texture.frameHeight, this.position.x, this.position.y, texture._textureImage.width, texture.frameHeight)
            } else {
                CanvasContext.drawImage(texture.textureImage, 0, texture.frames[this.frame], texture.textureImage.naturalWidth, texture.frameHeight, this.position.x, this.position.y, texture._width ?? texture._textureImage.width, texture._height ?? texture.frameHeight)
            }
            
            CanvasContext.resetTransform()
            CanvasContext.stroke()

            //TODO: make these into properties
            if(this.tick % this.animationDelay === 0)this.frame++
            if(this.frame >= texture.frames.length) this.frame = 0
            return

        }

        if(this._forceTextureFit) {
            CanvasContext.drawImage(texture.textureImage, this._position.x, this._position.y, this._width, this._height)
        } 
        else if (texture.useSrcSize) {
            CanvasContext.drawImage(texture.textureImage, this._position.x, this._position.y)
        } else {
            CanvasContext.drawImage(texture.textureImage, this._position.x, this._position.y, texture._width ?? texture._textureImage.width, texture._height ?? texture._textureImage.height)
        }
        
        CanvasContext.resetTransform()
        CanvasContext.stroke()
    }
}