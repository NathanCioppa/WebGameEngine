import { Texture } from "./Texture.js";

// An 'AnimatedTexture' is a 'Texture' which will play an animation. 
// An 'AnimatedTexture' is applied to an 'Entity' the same way a 'Texture' is. 
// To create an animation, all frames of the animation must be on one image file, 
// with each frame being separated by 2 pixels of empty space, vertically. All frames 
// should be the same height. Take note of that height, and set is as 'frameHeight' when 
// creating a new instance of the 'AnimatedTexture' class.
export class AnimatedTexture extends Texture {
    constructor(animationFramesSrc, frameHeight, width, height) {
        super(animationFramesSrc, width)
        this.height = height
        this.frameHeight = frameHeight

        this.textureImage.onload = () => { 
            this._frames = this.setAnimationFrames()
            Object.freeze(this._frames)
        }
    }



    // An array, who's length is the number of frames that this animation has. The animation's
    // frames are numbered from 0; meaning that to access the Y position that is being read from 
    // on a given frame, you can access 'frames[<frameNumber>]'.
        // ie. frames[0] gives the y coordinate being read from at the first frame; which should always be 0.
        // frames[1] gives the Y of the second frame, which should be 'this.frameHeight'+2.

    // 'this._frames' is frozen once the 'this.textureImage' (being the image with all frames of the animation) is loaded, and 'this.._frames' is initialized. 
    set frames(valueNotRecommended) {
        throw new Error("It is not recommended to set an AnimatedTexture's 'frames'. This is be set by the 'AnimatedTexture' class based on the image that is set by 'animationFramesSrc' when instance is created. If you would like to bypass this anyway, set the '_frames' property.")
    } get frames() { return this._frames }

    set frameHeight(value) {
        if(value == null) throw new Error("Type Error. 'frameHeight' cannot be null. It must be a number.")
        if(typeof value != 'number') throw new Error("Type Error. 'frameHeight' must be a number.")
        this._frameHeight = value
    } get frameHeight() { return this._frameHeight }



    set height(value) {
        if(typeof value !== 'number' && value != null) throw new Error("Type Error. 'height' must be a number, or null.")
        this._height = value
    }
    // Need to override the default behavior of getting 'height' from a texture, so that when no 'height'
    // is explicitly set, the 'frameHeight' will be used instead of the 'naturalHeight', because
    // 'naturalHeight' would be the height of the entire animation sheet.
    get height() {
        return this.useSrcSize 
        ? this.frameHeight
        : this._height ?? this.frameHeight
    }


    
    setAnimationFrames() {
        const NumberOfFrames = this.textureImage.naturalHeight / (this.frameHeight+2)
        let animationFrames = []
        for(let i=0; i<NumberOfFrames; i++) {
            animationFrames.push((this.frameHeight+2)*i)
        }
        return animationFrames
    }
}