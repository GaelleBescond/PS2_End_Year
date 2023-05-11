class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "player");
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
        this.body.maxVelocity.y = 800;
        this.body.acceleration.x = 0;

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        //Animations
        this.scene.anims.create({
            key: "run_right",
            frames: this.scene.anims.generateFrameNumbers("player", { start: 12, end: 23 }),
            frameRate: 20,
            repeat: -1
        });
        this.scene.anims.create({
            key: "run_left",
            frames: this.scene.anims.generateFrameNumbers("player", { start: 0, end: 11 }),
            frameRate: 20,
            repeat: -1,
            reverse: true
        });
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

        //Animations
        this.animate();
    }

    groundMovements(left, right, up, down, space) {
        if (left.isDown || right.isDown) {
            if (left.isDown && this.body.acceleration.x > -400) {
                this.body.acceleration.x -= 400;
            } else
                if (right.isDown && this.body.acceleration.x < 400) {
                    this.body.acceleration.x += 400;
                }
        } else if (this.body.velocity.x >= 50) {
            this.body.acceleration.x -= 100;
            //console.log('neg');
        } else if (this.body.velocity.x <= - 50) {
            this.body.acceleration.x += 100;
            //console.log('pos');
        } else if (-20 < this.body.velocity.x < 20) {
            //ground friction
            this.body.acceleration.x = 0;
            this.setVelocityX(this.body.acceleration.x);
        }
        //jump
        if (up.isDown) {
            this.body.acceleration.y = -300;
        } else {
            this.body.acceleration.y = 0;
        }
        this.setVelocityY(this.body.acceleration.y);
    }
    airMovements(left, right, up, down, space) {
        if ((left.isDown) || (right.isDown)) {
            if (left.isDown && this.body.acceleration.x > -400) {
                this.body.acceleration.x -= 60;
            }
            if (right.isDown && this.body.acceleration.x < 400) {
                this.body.acceleration.x += 60;
            }
            this.setVelocityX(this.body.acceleration.x);
        }
        //air friction
        else if (this.body.velocity.x > 5) {
            this.body.acceleration.x -= 5;
        }
        else if (this.body.velocity.x < -5) {
            this.body.acceleration.x += 5;
        } else if (-5 < this.velocityX < 5) {
            //ground friction
            this.body.velocity.x = 0;
        }
        if (this.body.blocked.right || this.body.blocked.left) {
            this.body.acceleration.x = 0
        }
        this.setVelocityX(this.body.acceleration.x);

    }

    animate() {
        //create a variable containing previous accel to create slide effects
        //create a variable to face where the mouse is pointing (running backwards)
        //create walk animation
        //create fall animation
        //create jump/thrust animation
        //
        if (this.body.velocity.x > 20 && this.body.blocked.down) {
            this.play('run_right', true);
        } else if (this.body.velocity.x < -20 && this.body.blocked.down) {
            this.play('run_left', true);
        } else {
            this.anims.stop();
            this.setFrame(0);
        }

    }
    loseHP() {
        this.hp -= 1;
    }
}

export default Player;