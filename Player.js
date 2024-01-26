import { Entity } from "./WebGameEngine/Types/Entity.js"

export class Player extends Entity {
    constructor(position, texture) {
        super(position, texture)
        
        this.width = 100
        this.height = 50
        this.fillColor = 'orange'
        this.forceTextureFit = true
    }



    hasStopped = false
    ai() {
        
        if(this.velocity.x > -5 && !this.hasStopped)
        this.velocity.add(-0.25)
        else {this.velocity.Zero(); this.hasStopped = true}

    }

    onKill() {
        console.log("Killed Player")
    }
}