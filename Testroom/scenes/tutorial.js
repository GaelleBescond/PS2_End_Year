import LevelTemplate from "../scenes_templates/level_template.js";
class Tutorial extends LevelTemplate {
  constructor() {
    super("Tutorial")
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
    console.log(this.musicVolume)
    const levelMap = this.add.tilemap("tutorial");
    const layers = this.loadMap(levelMap);
    this.loadPlayer(64, 0, layers);
    this.physics.add.collider(this.player, layers.calc_walls);
    const enemies = this.loadEnemies(layers.spawnPoints, layers.calc_walls);
    this.physics.add.collider(enemies, layers.calc_walls);
    this.loadGun(this.player.x, this.player.y);
    this.createCamera();
    this.playAmbientMusic();
    this.createLights();
    this.loadInterface();
    this.mouseMovements();
    this.mouseActions(layers, enemies);
  };

  update() {
    this.gunOrientation();
    this.generalPositioning();
    this.gravityTool();
  };


}
export default Tutorial