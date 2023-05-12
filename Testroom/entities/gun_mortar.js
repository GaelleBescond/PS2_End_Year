import Weapon from "./gun.js";
class Mortar extends Weapon {

    constructor(scene, x, y) {
        super(scene, x, y, "gun");
    }

    init() {
        this.bulletVelocity = 700;
        this.weaponWeight = 100;
        this.weaponCooldown = 100;
        this.weaponCanShoot = true;
        this.ammunition = 10;
        this.projectilesPerShoot = 1;
        this.splashRadius = 0;
        this.splashDamage = 0;

    }

    initEvents() {

    }

    update() {

    }

}

export default Mortar;