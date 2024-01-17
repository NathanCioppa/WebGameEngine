import { ValuePair } from "./valuePair.js"
import { things } from "../index.js"
import  * as Tests  from "./Tests.js"
import { CanvasContext } from "../index.js"

export class Entity {
    constructor(position, width, height, velocity) {
        Tests.checkType(position, Tests.RequiredType.Position)
        Tests.checkType(velocity, Tests.RequiredType.Velocity)

        this.position = position
        this.width = width
        this.height = height
        this.velocity = velocity
        this.index = things.entities.length
        
        things.entities.push(this)
    }
    draw() {
        return CanvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    
}