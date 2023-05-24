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

    update() {

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
        //  console.log("jump")
        this.body.setVelocityY(-500);
    }

    stabilize() {
        if (this.stableY < this.body.y) {
            this.body.acceleration.y -= 10;
        } else if (this.stableY > this.body.y) {
            this.body.acceleration.y += 10;
        }
        if (Math.abs(this.stableY - this.body.y) < 1) {
            this.body.acceleration.y = 0;
        }
        this.body.setVelocityY(this.body.acceleration.y)
    }
    checkLineOfSight(player) {
        const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
        console.log(distance)
        if (distance <= this.lineOfSight) {
            if (checkLineOfSight(this, player)) {
                this.shoot();
            }
        }
    }
    shoot() {
        // Implement your shooting logic for the enemy
        // For example, create a bullet, trigger an animation, etc.
    }

}

export default Enemy;