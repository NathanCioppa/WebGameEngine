import { Entity } from "./Types/Entity.js"
import { ValuePair } from "./Types/ValuePair.js"
import { degreesToRadians, radiansToDegrees } from "./Helpers/MathHelper.js"

const Canvas = document.querySelector('#main-canvas')
Canvas.width = Canvas.clientWidth
Canvas.height = Canvas.clientHeight
const CanvasContext = Canvas.getContext('2d')
export {CanvasContext}

let things = {
    entities: []
}
export {things}

let player = new Entity(new ValuePair(100,100), 100, 100, new ValuePair())
player.rotation = degreesToRadians(45)


let enemy = new Entity(new ValuePair(200, 10), 50,50, new ValuePair(0,1))
enemy.rotationSpeed = 0.1

let counter = 0
let refreshInterval = setInterval(play, 16)
function play() {
    counter++
    CanvasContext.clearRect(0,0,500,500)
    CanvasContext.beginPath()
    CanvasContext.fillStyle = 'red'
    
    CanvasContext.stroke()

    for(let i=0; i<things.entities.length; i++) {
        let entity = things.entities[i]
        entity.index = i
        entity.position.add(entity.velocity)
        entity.rotation += entity.rotationSpeed
        entity.draw()
    }

    if(counter % 200 == 0) {
        player.velocity.multiply(-0.9)
        enemy.velocity.multiply(-1)
    }

}