class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this); //Add object to scene
        scene.physics.add.existing(this); //Gives physics.body 
        this.init();
        this.initEvents();
    }

    init() {
        //Variables for enemy
        this.hp = 10;
        this.canMove = true;
        this.canJump = false
        this.body.maxVelocity.x = 800;
        this.body.maxVelocity.y = 1000;
        this.body.acceleration.x = 0;
        this.patrolRange = 0;
        this.lineOfSight = 0;
        this.speed = 0;
        this.body.velocity.x = this.speed;

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    loseHP(value) {
        this.hp -= value;
    }

    turnBack() {
        if (this.body.blocked.left || this.body.blocked.right) {
            this.speed = -this.speed
            this.body.setVelocityX(this.speed)
        }
    }

    jump() {
        if (this.canJump) {
            this.body.setVelocityY(-500);
        }
    }

}

export default Enemy;