import { ExampleEntity } from "./Entities/ExampleEntity.js";
import { ValuePair } from "./WebGameEngine/Types/ValuePair.js";
import { Canvas } from "./WebGameEngine/engine.js";

// Create a new instance of an Entity.
// ExampleEntity is an extension of the Entity class.
// Its constructor takes just the 'position' property. Everything else is set in the ExampleEntity class. 
let example = new ExampleEntity(
    new ValuePair((Canvas.width/2), Canvas.height/2) // 'position' is a ValuePair, which stores the x and y positions in one object. 
)

// Adjust the position of 'example' so it is drawn exactly in the center, now that its width and height have been set. 
// There are more ways to do this, but this gives an example of how 'add()' can be used on ValuePairs. 
example.position.add(new ValuePair(-example.width/2, -example.height/2))



export function play() {

}