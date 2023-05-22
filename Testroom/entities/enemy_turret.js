import Enemy from "./enemy.js";
class Turret extends Enemy {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    init() {
        this.hp = 20;
        this.canMove = false;
        this.canJump = false
        this.range = 5000;
        this.body.velocity.x = -100;
        this.patrolRange = 0;
        this.lineOfSight = 0;
    }
    create() {

    }

    update() {
        if (this.body) {

        }


    }

}

export default Turret;