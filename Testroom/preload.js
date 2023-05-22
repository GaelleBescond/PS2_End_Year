class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {
        //Images
        this.load.image('enemy_soldier', 'assets/enemy_soldier.png');
        this.load.image('enemy_tank', 'assets/enemy_tank.png');
        this.load.image('enemy_turret', 'assets/enemy_hovercraft.png');
        this.load.image('crosshair', 'assets/crosshair.png');


        this.load.image('jumpBlock', 'assets/jumpBlock.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('asteroidBackground', 'assets/bg.jpg');
        this.load.image('backgroundSpace', 'assets/backgroundSpace.png');
        this.load.image('asteroidBackground2', 'assets/asteroidsFar.png');
        this.load.image('asteroidBackground3', 'assets/asteroidsNear.png');
        //SpriteSheets
        this.load.spritesheet("player", "assets/PlayerSheet.png",
            { frameWidth: 512, frameHeight: 512 });
        this.load.spritesheet("enemy_hovercraft", "assets/hovercraft_spritesheet.png",
            { frameWidth: 512, frameHeight: 256 });
        this.load.spritesheet("gun", "assets/gun.png",
            { frameWidth: 1024, frameHeight: 256 });
        this.load.spritesheet('mortar_orb', 'assets/mortar_bullet.png',
            { frameWidth: 256, frameHeight: 256 });

        //Audio
        this.load.audio('fleet', 'assets/sound/Fleet.mp3');
        this.load.audio('shoot', 'assets/sound/LaserShoot.mp3');
        this.load.audio('menu', 'assets/sound/Menu.mp3');
        this.load.audio('empty_gun', 'assets/sound/GunEmpty.mp3');


        //Maps & levels
        this.load.image("tileset_image", "assets/Tileset_game.png");
        this.load.tilemapTiledJSON("Testroom", "levels/Testroom.json");
        this.load.tilemapTiledJSON("Tutorial", "levels/Tutorial.json");
        this.load.tilemapTiledJSON("Mission01", "levels/Mission01.json");
        this.load.tilemapTiledJSON("Mission02", "levels/Mission02.json");

    }

    create() {
        const frames = 30
        const musicVolume = 0.35
        const fxVolume = 0.15
        // this.sound.play("fleet", { volume: this.musicVolume });
        this.anims.create({
            key: "player_idle_right",
            frames: this.anims.generateFrameNumbers("player", { start: frames * 0, end: frames * 1 - 1 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "player_run_right",
            frames: this.anims.generateFrameNumbers("player", { start: frames * 1, end: frames * 2 - 1 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "player_jump_right",
            frames: this.anims.generateFrameNumbers("player", { start: frames * 2, end: frames * 3 - 1 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "player_fall_right",
            frames: this.anims.generateFrameNumbers("player", { start: frames * 3, end: frames * 4 - 1 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "player_backwards_right",
            frames: this.anims.generateFrameNumbers("player", { start: frames * 5, end: frames * 6 - 1 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "rifle_effects",
            frames: this.anims.generateFrameNumbers("gun", { start: 0, end: 36 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "mortar_orb_effects",
            frames: this.anims.generateFrameNumbers("mortar_orb", { start: 0, end: 36 }),
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