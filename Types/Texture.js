export class Texture {
    constructor(imageSrc, width, height) {
        this.imageSrc = imageSrc
        // By providing just a 'width', 'height' will be set equal to 'width'; shorthand for making a square Texture.
        if(width != null && height == null) height = width
        this.width = width
        this.height = height
        
        this._useSrcSize = this.width == null && this.height == null
    }

    set imageSrc(value) {
        if(typeof value !== 'string') throw new Error("Type Error. 'imageSrc' must be a string.")
        
        const image = new Image()
        image.src = value
        image.onload = () => { this._imageSrc = value }
        image.onerror = () => { throw new Error(`'${value}' is not a path to a valid image file.`) }
        this._textureImage = image

    } get imageSrc() {return this._imageSrc}

    set textureImage(value) {
        throw new Error("Do not set the 'textureImage' of a 'Texture'. This will be set by the 'Texture' class using the path provided by 'imageSrc'.")
    } get textureImage() {return this._textureImage}

    set width(value) {
        if(typeof value !== 'number' && value != null) throw new Error("Type Error. 'width' must be a number, or null.")
        this._width = value
    } get width() {return this._width}

    set height(value) {
        console.log("called")
        if(typeof value !== 'number' && value != null) throw new Error("Type Error. 'height' must be a number, or null.")
        this._height = value
    } get height() {return this._height}

    // Determines whether the width and height of the source image of this texture will be used,
    // or if the set width and height values for this texture will be used, when the texture is rendered.
    // This setting may become irrelivent depending on the settings of the entity that the texture is applied to.
    // Additionally, its initialization depends on whether a width and height property are provided when a Texture is created.
    set useSrcSize(value) {
        if(typeof value !== 'boolean') throw new Error("Type Error. 'useSrcSize' must be a boolean.")
        this._useSrcSize = value
    } get useSrcSize() {return this._useSrcSize}
}