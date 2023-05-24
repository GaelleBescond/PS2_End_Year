//make hover effects on spritesheet creation

import Enemy from "./enemy.js";
class Hover extends Enemy {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    init() {
        this.hp = 20;
        this.canMove = true;
        this.canJump = false
        this.body.maxVelocity.x = 800;
        this.body.maxVelocity.y = 1000;
        this.body.setAllowGravity(false)
        this.patrolRange = 0;
        this.lineOfSight = 0;
        this.stableY = this.body.y;
        this.speed = 500;
        this.body.velocity.x = this.speed;
        this.name = "hover"
    }

    update() {
        if (this.body) {
            this.stabilize();
            this.turnBack();
            
        }

    }

}

export default Hover;