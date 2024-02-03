import { Entity } from "./WebGameEngine/Types/Entity.js"


export class Player extends Entity {
    constructor(position, texture) {
        super(position, texture)
        
        this.width = 100
        this.height = 50
        this.fillColor = 'orange'
        this.forceTextureFit = true
    }



    
    ai() {
        
    }

    onKill() {
        console.log("Killed Player")
    }
}