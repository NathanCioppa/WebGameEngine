
const Canvas = document.querySelector('#main-canvas')
Canvas.width = Canvas.clientWidth
Canvas.height = Canvas.clientHeight
const CanvasContext = Canvas.getContext('2d')
export {CanvasContext}



let things = {
    entities: []
}
export {things}



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
    

    for(let i=0; i<things.entities.length; i++) {
        let entity = things.entities[i]
        entity.index = i
        entity.position.add(entity.velocity)
        entity.rotation += entity.rotationSpeed
        entity._draw()
    }
    
    
}

// Any action to take after 'play()' is run.
function postPlay() {

}



let play = () => {}

import("../index.js")
.then((module) => {
  play = () => module.play()
  refreshInterval= setInterval(enginePlay, 16)
})
.catch((error) => {
  console.error("Error importing index.js:", error);
});