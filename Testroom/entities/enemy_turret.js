import Enemy from "./enemy.js";
class Turret extends Enemy {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    init() {
        this.hp = 20;
        this.canMove = false;
        this.range = 
        this.body.velocity.x = -100;
    }
    create(){
        
    }

    update() {
        if (this.body) {
        
        }


    }

}

export default Turret;