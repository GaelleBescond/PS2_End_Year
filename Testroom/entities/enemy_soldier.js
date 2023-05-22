import Enemy from "./enemy.js";
class Soldier extends Enemy {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    init() {
        this.hp = 10;
        this.canMove = true;
        this.canJump = true
        this.body.maxVelocity.x = 800;
        this.body.maxVelocity.y = 1000;
        this.patrolRange = 0;
        this.lineOfSight = 0;
        this.speed = 300;
        this.body.velocity.x = this.speed;
    }

    update() {
        if (this.body) {
            this.turnBack();

        }

    }

}



export default Soldier;