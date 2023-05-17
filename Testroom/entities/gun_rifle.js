import Weapon from "./gun.js";
class Rifle extends Weapon {

    constructor(scene, x, y) {
        super(scene, x, y, "gun");
    }

    init() {
        this.bulletVelocity = 2500;
        this.damage= 1;
        this.weaponCooldown = 100;
        this.weaponCanShoot = true;
        this.ammunition = 300
        this.projectilesPerShoot = 3;
        this.splashRadius = 0;
        this.splashDamage = 0;
        this.camZoom = 0.55;
    }

    initEvents() {

    }

    update() {

    }

}

export default Rifle;