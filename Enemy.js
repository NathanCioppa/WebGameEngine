import { Entity } from "./WebGameEngine/Types/Entity.js"

export class Enemy extends Entity {
    constructor(position, texture) {
        super(position, texture)
        
        this.width = 50
        this.height = 50
        this.fillColor = 'red'
        this.velocity.y = 1
        this.forceTextureFit = true
        this.rotationSpeed = 0.1
    }



    onEntityCollide(entity) {
        entity.kill()
    }
}