class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "enemy");
        scene.add.existing(this); //Add object to scene
        scene.physics.add.existing(this); //Gives physics.body 
        this.setPipeline('Light2D');
        this.init();
        this.initEvents();
    }

    init() {
        //Variables for enemy
        this.hp = 1;
        this.accel = 0;
        this.maxSpeed = 0;
        this.canMove = true;
        this.canShoot = true;
        this.body.maxVelocity.x = 800;
        this.body.maxVelocity.y = 1000;
        this.body.acceleration.x = 0;

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {

    }

    loseHP() {
        this.hp -= 1;
    }

    createCollider(layer) {
        this.colliderLayer = layer;
    }
}

export default Enemy;