import Weapon from "./gun.js";
class Sniper extends Weapon {

    constructor(scene, x, y) {
        super(scene, x, y, "gun");
    }

    init() {
        this.bulletVelocity = 3500;
        this.weaponWeight = 100;
        this.weaponCooldown = 100;
        this.weaponCanShoot = true;
        this.ammunition = 10;
        this.projectilesPerShoot = 1;

    }

    initEvents() {

    }

    update() {

    }

}

export default Sniper;