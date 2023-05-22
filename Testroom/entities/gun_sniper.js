import Weapon from "./gun.js";
class Sniper extends Weapon {

    constructor(scene, x, y) {
        super(scene, x, y, "gun");
    }

    init() {
        this.bulletVelocity = 4500;
        this.damage = 5;
        this.consumption = 10
        this.weaponCooldown = 200;
        this.weaponCanShoot = true;
        this.projectilesPerShoot = 1;
        this.camZoom = 0.25;

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {

    }

}

export default Sniper;