
class MainMenu extends Phaser.Scene {

    constructor(config) {
        super("MainMenu");
        this.config = config;
    }

    Init(data) {

    }

    create() {
        this.music = this.sound.play("menu", { volume: 0.35 });
        //this.playAmbientMusic();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.salute = this.add.text(16, 16, 'Hi', { fontSize: '32px', fill: '#0000FF' });
        this.ammoCount = this.add.text(16, 16 * 3, 'Game', { fontSize: '32px', fill: '#FF0000' });
    }


    update() {
        if (this.cursors.down.isDown) {
            this.game.sound.stopAll()
            this.scene.start("TestRoom");
        }
    }

    playAmbientMusic() {
    }
}

export default MainMenu;