import { Entity } from "./WebGameEngine/Types/Entity.js"
import { Projectile } from "./WebGameEngine/Types/Projectile.js"
import { ValuePair } from "./WebGameEngine/Types/ValuePair.js"

export class Enemy extends Entity {
    constructor(position, texture) {
        super(position, texture)
        
        this.width = 50
        this.height = 50
        this.fillColor = 'red'
        this.velocity.y = 0.5
        this.forceTextureFit = true
        //this.rotationSpeed = 0.1
    }

    ai() {
        if(this.drawTick === 0) {
            new Projectile(this, this.position, null, 5,5, this.velocity, 10000).fillColor = 'pink'
            
        }
    }

    onEntityCollide(entity) {
        //entity.kill()
    }
}