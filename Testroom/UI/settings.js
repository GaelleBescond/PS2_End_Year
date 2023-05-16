
class Settings extends Phaser.Scene {

    constructor(config) {
        super("Settings");
        this.config = config;
    }

    Init(data) {

    }

    create() {
        this.colorMain = '#DD0000'
        this.colorOver = '#f39c12'
        this.font = 'Arial'
        this.volume();
        this.soundEffects();
        this.keys();
        this.back();

        this.buttonVolumePlus.on('pointerdown', () => this.startScene.call(this, +1));
        this.buttonVolumeLess.on('pointerdown', () => this.startScene.call(this, -1));
        this.buttonFxPlus.on('pointerdown', () => this.startScene.call(this, +1));
        this.buttonFxLess.on('pointerdown', () => this.startScene.call(this, -1));
        this.buttonKeys.on('pointerdown', () => this.startScene.call(this, 'Key_Bindings'));
        this.buttonBack.on('pointerdown', () => this.startScene.call(this, 'MainMenu'));

    }


    update() {
    }


    volume() {
        this.textVolume = this.add.text(16 * 22, 16 * 9, 'Music Volume', { fontFamily: this.font, fontSize: '32px', fill: '#FF0000' })
            .setOrigin(1, 0.5)
            .setPadding(10);
        this.buttonVolumeLess = this.add.text(16 * 28, 16 * 9, '-', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonVolumeLess.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonVolumeLess.setStyle({ fill: this.colorMain }))

        this.buttonVolumePlus = this.add.text(16 * 24, 16 * 9, '+', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonVolumePlus.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonVolumePlus.setStyle({ fill: this.colorMain }))
    }

    soundEffects() {
        this.textFxVolume = this.add.text(16 * 22, 16 * 18, 'FX Volume', { fontFamily: this.font, fontSize: '32px', fill: '#FF0000' })
            .setOrigin(1, 0.5)
            .setPadding(10);
        this.buttonFxLess = this.add.text(16 * 28, 16 * 18, '-', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonFxLess.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonFxLess.setStyle({ fill: this.colorMain }))

        this.buttonFxPlus = this.add.text(16 * 24, 16 * 18, '+', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonFxPlus.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonFxPlus.setStyle({ fill: this.colorMain }))

    }

    keys() {
        this.buttonKeys = this.add.text(16 * 22, 16 * 27, 'Key Bindings', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(1, 0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonKeys.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonKeys.setStyle({ fill: this.colorMain }))
    }


    back() {
        this.buttonBack = this.add.text(16 * 8, 16 * 40, 'Back', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonBack.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonBack.setStyle({ fill: this.colorMain }))
    }

    startScene(sceneName) {
        console.log(sceneName)
        this.scene.switch(sceneName);
    }

    playAmbientMusic() {
        this.music = this.sound.play("menu", { volume: 0.35 });
    }
}

export default Settings;