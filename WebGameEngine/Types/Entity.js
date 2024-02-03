import { ValuePair } from "./ValuePair.js"
import { things } from "../engine.js"
import { CanvasContext } from "../engine.js"
import { Texture } from "./Texture.js"
import { AnimatedTexture } from "./AnimatedTexture.js"

// Entity is a class that represents just about anything that is drawn to the canvas. 
// It is designed so that things drawn onto the canvas can be extensions of this class,
// thus giving just about everything on the canvas at least some identical attributes
// so that it is easy to define behaviors and allow things to interact with each-other. 
export class Entity {
    constructor(position, texture, width, height) {
        // Sets 'this.property' instead of 'this._property' so that types are checked.
        this.position = position ?? new ValuePair().Zero()
        this.texture = texture
        this.width = width
        this.height = height
        this.velocity = new ValuePair().Zero()

        this._currentAnimationFrame = 0
        this._animationDelay = 0

        this.index = things.entities.length
        things.entities.push(this)
    }



    // 'set' methods insure that the set value is of the correct type.
    // 'this._property' should only be explicitly set if type checking has already been completed.
    // 'this._property' should almost never be set outside this class. Set 'this.property' instead. 

    set position(value) {
        if(!(value instanceof ValuePair)) throw new Error("Type Error. 'position' must be of type 'ValuePair'.")
        this._position = value == null ? new ValuePair().Zero() : value.Clone()
    } get position() {return this._position}



    // The Texture / image that will be drawn over this Entity.
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

    // The x and y value that the Texture will be offset from the top left corner of the Entity when it is drawn.
    set textureOffset(value) {
        if(!(value instanceof ValuePair) && value != null) throw new Error("Type Error. 'texture' must be of type 'ValuePair' or null.")
        this._textureOffset = value == null ? new ValuePair().Zero() : value.Clone()
    } get textureOffset() { return this._textureOffset ?? (this._textureOffset = new ValuePair().Zero())}



    // If no 'width' or 'height' is set (ie, they are null/undefined), the 'width' or 'height' 
    // being used by the Texture will be used. If one of those values are null, the 'natural'
    // value of that Texture's image will be used. These will also be used if the Texture's 
    // 'useSrcSize' property is true. Otherwise, the set 'width' and 'height' values will be used.

    // Note that if this Entity's 'forceTextureFit' property is 'true', then the above will be irrelevant,
    // and the Texture will be drawn to fit over the Entity's 'width' and 'height'.
    set width(value) {
        if(typeof value !== 'number' && value != null) throw new Error("Type Error. 'width' must be a number or null.")
        this._width = value
    } get width() {
        return this._forceTextureFit
        ? this._width ?? 0
        : this._width ?? this.texture.width
    }

    // A different height value must be defaulted to if the Entity's height is null, and its texture
    // is an AnimationTexture. This is because getting an AnimationTexture's 'naturalHeight' will 
    // return the height of the entire animation sheet, when we actually just need the height of its frames.
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



    // A ValuePair that indicates how much the Entity's X and Y position will be
    // incremented by on each tick of the 'draw()' function.
    // ie. the Entity's X position will be incremented by 'velocity.x'; Y by 'velocity.y'
    set velocity(value) {
        if(!(value instanceof ValuePair)) throw new Error("Type Error. 'velocity' must be of type 'ValuePair'.")
        this._velocity = value == null ? new ValuePair().Zero() : value.Clone()
    } get velocity() {return this._velocity}



    // The angle, in radians, that this Entity will be rotated around its center when it is drawn.
    // Use positive values for clockwise rotations; negative for counter-clockwise.
    set rotation(value) {
        if(typeof value !== 'number') throw new Error("Type Error. 'rotation' must be a number.")
        this._rotation = value
    } get rotation() {return this._rotation ?? 0}

    // The angle, in radians, that this Entity's rotation will be increased by every drawTick.
    // A positive value will make the Entity spin clockwise; negative for counter-clockwise.
    set rotationSpeed(value) {
        if(typeof value !== 'number') throw new Error("Type Error. 'rotationSpeed' must be a number.")
        this._rotationSpeed = value
    } get rotationSpeed() {return this._rotationSpeed ?? 0}



    // The color to fill the space that this Entity is taking up. This will display under the Texture. 
    // Any string that is not valid as a color will make the fill transparent.
    set fillColor(value) {
        if(typeof value !== 'string' && value != null) throw new Error("Type Error. 'fillColor' must be a string.")
        this._fillColor = value
    } get fillColor() {return this._fillColor}



    // If the value of the 'currentAnimationFrame' is ever set to less than 0, or greater than the 
    // index of the highest frame, it is set to 0. Accessing 'texture.frames[currentAnimationFrame]'
    // will return the Y value of the frame that is currently being played.
    set currentAnimationFrame(value) {
        if(typeof value !== 'number') throw new Error("Type Error. 'currentAnimationFrame' must be a number.")
        if((this.texture.frames != null && value >= this.texture.frames.length) || value < 0) value = 0
        this._currentAnimationFrame = value
    } get currentAnimationFrame() { return this._currentAnimationFrame }

    // The number of ticks to wait before the animation moves to the next frame, if this value is not 0.
    // If this value is not 0, the animation will constantly loop through all frames. 
    // If it is 0, then the animation will not change frames until you set 'currentAnimationFrame' yourself. 
    set animationDelay(value) {
        if(typeof value !== 'number') throw new Error("Type Error. 'animationDelay' must be a number.")
        this._animationDelay = value
    } get animationDelay() { return this._animationDelay }



