/*Lobby
Players are supposed to meet, and choose what role they want to pick (driver, shooter).
Then they will position themselves in front the different modules they want to equip for their roles.
Once they are ready, they press the ready button.
The next level can then begin.
*/
import Player from "../entities/player.js";
import Weapon from "../entities/gun.js";
import Enemy from "../entities/enemy.js";


class TestRoom extends Phaser.Scene {
  constructor() {
    super({
      key: "TestRoom",
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
          gravity: { y: 400 }
        }
      },
      render: {
        pipeline: 'Light2D'
      }
    });

  }
  init(data) { };


  create() {
    const levelMap = this.add.tilemap("testroom");
    const layers = this.loadMap(levelMap);
    this.playAmbientMusic();
    //create player
    this.player = new Player(this, 64, 0, 'robot').setScale(0.25);
    this.physics.add.collider(this.player, layers.calc_walls);
    //create weapon slot
    this.gun = new Weapon(this, this.player.x, this.player.y - 48, 'gun');
    //this.gun.setParent(this.player);
    const enemies = this.createEnemies(layers.spawnPoints, layers.calc_walls);

    this.physics.add.collider(enemies, layers.calc_walls);
    //light
    //this.light = this.add.light(this.player.x, this.player.y, 0xffffff, 128);
    this.createCamera();
    //mouse variables storage (for an easier later use)
    this.data_holder = {
      gunAngle: 0,
      cameraPosX: 0,
      cameraPosY: 0,
      ammo: this.gun.ammunition,
      enemiesNumber: 0,
      progress: 0,
    }
    //mouse movements
    this.input.on('pointermove', function (pointer) {
      this.data_holder.cameraPosX = pointer.x - 1280 / 2;
      this.data_holder.cameraPosY = pointer.y - 768 / 2;
      this.data_holder.gunAngle = Phaser.Math.Angle.Between(this.gun.x, this.gun.y, this.cameraFocal.x, this.cameraFocal.y);
      //console.log(this.data_holder)
      this.events.emit('updateUI', this.data_holder);
    }, this);

    //mouse actions
    this.input.on('pointerdown', function (pointer) {
      //console.log(this.gun.weaponCanShoot, this.data_holder.ammo)
      if (this.gun.weaponCanShoot && this.gun.ammunition > 0) {
        this.shootBullet(this.gun.x, this.gun.y, this.data_holder.gunAngle, layers, enemies);
      }
    }, this);

    //keyboard
    this.cursors = this.input.keyboard.createCursorKeys();
    this.loadInterface();
  };

  update() {
    const { left, right, up, down, space } = this.cursors;
    //Gravity tool
    if (down.isDown) {
      if ((this.player.body.velocity.x && this.player.body.velocity.y) != 0) {
        if (this.player.body.velocity.x > 0) {
          this.player.body.acceleration.x -= 10;
        } else if (this.player.body.velocity.x < 0) {
          this.player.body.acceleration.x += 10;
        }
      } else {
        this.physics.world.gravity.y = 2600;
      }
    }
    else {
      this.physics.world.gravity.y = 400;
    };
    //enemy shooting at player
    //camera positioning
    this.cameraFocal.setPosition(this.player.x + (this.data_holder.cameraPosX) * 0.7, this.player.y + (this.data_holder.cameraPosY) * 0.7)

    //mouse aiming for the gun
    this.gun.setRotation(this.data_holder.gunAngle)
    //weaponry (need to be child but doesn't work)
    this.gun.x = this.player.x
    this.gun.y = this.player.y - 36

  }

  createCamera() {
    //set camera between player and mouse (average coordinates)
    this.cameraFocal = this.physics.add.sprite(this.player.x, this.player.y);
    this.cameraFocal.body.setAllowGravity(false);
    this.cameras.main.startFollow(this.cameraFocal);
    this.cameras.main.setZoom(0.55);
  }

  loadMap(levelMap) {
    const tileset = levelMap.addTilesetImage("Tileset_testroom", "tileset_image");
    const calc_terrain = levelMap.createLayer("Background", tileset);
    const calc_walls = levelMap.createLayer("Walls", tileset);
    const spawnPoints = levelMap.getObjectLayer("Spawn");
    calc_walls.setCollisionByProperty({ isSolid: true });
    return { spawnPoints, calc_walls, calc_terrain, tileset }

  }

  playAmbientMusic() {
    this.sound.play("fleet", { volume: 0.35 });
  }

  getSpawnCoordinates(layer) {
    const spawnPoints = layer.objects;
    return {
      start: spawnPoints[0],
      end: spawnPoints[1]
    }
  }
  createEnemies(layer, calc_walls) {
    const enemies = this.physics.add.group();
    layer.objects.forEach(spawn => {
      console.log("spawn");
      let enemy = null;
      enemy = new Enemy(this, spawn.x, spawn.y, 'enemy').setScale(0.15);
      enemies.add(enemy)
      this.physics.add.collider(enemy)
    })
    return enemies;
  }

  shootBullet(x, y, angle, layers, enemies) {
    this.data_holder.ammo -= 1;
    this.gun.weaponCanShoot = false;
    this.bullet = this.physics.add.sprite(x, y, 'bullet')
    this.physics.add.collider(this.bullet, layers.calc_walls, this.destroy, null, this)
    this.physics.add.collider(this.bullet, enemies, this.destroy, null, this)
    this.bullet.setVelocity(Math.cos(angle) * this.gun.bulletVelocity, Math.sin(angle) * this.gun.bulletVelocity);
    this.sound.play("shoot", { volume: 0.15 });
    this.time.delayedCall(1000, () => {
      this.gun.weaponCanShoot = true;
    });

  }

  destroy(object) {
    object.destroy()
  }

  loadInterface() {
    this.scene.run('Interface', {
    });
  }
}

export default TestRoom