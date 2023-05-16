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
        this.load.audio('empty_gun', 'assets/sound/GunEmpty.mp3');


        //Maps & levels
        this.load.image("tileset_image", "assets/Tileset_testroom.png");
        this.load.image("tileset_game", "assets/Tileset_game.png");
        this.load.tilemapTiledJSON("Testroom", "assets/levels/Testroom.json");
        this.load.tilemapTiledJSON("Tutorial", "assets/levels/Tutorial.json");
        this.load.tilemapTiledJSON("Mission01", "assets/levels/Mission01.json");

    }

    create() {
        const musicVolume = 0.35
        const fxVolume = 0.15
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
        this.scene.start("MainMenu", {
            musicVolume: musicVolume,
            fxVolume: fxVolume
        });
    }
}
export default Preload