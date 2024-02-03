import { Projectile } from "./Types/Projectile.js"

export const Canvas = document.querySelector('#main-canvas')
Canvas.width = Canvas.clientWidth
Canvas.height = Canvas.clientHeight
const CanvasContext = Canvas.getContext('2d')
export {CanvasContext}



export let things = {
  entities: []
}


let refreshInterval
export let counter = 0

// Loops to make the game play.
function enginePlay() {
    prePlay()
    play()
    postPlay()
}

// Any actions to take before 'play()' is run.
function prePlay() {
  CanvasContext.clearRect(0,0,500,500)
  counter++
  
  // Checks for collisions between entities, then calls the Entity's 'onEntityCollide()' function if there is a collision.
  for(let i=0; i<things.entities.length; i++) {
    const entity = things.entities[i]

    things.entities.map(checkEntity => {
      if(entity.index === checkEntity.index) return
      let entitiesColliding = (entity.position.x + entity.width >= checkEntity.position.x && entity.position.x <= checkEntity.position.x + checkEntity.width) && (entity.position.y + entity.height >= checkEntity.position.y && entity.position.y <= checkEntity.position.y + checkEntity.height)
      if(!entitiesColliding) return
      
      if(checkEntity instanceof Projectile && !entity.canHitProjectiles) {return} 
      if(checkEntity instanceof Projectile && checkEntity.owner === entity && !entity.canHitOwnedProjectiles) return

      entity.onEntityCollide(checkEntity)
      
    })
  }
}

// Any action to take after 'play()' is run.
function postPlay() {
  for(let i=0; i<things.entities.length; i++) {
    const entity = things.entities[i]

    // Removes dead entities from the 'things.entities' array, and adjusts 'i' so that the rest of the entities are indexed correctly.
    if(entity.isDead) {
      things.entities.splice(i,1)
      i--
      continue
    }

    entity.index = i
    entity.position.add(entity.velocity)
    entity.rotation += entity.rotationSpeed
    entity._draw()
  }
}



let play = () => {}

import("../index.js")
.then((module) => {
  play = () => module.play()
  refreshInterval = setInterval(enginePlay, 16)
})
.catch((error) => {
  console.error("Error importing index.js:", error);
});