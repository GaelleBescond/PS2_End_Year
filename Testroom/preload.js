class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        this.load.image('ship', 'assets/spaceShips001.png');
        this.load.image('otherPlayer', 'assets/enemyBlack5.png');
        this.load.image('star', 'assets/stargold.png');
        this.load.audio('fleet','assets/Fleet.mp3' );
        
        this.load.image("tileset_image", "assets/Tileset_testroom.png");
        this.load.tilemapTiledJSON("testroom", "assets/Testroom.json");

    }

    create() {
        console.log("Preload");
        this.scene.start("LobbyScene");

    }
}
export default Preload