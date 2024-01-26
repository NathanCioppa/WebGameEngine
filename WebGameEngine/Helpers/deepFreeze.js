export function deepFreeze(object) {
    const propertyNames = Reflect.ownKeys(object);
  
    for (const name of propertyNames) {
      const value = object[name];
  
      if ((value && typeof value === "object") || typeof value === "function")
        deepFreeze(value);
    }

    return Object.freeze(object);
}