import { Entity } from "./Types/Entity.js"
import { ValuePair } from "./Types/ValuePair.js"
import { degreesToRadians } from "./Helpers/MathHelper.js"
import { Texture } from "./Types/Texture.js"
import { AnimatedTexture } from "./Types/AnimatedTexture.js"


const Canvas = document.querySelector('#main-canvas')
Canvas.width = Canvas.clientWidth
Canvas.height = Canvas.clientHeight
const CanvasContext = Canvas.getContext('2d')
export {CanvasContext}

let things = {
    entities: []
}
export {things}

let texture = new Texture("../Images/TestTexture.png")
let testTexture = new Texture("../Images/TestTexture.png")

let player = new Entity(new ValuePair(10,10), texture, 100, 100, new ValuePair())
player.fillColor = "green"

let enemy = new Entity(new ValuePair(200, 10), texture, 50,50, new ValuePair(0,1))
enemy.rotationSpeed = 0.1
enemy.forceTextureFit = true
enemy._fillColor="red"

let test = new Entity(new ValuePair(20, 200), testTexture)
test.fillColor = "magenta"

let testAnimation = new AnimatedTexture('../Images/TestAnimatedTexture.png', 10)
let j = new Entity(new ValuePair(50, 400), testAnimation)
//j.forceTextureFit = true
//j.fillColor = 'lime'
j.currentAnimationFrame = 1
j.animationDelay = 20

let counter = 0

let refreshInterval= setInterval(play, 16)
function play() {
    counter++
    CanvasContext.clearRect(0,0,500,500)


    for(let i=0; i<things.entities.length; i++) {
        let entity = things.entities[i]
        entity.index = i
        entity.position.add(entity.velocity)
        entity.rotation += entity.rotationSpeed
        entity._draw()
    }
    

    if(counter % 200 == 0) {
        player.velocity.multiply(-0.9)
        enemy.velocity.multiply(-1)
    }

}