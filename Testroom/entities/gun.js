class Weapon extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "gun");
        scene.add.existing(this); //Add object to scene
        this.init();
        this.initEvents();
    }

    init() {

        this.bulletVelocity = 1500;
        this.weaponWeight = 100;
        this.weaponCooldown = 100;
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() { }

    shoot() {
        this.ammunition -= 1;
    }

    getBulletVelocity() {
        return this.bulletVelocity
    }

    getWeight() {
        return this.weaponWeight
    }

    getCooldown() {
        return this.weaponCooldown
    }

    getAmmo() {
        return this.ammunition
    }

}

export default Weapon;