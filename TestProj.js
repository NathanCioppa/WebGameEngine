import { Projectile } from "./WebGameEngine/Types/Projectile.js";

export class TestProjectile extends Projectile {

    onHitEntity(entity) {
        console.log("hit")
        entity.kill()
    }

    onKill() {
        console.log("killed proj")
    }
}