class Weapon extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "gun");
        scene.add.existing(this); //Add object to scene
        this.setPipeline('Light2D');
        this.init();
        this.initEvents();
    }

    init() {

        this.bulletVelocity = 1500;
        this.weaponWeight = 100;
        this.weaponCooldown = 100;
        this.weaponCanShoot = true;
        this.ammunition = 100
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

}

export default Weapon;