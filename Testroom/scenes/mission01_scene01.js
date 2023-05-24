import LevelTemplate from "../scenes_templates/level_template.js";
class Mission01_scene01 extends LevelTemplate {
  constructor() {
    super("Mission01_scene01");
  }

  init(data) {
    this.data_holder = {
      gunAngle: 0,
      cameraPosX: 0,
      cameraPosY: 0,
      enemiesNumber: 0,
      progress: 0
    };
    this.musicVolume = data.musicVolume;
    this.fxVolume = data.fxVolume;
    this.chosenGun = 0;
    this.canSwap = true;
    this.targetZoom = 0.55;
    this.physics.world.gravity.y = 1000;
    this.baseGravity = this.physics.world.gravity.y
    this.offset = 36
  };

  create() {
    const offset = 36
    const levelMap = this.add.tilemap("Mission01_scene01");
    const layers = this.loadMap(levelMap);
    //const spawn = this.createSpawns(layers);
    this.loadPlayer(128 * 12, -128 * 4, 'player');
    this.loadGun(this.player.x, this.player.y, offset);
    this.physics.add.collider(this.player, layers.calc_walls);
    this.enemies = this.loadEnemies(layers.enemy_SpawnPoints, layers.calc_walls, layers.calc_jumpBlocks);
    this.physics.add.collider(this.enemies, layers.calc_walls);
    this.mouseActions(layers, this.enemies);
    this.createCamera();
    this.playAmbientMusic();
    this.loadInterface("Mission01_scene01", this.player.energy, this.gun.name);
    this.mouseMovements();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.updateUI = new Phaser.Events.EventEmitter();
    console.log(this.enemies)
  };

  update() {
    this.updateUI.emit('dataUI', this.player.energy, this.gun.name, this.player.hp,);
    //gameplay methods
    this.generalPositioning();
    this.updateCamera();
    //level tools for player
    this.swapGun(this.eKey, this.qKey);
    this.gravityTool();
    if (this.enemies) {
      this.enemies.getChildren().forEach((enemy) => {
        enemy.checkLineOfSight(this.player)
      });

    };
  }
}
export default Mission01_scene01