    // If true, this Entity will call it's 'onEntityCollide()' function on projectiles that it hits.
    _canHitProjectiles = false
    set canHitProjectiles(value) {
        if (typeof value !== 'boolean') throw new Error("Type Error. 'canHitProjectile' must be a boolean")
        this._canHitProjectiles = value
    } get canHitProjectiles() { return this._canHitProjectiles }



    // If true, this Entity will call it's 'onEntityCollide()' function on projectiles that it owns. 
    _canHitOwnedProjectiles = false
    set canHitOwnedProjectiles(value) {
        if(typeof value !== 'boolean') throw new Error("Type Error. 'canHitOwnedProjecties' must be a boolean")
        this._canHitOwnedProjectiles = value
    } get canHitOwnedProjectiles() { return this._canHitOwnedProjectiles }



    // If 'isDead' is 'true', then this Entity will be removed from 'things.entities' on the
    // next call of the 'postPlay()' function inside of 'engine.js'.
    _isDead = false
    set isDead(value) {
        if(typeof value !== 'boolean') throw new Error("Type Error. 'isDead' must be a boolean.")
        this._isDead = value
    } get isDead() { return this._isDead }



    // Tracks how many times this Entity's '_draw()' function has run. It is incremented at the end of each function call.
    set drawTick(valueNotRecommended) {
        throw new Error("It is not recommended to set the value of 'drawTick'. This is incremented by the Entity's 'draw()' function to keep track of how many times the Entity's draw loop has completely run. If you would like to bypass this anyway, set '_drawTick'.")
    } get drawTick() { return this._drawTick }


    _drawTick = 0
    _draw() {
        this.ai()
        CanvasContext.beginPath()
        CanvasContext.fillStyle = this._fillColor ?? 'transparent'

        if(this.rotation !== 0) {
            CanvasContext.translate((this._position.x)+(this.width/2), (this._position.y)+(this.height/2))
            CanvasContext.rotate(this.rotation)
            CanvasContext.translate(-((this._position.x)+(this.width/2)),-((this._position.y)+(this.height/2)))
        }
        
        CanvasContext.fillRect(this._position.x, this._position.y, this.width, this.height)

        const texture = this.texture

        if(texture == null) return this._endDraw()

        if(texture instanceof AnimatedTexture) {
            
            if(this._forceTextureFit) {
                CanvasContext.drawImage(texture.textureImage, 0, texture.frames[this.currentAnimationFrame], texture.textureImage.naturalWidth, texture.frameHeight, this.position.x + this.textureOffset.x, this.position.y + this.textureOffset.y, this.width, this.height)
            } else if (texture.useSrcSize) {
                CanvasContext.drawImage(texture.textureImage, 0, texture.frames[this.currentAnimationFrame], texture.textureImage.naturalWidth, texture.frameHeight, this.position.x + this.textureOffset.x, this.position.y + this.textureOffset.y, texture._textureImage.width, texture.frameHeight)
            } else {
                CanvasContext.drawImage(texture.textureImage, 0, texture.frames[this.currentAnimationFrame], texture.textureImage.naturalWidth, texture.frameHeight, this.position.x + this.textureOffset.x, this.position.y + this.textureOffset.y, texture._width ?? texture._textureImage.width, texture._height ?? texture.frameHeight)
            }

            this.currentAnimationFrame = this._drawTick % this.animationDelay === 0 
            ? this.currentAnimationFrame + 1 
            : this.currentAnimationFrame

            return this._endDraw()
        }

        if(this._forceTextureFit) {
            CanvasContext.drawImage(texture.textureImage, this.position.x + this.textureOffset.x, this.position.y + this.textureOffset.y, this._width, this._height)
        } 
        else if (texture.useSrcSize) {
            CanvasContext.drawImage(texture.textureImage, this.position.x + this.textureOffset.x, this.position.y + this.textureOffset.y)
        } else {
            CanvasContext.drawImage(texture.textureImage, this.position.x + this.textureOffset.x, this.position.y + this.textureOffset.y, texture._width ?? texture._textureImage.width, texture._height ?? texture._textureImage.height)
        }
        
        this._endDraw()
    }

    // Use this as the return value whenever the '_draw()' function needs to end. 
    // Code inside this function should always be run at the end of the '_draw()' function
    _endDraw() {
        CanvasContext.resetTransform()
        CanvasContext.stroke()
        this._drawTick++
    }

    // Called in engine.js whenever this Entity collides with another. 'entity' is the Entity that this Entity collided with.
    // Add this function to extensions of the Entity class to define what should happen when it collides with an Entity.
    onEntityCollide(entity) {}


    // Called on every tick of this Entity's '_draw()' function before this Entity is drawn.
    // Add this function to extensions of the Entity class to define behaviors of this Entity. 
    ai() {}

    // Called when this Entity "dies" / should be removed from the 'things.entities' array.
    // After this Entity's '_isDead' is set to true, its 'onKill()' function is run.
    // Add the 'onKill()' function to extensions of the Entity class to make things
    // happen when the Entity is "killed".
    kill() {
        this._isDead = true
        this.onKill()
    }
    onKill() {}
}
