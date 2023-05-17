class Weapon extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this); //Add object to scene
        //   this.setPipeline('Light2D');
        this.init();
        this.initEvents();
    }

    init() {
        this.bulletVelocity = 1500;
        this.weaponCooldown = 100;
        this.weaponCanShoot = true;
        this.ammunition = 100
        this.projectilesPerShoot = 1;
        this.splashRadius = 0;
        this.splashDamage = 0;
        this.camZoom = 1;
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

}

export default Weapon;