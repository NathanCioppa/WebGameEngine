import { ValuePair } from "./valuePair.js"

// Contains pairs of common attribute names and their required types.
    // ex. Position is commonly used when drawing objects and its type must be a ValuePair. 
    // So, Position is paired with ValuePair. When checking the type of a 'position' variable
    // (perhaps when creating an entity), it can be checked against RequiredType.Position
    // instead of remembering that a position variable should be of type ValuePair
export const RequiredType = {
    Position: ValuePair,
    Velocity: ValuePair
}

// Throws an error if 'check' is not an instance of 'type', the type being checked for.
export function checkType(check, type) {
    if (!(check instanceof type))
        throw new Error("Type Error")
}

// Returns the type that matched 'check', if any.
// Throws an error if 'check' is not an instance of any of the types inside 'types', an array of types.
export function checkTypes(check, types) {
    checkType(types, Array)

    for(let i=0; i<types.length; i++){
        if(check instanceof types[i])
            return types[i]
    }

    throw new Error("Type Error")
}