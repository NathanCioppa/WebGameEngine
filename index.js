import { Entity } from "./WebGameEngine/Types/Entity.js"
import { ValuePair } from "./WebGameEngine/Types/ValuePair.js"
import { Texture } from "./WebGameEngine/Types/Texture.js"
import { AnimatedTexture } from "./WebGameEngine/Types/AnimatedTexture.js"
import { counter } from "./WebGameEngine/engine.js"
import { Player } from "./Player.js"
import { Enemy } from "./Enemy.js"




let texture = new Texture("../Images/TestTexture.png")

let enemy = new Enemy(new ValuePair(300,0), texture)

let testAnimation = new AnimatedTexture('../Images/TestAnimatedTexture.png', 10)
let j = new Entity(new ValuePair(50, 400), testAnimation)
j.currentAnimationFrame = 1
j.animationDelay = 20

let p = new Player(new ValuePair(300, 300), texture)



export function play() {

    if(counter % 250 == 0) {
        enemy.velocity.multiply(-1)
    }

}