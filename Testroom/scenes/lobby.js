/*Lobby
Players are supposed to meet, and choose what role they want to pick (driver, shooter).
Then they will position themselves in front the different modules they want to equip for their roles.
Once they are ready, they press the ready button.
The next level can then begin.
*/



class Lobby extends Phaser.Scene {
  constructor() {
    super({
      key: "LobbyScene",
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
          gravity: { y:450 }
        }
      }
    });

  }
  init(data) { };


  create() {


    console.log("Lobby");
    this.scene.run('Interface');
    var self = this;

    this.otherPlayers = this.physics.add.group();
    //keyboard
    this.cursors = this.input.keyboard.createCursorKeys();

    //loading testroom map
    this.carteDuNiveau = this.add.tilemap("testroom");
    //loading tileset
    this.tileset = this.carteDuNiveau.addTilesetImage("Tileset", "tileset_image");

    // chargement du calque calque_terrain
    this.calc_terrain = this.carteDuNiveau.createLayer("Background", this.tileset);
    this.calc_walls = this.carteDuNiveau.createLayer("Walls", this.tileset);
    this.calc_walls.setCollisionByProperty({ isSolid: true });
    //this.sound.play("fleet");


    //loading player
    this.player = this.physics.add.sprite(128 * 4, 128 * 4, 'ship');
    this.physics.add.collider(this.player, this.calc_walls);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(0.55);
    this.cursors = this.input.keyboard.createCursorKeys();
  };
  update() {
    if (this.player) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-360);
        this.player_facing = "left";
      }
      else if (this.cursors.right.isDown) {
        this.player.setVelocityX(360);
        this.player_facing = "right";
      }

      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-360);
        this.player_facing = "up";
      }
      else if (this.cursors.down.isDown) {
        this.player.setVelocityY(360);
        this.player_facing = "down";
      }
    };
  }

}

export default Lobby