import { Entity } from "./Entity.js";
import { ValuePair } from "./ValuePair.js";

export class Projectile extends Entity {
    constructor(owner, position, texture, width, height, velocity, lifetime) {
        super(position, texture, width, height)

        if(!(owner instanceof Entity) && owner != null) {throw new Error("Type Error. 'owner' must be of type 'Entity' or null.")}
        this._owner = owner
        this.velocity = velocity
        this.lifetime = lifetime
    }



    // 'owner' is the Entity that this Projectile was spawned by. It may be null, meaning this Projectile
    // was not spawned by an Entity, or the Entity was not passed as this Projectile's owner.
    // It is used to keep track of which Entity spawned this projectile, for implementing 
    // behaviors such as not calling this Projectile's 'onEntityCollide()' function if 
    // this Projectile collides with its owner. 
    set owner(valueNotRecommended) {
        throw new Error("It is not recommended to set 'owner'. This is set when the Projectile is created in order to keep track of where it came from. To bypass this anyway, set '_owner' directly.")
    } get owner() {return this._owner}



    // If true, then the Projectile will call its 'onEntityCollide()' function if it hits its owner.
    _canHitOwner = false
    set canHitOwner(value) {
        if(typeof value !== 'boolean') {throw new Error("Type Error. 'canHitOwner' must be a boolean.")}
        this._canHitOwner = value
    } get canHitOwner() {return this._canHitOwner}

    // If true, then this Projectile will call its 'onEntityCollide' function if it collides with a Projectile. 
    _canHitOtherProjectile = false
    set canHitOtherProjectile(value) {
        if(typeof value !== 'boolean') {throw new Error("Type Error. 'canHitOtherProjectile' must be a boolean.")}
        this._canHitOtherProjectile = value
    } get canHitOtherProjectile() {return this._canHitOtherProjectile}



    // The number of ticks that this Projectile will exist for before it is killed. 
    set lifetime(value) {
        if(typeof value !== 'number') {throw new Error("Type Error. 'lifetime' must be a number.")}
        this._lifetime = value
    } get lifetime() {return this._lifetime}



    // By default, a Projectile will be killed when it hits another Entity. 'penetration' is the
    // number of times this projectile can hit an Entity without being killed. 
    _penetration = 0
    set penetration(value) {
        if (typeof value !== 'number') throw new Error("Type Error. 'penetration' must be a number.")
        this._penetration = value
    } get penetration() { return this._penetration }

    _infinitePenetration = false
    set infinitePenetration(value) {
        if (typeof value !== 'boolean') throw new Error("Type Error. 'infinitePenetration' must be a boolean.")
        this._infinitePenetration = value
    } get infinitePenetration() {return this._infinitePenetration}
 
    _draw() {
        if(this.lifetime <= 0) this.kill()
        this.lifetime--
        super._draw()
    }

    onEntityCollide(entity) {
        if(!this.canHitOwner && entity === this.owner) return
        if(!this.canHitOtherProjectile && entity instanceof Projectile) return

        this.onHitEntity(entity)
        this.penetration--
        if(this.penetration < 0 && !this.infinitePenetration) this.kill()
    }

    // Defines custom behaviors for extensions of the Projectile class when a Projectile
    // collides with another Entity. 
    onHitEntity(entity) {}
}