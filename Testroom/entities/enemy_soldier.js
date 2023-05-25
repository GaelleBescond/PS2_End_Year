import Enemy from "./enemy.js";
class Soldier extends Enemy {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    init() {
        this.hp = 10;
        this.canMove = true;
        this.canShoot = true;
        this.cooldown = 2000;
        this.body.maxVelocity.x = 800;
        this.body.maxVelocity.y = 1000;
        this.patrolRange = 0;
        this.lineOfSight = 2000;
        this.speed = 300;
        this.body.velocity.x = this.speed;
        this.name = "soldier"
        this.bulletVelocity = 2500;
        this.bulletAngle = 0;
        this.bulletDamage = 3;
        this.isOnCooldown = false;
        this.targetInRange = false;
    }

    update(player) {
        if (this.body) {
            // this.turnBack();     
            if (this.body.blocked.right || this.body.blocked.left) {
                this.jump()
            }
        }

    }

    jump() {
        if (this.body.blocked.down) {
            this.body.setVelocityY(-600);
            this.delayedEvent = this.scene.time.delayedCall(200, () => {
                this.body.setVelocityX(this.speed);
            });
        }
    }
}



export default Soldier;