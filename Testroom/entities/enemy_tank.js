import Enemy from "./enemy.js";
class Tank extends Enemy {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    init() {
        this.hp = 30;
        this.canMove = true;
        this.range = 1500;
        this.body.maxVelocity.x = 800;
        this.body.maxVelocity.y = 1000;
        this.body.velocity.x = -100;
        this.patrolRange = 0;
        this.lineOfSight = 0;
    }

    update() {
        if (this.body) {
            this.turnBack();
        }



    }

}

export default Tank;