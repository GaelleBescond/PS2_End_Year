
class MainMenu extends Phaser.Scene {

    constructor(config) {
        super("MainMenu");
        this.config = config;
    }

    Init(data) {

    }

    create() {
        this.playAmbientMusic();
        this.cursors = this.input.keyboard.createCursorKeys();



        this.startButton = this.add.text(16 * 24, 16 * 6, 'Start game', { fontSize: '32px', fill: '#DDDDDD' })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', this.startGame, this)
            .on('pointerover', () => this.startButton.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => this.startButton.setStyle({ fill: '#FFF' }))



        /* this.ammoCount = this.add.text(16 * 16, 16 * 9, 'New Game', { fontSize: '32px', fill: '#FF0000' });
         this.customize = this.add.text(16 * 16, 16 * 12, 'Customize', { fontSize: '32px', fill: '#FF0000' });
         this.testroom = this.add.text(16 * 16, 16 * 15, 'Testroom', { fontSize: '32px', fill: '#FF0000' });
 
         this.config = this.add.text(16 * 16, 16 * 18, 'Parameters', { fontSize: '32px', fill: '#FF0000' });*/
    }


    update() {
    }

    startGame() {
        this.scene.start("TestRoom");
    }

    playAmbientMusic() {
        this.music = this.sound.play("menu", { volume: 0.35 });
    }
}

export default MainMenu;