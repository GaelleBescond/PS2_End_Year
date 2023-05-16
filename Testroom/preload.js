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
        this.load.spritesheet("player", "assets/PlayerSheet.png",
            { frameWidth: 512, frameHeight: 512 });

        this.load.spritesheet("gun", "assets/gun.png",
            { frameWidth: 1698 * 2, frameHeight: 368 });

        //Audio
        this.load.audio('fleet', 'assets/sound/Fleet.mp3');
        this.load.audio('shoot', 'assets/sound/LaserShoot.mp3');
        this.load.audio('menu', 'assets/sound/Menu.mp3');


        //Maps & levels
        this.load.image("tileset_image", "assets/Tileset_testroom.png");
        this.load.tilemapTiledJSON("testroom", "assets/levels/Testroom.json");

    }

    create() {
        this.anims.create({
            key: "player_idle_left",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 29 }),
            frameRate: 20,
            repeat: -1,
            reverse: true
        });
        this.anims.create({
            key: "player_idle_right",
            frames: this.anims.generateFrameNumbers("player", { start: 30, end: 59 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "player_run_left",
            frames: this.anims.generateFrameNumbers("player", { start: 89, end: 60 }),
            frameRate: 20,
            repeat: -1,
            //reverse: true
        });
        this.anims.create({
            key: "player_run_right",
            frames: this.anims.generateFrameNumbers("player", { start: 90, end: 119 }),
            frameRate: 20,
            repeat: -1,
        });
        this.scene.start("MainMenu");


    }
}
export default Preload