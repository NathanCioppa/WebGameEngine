export class Texture {
    constructor(imageSrc, width, height) {
        this.imageSrc = imageSrc
        this.width = width
        this.height = height
    }

    

    set imageSrc(value) {
        if(typeof value !== 'string') throw new Error("Type Error. 'imageSrc' must be a string.")
        
        const image = new Image()
        image.src = value
        image.onload = () => { this._imageSrc = value }
        image.onerror = () => { throw new Error(`'${value}' is not a path to a valid image file.`) }
        this._textureImage = image

    } get imageSrc() {return this._imageSrc}

    set textureImage(valueNotRecommended) {
        throw new Error("It is not recommended to set the 'textureImage' of a 'Texture'. This will be set by the 'Texture' class using the path provided by 'imageSrc'. If you would like to bypass this anyway, set the '_textureImage' property.")
    } get textureImage() {return this._textureImage}



    // Getter value for 'width' and 'height' depend on whether useSrcSize is true,
    // so accessing Texture.width will get the width that is actually being used. 
    // Additionally, a null 'width' or 'height' will use the natural value instead.
    // If you need to return the width value that has been explicitly set, get Texture._width directly. This may be null.
    set width(value) {
        if(typeof value !== 'number' && value != null) throw new Error("Type Error. 'width' must be a number, or null.")
        this._width = value
    } get width() {return this.useSrcSize 
        ? this._textureImage.naturalWidth 
        : this._width ?? this.textureImage.naturalWidth
    }

    // Same logic applies here as to 'width'
    set height(value) {
        if(typeof value !== 'number' && value != null) throw new Error("Type Error. 'height' must be a number, or null.")
        this._height = value
    } get height() {
        return this.useSrcSize 
        ? this._textureImage.naturalHeight 
        : this._width ?? this.textureImage.naturalHeight
    }

    // Determines whether the width and height of the source image of this texture will be used,
    // or if the set width and height values for this texture will be used, when the texture is drawn.
    // This setting may become irrelivent depending on the settings of the entity that the texture is applied to.
    // Setting both 'width' annd 'height' to null will use the natural dimensions anyway, but while this is 
    // 'true', the natural dimesions will always be used no matter what the set 'width' and 'height' for this texture are.
    _useSrcSize = false
    set useSrcSize(value) {
        if(typeof value !== 'boolean') throw new Error("Type Error. 'useSrcSize' must be a boolean.")
        this._useSrcSize = value
    } get useSrcSize() {return this._useSrcSize}
}