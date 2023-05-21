//make hover effects on spritesheet creation

import Enemy from "./enemy.js";
class Hover extends Enemy {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    init() {
        this.hp = 20;
        this.canMove = true;
        this.body.maxVelocity.x = 800;
        this.body.maxVelocity.y = 1000;
        this.body.setAllowGravity(false)
        this.patrolRange = 0;
        this.lineOfSight = 0;
        this.stableY = this.body.y;
    }

    update() {
        if (this.body) {
            this.stabilize();
        }

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

}

export default Hover;