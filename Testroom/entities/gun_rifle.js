import Weapon from "./gun.js";
class Rifle extends Weapon {

    constructor(scene, x, y) {
        super(scene, x, y, "gun");
    }

    init() {
        this.bulletVelocity = 2500;
        this.damage = 1;
        this.consumption = 10
        this.weaponCooldown = 100;
        this.weaponCanShoot = true;
        this.projectilesPerShoot = 3;
        this.camZoom = 0.55;
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {

    }

}

export default Rifle;