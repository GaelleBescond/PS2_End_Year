import Weapon from "./gun.js";
class Rifle extends Weapon {

    constructor(scene, x, y) {
        super(scene, x, y, "gun");
    }

    init() {

        this.bulletVelocity = 1500;
        this.weaponWeight = 100;
        this.weaponCooldown = 100;
        this.weaponCanShoot = true;
        this.ammunition = 100
        this.projectilesPerShoot = 3;
        this.splashRadius = 0;
        this.splashDamage = 0;
    }

    initEvents() {

    }

    update() {

    }

}

export default Rifle;