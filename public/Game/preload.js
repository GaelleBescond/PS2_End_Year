class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        this.load.image('robot', 'assets/robot.png');
        this.load.image('otherPlayer', 'assets/enemyBlack5.png');
        this.load.image('star', 'assets/stargold.png');

    }

    create() {
        console.log("Lobby");
        this.scene.start("LobbyScene");

    }
}
export default Preload