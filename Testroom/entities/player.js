class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "rest");
        scene.add.existing(this); //Add object to scene
        scene.physics.add.existing(this); //Gives physics.body 
        this.init();
        this.initEvents();
    }

    init() {
        //Variables for player
        this.accel = 0;
        this.maxSpeed = 0;
        this.canMove = true;
        this.canShoot = true;
        this.body.maxVelocity.x = 800;
        this.body.acceleration.x = 0;

        this.cursors = this.scene.input.keyboard.createCursorKeys();

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        const { left, right, up, down, space } = this.cursors;
        const aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        const eKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        const rKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //movements
        if (this.body.blocked.down) {
            this.groundMovements(left, right, up, down, space);
        }
        else {
            this.airMovements(left, right, up, down, space);
        }
    }

    groundMovements(left, right, up, down, space) {
        if (left.isDown || right.isDown) {
            if (left.isDown && this.body.acceleration.x > -300) {
                this.body.acceleration.x -= 80;
            } else
                if (right.isDown && this.body.acceleration.x < 300) {
                    this.body.acceleration.x += 80;
                }
        } else if (this.body.acceleration.x >= 20) {
            this.body.acceleration.x -= 60;
            //console.log('neg');
        } else if (this.body.acceleration.x <= - 20) {
            this.body.acceleration.x += 60;
            //console.log('pos');
        } else if (-20 < this.velocityX < 20) {
            //ground friction
            this.body.acceleration.x = 0;
        }
        this.setVelocityX(this.body.acceleration.x);
        //jump
        if (up.isDown) {
            this.body.acceleration.y = -250;
        } else {
            this.body.acceleration.y = 0;
        }
        this.setVelocityY(this.body.acceleration.y);
    }
    airMovements(left, right, up, down, space) {
        if ((left.isDown) || (right.isDown)) {
            if (left.isDown && this.body.acceleration.x > -300) {
                this.body.acceleration.x -= 60;
            }
            if (right.isDown && this.body.acceleration.x < 300) {
                this.body.acceleration.x += 60;
            }
            this.setVelocityX(this.body.acceleration.x);
        }
        //air friction

        else if (this.body.acceleration.x >= 5) {
            this.body.acceleration.x -= 15;
        }
        else if (this.body.velocity.x <= -5) {
            this.body.acceleration.x += 15;
        } else if (-5 < this.velocityX < 5) {
            //ground friction
            this.body.acceleration.x = 0;
        }
        this.setVelocityX(this.body.acceleration.x);

    }

    loseHP() {
        this.hp -= 1;
    }
}

export default Player;