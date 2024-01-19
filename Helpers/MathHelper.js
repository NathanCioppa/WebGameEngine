export function degreesToRadians(degrees) {
    if(typeof degrees !== 'number') throw new Error("Type Error. 'degrees' must be a number.")
    return degrees * (Math.PI / 180)
}

export function radiansToDegrees(radians) {
    if(typeof degrees !== 'number') throw new Error("Type Error. 'radians' must be a number.")
    return radians * (180 / Math.PI)
}