class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {
        //Images
        this.load.image('robot', 'assets/robot.png');
        this.load.image('rest', 'assets/rest.png');
        this.load.image('run', 'assets/run.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('gun', 'assets/gun.png');
        this.load.image('bullet', 'assets/bullet.png');
        //SpriteSheets
        this.load.spritesheet("player_run", "assets/AnimSheet.png",
            { frameWidth: 666, frameHeight: 581 });
        //Audio
        this.load.audio('fleet', 'assets/Fleet.mp3');

        //Maps
        this.load.image("tileset_image", "assets/Tileset_testroom.png");
        this.load.tilemapTiledJSON("testroom", "assets/Testroom.json");

    }

    create() {
        this.scene.start("TestRoom");

    }
}
export default Preload