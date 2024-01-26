import { Entity } from "./Types/Entity.js"
import { ValuePair } from "./Types/ValuePair.js"
import { Texture } from "./Types/Texture.js"
import { AnimatedTexture } from "./Types/AnimatedTexture.js"
import { counter } from "./WebGameEngine/engine.js"
import { Player } from "./Player.js"



let texture = new Texture("../Images/TestTexture.png")
let testTexture = new Texture("../Images/TestTexture.png")

let player = new Entity(new ValuePair(10,10), texture, 100, 100, new ValuePair())
player.fillColor = "green"

let enemy = new Entity(new ValuePair(200, 10), texture, 50,50, new ValuePair(0,1))
enemy.rotationSpeed = 0.1
enemy.forceTextureFit = true
enemy.fillColor="red"

let test = new Entity(new ValuePair(20, 200), testTexture)
test.fillColor = "magenta"

let testAnimation = new AnimatedTexture('../Images/TestAnimatedTexture.png', 10)
let j = new Entity(new ValuePair(50, 400), testAnimation)
j.currentAnimationFrame = 1
j.animationDelay = 20

let p = new Player(new ValuePair(300, 300), texture)



export function play() {

    if(counter % 200 == 0) {
        player.velocity.multiply(-0.9)
        enemy.velocity.multiply(-1)
    }

}