
class MainMenu extends Phaser.Scene {

    constructor(config) {
        super("MainMenu");
        this.config = config;
    }

    Init(data) {

    }

    create() {
        this.colorMain = '#DDA000'
        this.colorOver = '#f39c12'

        this.buttonResume = this.add.text(16 * 24, 16 * 6, 'Resume Campain', { fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonResume.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonResume.setStyle({ fill: this.colorMain }))


        this.buttonGame = this.add.text(16 * 24, 16 * 12, 'Start Campain', { fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonGame.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonGame.setStyle({ fill: this.colorMain }))

        this.buttonSettings = this.add.text(16 * 24, 16 * 18, 'Settings', { fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonSettings.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonSettings.setStyle({ fill: this.colorMain }))

        this.buttonTestroom = this.add.text(16 * 24, 16 * 24, 'Testroom', { fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonTestroom.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonTestroom.setStyle({ fill: this.colorMain }))

        this.buttonResume.on('pointerdown', () => this.startScene.call(this, '0'));
        this.buttonGame.on('pointerdown', () => this.startScene.call(this, 'mission_01'));
        this.buttonSettings.on('pointerdown', () => this.startScene.call(this, 'Settings'));
        this.buttonTestroom.on('pointerdown', () => this.startScene.call(this, 'TestRoom'));
    }


    update() {
    }

    startScene(sceneName) {
        console.log(sceneName)
        this.scene.start(sceneName, {
            mapName: this.nextLevel,
            mapTileset: "Tileset_testroom",
            mapTilesetImage: "tileset_image",
        });

    }

    playAmbientMusic() {
        this.music = this.sound.play("menu", { volume: 0.35 });
    }
}

export default MainMenu;