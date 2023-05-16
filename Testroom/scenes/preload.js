class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {
        //Images
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('background', 'assets/bg.jpg');
        //SpriteSheets
        this.load.spritesheet("player", "assets/AnimSheet.png",
            { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet("gun", "assets/gun.png",
            { frameWidth: 1698*2, frameHeight: 368 });
        //Audio
        this.load.audio('fleet', 'assets/sound/Fleet.mp3');
        this.load.audio('shoot', 'assets/sound/LaserShoot.mp3');
        this.load.audio('menu', 'assets/sound/Menu.mp3');


        //Maps
        this.load.image("tileset_image", "assets/Tileset_testroom.png");
        this.load.tilemapTiledJSON("testroom", "assets/Testroom.json");

    }

    create() {
        this.scene.start("MainMenu");

    }
}
export default Preload