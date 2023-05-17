import LevelTemplate from "../scenes_templates/level_template.js";
class Mission01 extends LevelTemplate {
  constructor() {
    super("Mission01");
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
    this.chosenGun = 0;
  };

  create() {
    const levelMap = this.add.tilemap("Mission01");
    const layers = this.loadMap(levelMap);
    this.loadPlayer(64, 0, 'player');
    this.physics.add.collider(this.player, layers.calc_walls);
    const enemies = this.loadEnemies(layers.enemy_SpawnPoints, layers.calc_walls);
    this.physics.add.collider(enemies, layers.calc_walls);
    this.mouseActions(layers, enemies);
    this.loadGun(this.player.x, this.player.y);
    this.createCamera();
    this.playAmbientMusic();
    this.loadInterface();
    this.mouseMovements();
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  };

  update() {
    this.gunOrientation();
    this.generalPositioning();
    this.updateCamera();
  };
}
export default Mission01