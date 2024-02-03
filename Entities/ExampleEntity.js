import { Entity } from "../WebGameEngine/Types/Entity.js"
import { testTexture } from "./textures.js"
import { degreesToRadians } from "../WebGameEngine/Helpers/MathHelper.js"

export class ExampleEntity extends Entity {
    constructor(position) {
        super(position, testTexture)

        this.width = 100
        this.height = 100
        this.rotationSpeed = 0.005
        this.forceTextureFit = true
    }

    // Causes the Entity to rotate back and forth. 
    ai() {
        if(Math.abs(this.rotation) > degreesToRadians(30)) {
            this.rotationSpeed *= -1
        }
    }
}