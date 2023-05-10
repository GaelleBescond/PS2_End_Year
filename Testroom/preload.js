class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        this.load.image('robot', 'assets/robot.png');
        this.load.image('otherPlayer', 'assets/enemyBlack5.png');
        this.load.image('gun', 'assets/gun.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.audio('fleet','assets/Fleet.mp3' );
        
        this.load.image("tileset_image", "assets/Tileset_testroom.png");
        this.load.tilemapTiledJSON("testroom", "assets/Testroom.json");

    }

    create() {
        this.scene.start("LobbyScene");

    }
}
export default Preload