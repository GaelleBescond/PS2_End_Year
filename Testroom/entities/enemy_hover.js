import Enemy from "./enemy.js";
class Hover extends Enemy {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    init() {
        this.hp = 30;
        this.canMove = true;
        this.body.maxVelocity.x = 800;
        this.body.maxVelocity.y = 1000;
        this.body.setAllowGravity(false)
    }

    update() {
        if (this.body) {
          }
  
    }

}

export default Hover;