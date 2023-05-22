class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this); //Add object to scene
        scene.physics.add.existing(this); //Gives physics to body 
        this.init();
        this.initEvents();
    }

    init() {
        //Variables for player
        this.facing = false;
        this.hp = 10;
        this.canMove = true;
        this.body.maxVelocity.x = 800;
        this.body.maxVelocity.y = 1000;
        this.body.acceleration.x = 0;
        this.canThrust = true;
        this.jetPackFuel = 300;
        this.currentRifleAmmo = 0;
        this.currentMortarAmmo = 0;
        this.currentSniperAmmo = 0;
        this.currentEquipedWeapon = "Rifle";
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        //made for QWERTY, configured in AZERT
        const { left, right, up, down, space } = this.cursors;
        const wKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        const aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        const sKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        const dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //movements
        if (this.body.blocked.down) {
            this.jetPackFuel = 300;
            this.groundMovements(left, right, up, down, space, wKey, aKey, sKey, dKey);
        }
        else {
            this.airMovements(left, right, up, down, space, wKey, aKey, sKey, dKey);
        }

        //Animations
        if (this.body.velocity.x > 0) {
            this.facing = false
        }
        else if (this.body.velocity.x < 0) {
            this.facing = true
        }
        this.animate();
    }

    groundMovements(left, right, up, down, space, wKey, aKey, sKey, dKey) {
        if (left.isDown || right.isDown || aKey.isDown || dKey.isDown) {
            if (left.isDown || aKey.isDown) {
                if (this.body.velocity.x > 0) {
                    this.body.acceleration.x = -2400;

                } else {

                    this.body.acceleration.x = -800;
                }
            }

            if (right.isDown || dKey.isDown) {
                if (this.body.velocity.x < 0) {
                    this.body.acceleration.x = 2400;

                } else {

                    this.body.acceleration.x = 800;
                }
            }

        } else if (this.body.velocity.x >= 50) {
            this.body.acceleration.x -= 400;
        } else if (this.body.velocity.x <= - 50) {
            this.body.acceleration.x += 400;
        } else if (-10 < this.body.velocity.x < 10) {
            //ground friction
            this.body.acceleration.x = 0;
            this.setVelocityX(0);
        }
        //jump
        if (space.isDown || wKey.isDown) {
            this.body.acceleration.y = -500;
            this.body.acceleration.x = 0;
        } else {
            this.body.acceleration.y = 0;
        }
        this.setVelocityY(this.body.acceleration.y);
    }

    airMovements(left, right, up, down, space, wKey, aKey, sKey, dKey) {
       // this.body.acceleration.y += 20;
        if ((space.isDown || wKey.isDown) && this.canThrust && (this.body.velocity.y > 0) && this.jetPackFuel > 0) {
            this.body.velocity.y = this.body.velocity.y / 2
            this.jetPackFuel -= 1;
        }
        if ((left.isDown || aKey.isDown) || (right.isDown || dKey.isDown)) {
            if ((left.isDown || aKey.isDown) && this.body.acceleration.x > -400) {
                this.body.acceleration.x -= 60;
            }
            if ((right.isDown || dKey.isDown) && this.body.acceleration.x < 400) {
                this.body.acceleration.x += 60;
            }
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
        if (this.body.blocked.down) {
            if (this.body.velocity.x > 20) {
                this.play('player_run_right', true).setFlipX(false);
            } else if (this.body.velocity.x < -20) {
                this.play('player_run_right', true).setFlipX(true);
            } else if (this.facing) {
                this.play('player_idle_right', true).setFlipX(true);
            }
            else {
                this.play('player_idle_right', true).setFlipX(false);
            }

        } else {
            if (this.body.velocity.y < 0) {
                if (this.facing) {
                    this.play('player_jump_right', true).setFlipX(true);
                } else {
                    this.play('player_jump_right', true).setFlipX(false);
                }
            }
            else {
                if (this.facing) {
                    this.play('player_fall_right', true).setFlipX(true);
                } else {
                    this.play('player_fall_right', true).setFlipX(false);
                }
            }
        }

    }
    loseHP(value) {
        this.hp -= value;
    }
}

export default Player;