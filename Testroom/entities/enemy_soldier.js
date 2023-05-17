import Enemy from "./enemy.js";
class Soldier extends Enemy {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    init() {
        this.hp = 10;
        this.canMove = true;
        this.body.maxVelocity.x = 800;
        this.body.maxVelocity.y = 1000;
        this.body.velocity.x = 100;
    }

    update() {
        if (this.body) {
            this.turnBack();
        }

    }

}

export default Soldier;