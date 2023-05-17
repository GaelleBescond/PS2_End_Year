import LevelTemplate from "../scenes_templates/level_template.js";
class Mission02 extends LevelTemplate {
  constructor() {
    super("Mission02");
  }

  init(data) {
    this.mapTileset = data.mapTileset;
    this.mapTilesetImage = data.mapTilesetImage;
    this.data_holder = {
      gunAngle: 0,
      cameraPosX: 0,
      cameraPosY: 0,
      ammo: 99,
      enemiesNumber: 0,
      progress: 0,
    };
    this.musicVolume = data.musicVolume;
    this.fxVolume = data.fxVolume;
  };

  create() {
    const levelMap = this.add.tilemap("Mission02");
    const layers = this.loadMap(levelMap);
    this.loadPlayer(64, 0, 'player');
    this.physics.add.collider(this.player, layers.calc_walls);
    const enemies = this.loadEnemies(layers.enemy_SpawnPoints, layers.calc_walls);
    this.physics.add.collider(enemies, layers.calc_walls);
    this.mouseActions(layers, enemies);
    this.loadGun(this.player.x, this.player.y);
    this.createCamera();
    this.playAmbientMusic();
    this.createLights();
    this.loadInterface();
    this.mouseMovements();
  };

  update() {
    const eKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    const qKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    if (eKey.isDown) {
      this.chosenGun += 1;
      if (this.chosenGun > 2) {
        this.chosenGun = 2;
        console.log(this.chosenGun)
        this.loadGun(this.player.x,this.player.y)
      }
    }
    if (qKey.isDown) {
      this.chosenGun -= 1;
      if (this.chosenGun < 0) {
        this.chosenGun = 0;
        console.log(this.chosenGun)
        this.loadGun(this.player.x,this.player.y)
      }
    }
    this.gunOrientation();
    this.generalPositioning();
    this.updateCamera();
  };
}
export default Mission02