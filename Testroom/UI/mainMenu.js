class MainMenu extends Phaser.Scene {

    constructor(config) {
        super("MainMenu");
        this.config = config;
    }

    init(data) {
        this.musicVolume = data.musicVolume
        this.fxVolume = data.fxVolume
    }

    create() {
        this.colorMain = '#00DD00'
        this.colorNA = '#DD0000'
        this.colorOver = '#f39c12'
        this.increment = 16
        this.font = 'Mecha'


        this.buttonResume = this.add.text(this.increment * 36, this.increment * 6, 'Resume (N/A)', { fontFamily: this.font, fontSize: '32px', fill: this.colorNA })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonResume.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonResume.setStyle({ fill: this.colorNA }))


        this.buttonGame = this.add.text(this.increment * 36, this.increment * 12, 'Start Campain', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonGame.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonGame.setStyle({ fill: this.colorMain }))

        this.buttonMpGame = this.add.text(this.increment * 36, this.increment * 18, 'Multiplayer (N/A)', { fontFamily: this.font, fontSize: '32px', fill: this.colorNA })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonMpGame.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonMpGame.setStyle({ fill: this.colorNA }))



        this.buttonSettings = this.add.text(this.increment * 36, this.increment * 24, 'Settings', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonSettings.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonSettings.setStyle({ fill: this.colorMain }))

        this.buttonTestroom = this.add.text(this.increment * 36, this.increment * 30, 'Testroom', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonTestroom.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonTestroom.setStyle({ fill: this.colorMain }))


        this.buttonTutorial = this.add.text(this.increment * 36, this.increment * 36, 'Tutorial', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonTutorial.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonTutorial.setStyle({ fill: this.colorMain }))

        this.buttonQuit = this.add.text(this.increment * 36, this.increment * 42, 'Quit', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonQuit.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonQuit.setStyle({ fill: this.colorMain }))


        this.buttonResume.on('pointerdown', () => this.switchMenu.call(this, '0'));
        this.buttonGame.on('pointerdown', () => this.startLevel.call(this, 'Mission01'));
        this.buttonTutorial.on('pointerdown', () => this.startLevel.call(this, 'Tutorial'));
        this.buttonSettings.on('pointerdown', () => this.switchMenu.call(this, 'Settings'));
        this.buttonTestroom.on('pointerdown', () => this.startLevel.call(this, 'TestRoom'));
        this.buttonMpGame.on('pointerdown', () => this.switchMenu.call(this, 'MultiPlayer'));
        this.buttonQuit.on('pointerdown', () => this.switchMenu.call(this, 'Quit'));
    }


    update() {
    }

    startLevel(sceneName) {
        this.scene.start(sceneName, {
            mapTileset: "Tileset_testroom",
            mapTilesetImage: "Tileset_game",
            musicVolume: this.musicVolume,
            fxVolume: this.fxVolume,
        });
        this.game.sound.stopAll()
    }

    switchMenu(sceneName) {
        this.scene.start(sceneName, {
            musicVolume: this.musicVolume,
            fxVolume: this.fxVolume,
        });
    }

    playAmbientMusic() {
        this.sound.play("fleet", { volume: this.musicVolume });
    }
}

export default MainMenu;