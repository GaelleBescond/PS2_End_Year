import LevelTemplate from "../scenes_templates/level_template.js";
class Mission04 extends LevelTemplate {
  constructor() {
    super("Mission04");
  }

  init(data) {
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
    this.canSwap = true;
    this.targetZoom = 0;
    this.physics.world.gravity.y = 1000;
    this.baseGravity = this.physics.world.gravity.y
  };

  create() {
    const levelMap = this.add.tilemap("Mission04");
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
    this.cursors = this.input.keyboard.createCursorKeys();
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  };

  update() {
    //gameplay methods
    this.gunOrientation();  
    this.generalPositioning();
    this.updateCamera();
    //level tools for player
    this.swapGun(this.eKey, this.qKey);
    this.gravityTool();
  }
}
export default Mission04