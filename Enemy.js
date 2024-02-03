import { Entity } from "./WebGameEngine/Types/Entity.js"
import { Projectile } from "./WebGameEngine/Types/Projectile.js"
import { ValuePair } from "./WebGameEngine/Types/ValuePair.js"
import { TestProjectile } from "./TestProj.js"

export class Enemy extends Entity {
    constructor(position, texture) {
        super(position, texture)
        
        this.width = 50
        this.height = 50
        this.fillColor = 'red'
        
        this.forceTextureFit = true
        this.canHitProjectiles = false
        this.canHitOwnedProjectiles = false
    }

    ai() {
        if(this.drawTick === 0) {
            let p = new TestProjectile(this, new ValuePair(this.position.x, this.position.y + 200), null, 5,5, new ValuePair(0,-3), 10000)
            p.fillColor = 'pink'
        }
    }

    onEntityCollide(entity) {
        //if(entity instanceof Projectile && entity.owner !== this)
        console.log(entity)
        entity.kill()
    }
}