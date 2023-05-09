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
          gravity: { y: 1000 }
        }
      }
    });

  }
  init(data) { };


  create() {
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
    this.player = this.physics.add.sprite(128 * 4, 128 * 28, 'robot').setScale(0.25);
    this.player.body.maxVelocity.x = 800;
    this.player.body.acceleration.x = 0;
    this.physics.add.collider(this.player, this.calc_walls);
    //loading weapon
    this.gun = this.add.sprite(this.player.x, this.player.y - 48, 'gun');

    if (this.gun.setParent) {
      this.gun.setParent(this.player);
    } else {
      console.log('setParent method not available for this object');
    }


    //camera
    //+ set camera between player and mouse (average coordinates)
    this.cameraFocal = this.physics.add.sprite(this.player.x, this.player.y);
    this.cameraFocal.body.setAllowGravity(false);
    this.cameras.main.startFollow(this.cameraFocal);
    this.cameras.main.setZoom(0.55);

    //bullets from gun
    this.bullets = this.physics.add.group();
    this.physics.add.collider(this.bullets, this.calc_walls, this.destroy_bullet, null, this)

    //mouse variables storage (for an easier later use)
    this.pointer_stats = {
      gunAngle: 0,
      cameraPosX: 0,
      cameraPosY: 0,
    }

    //mouse movements
    this.input.on('pointermove', function gunAngle(pointer) {
      this.pointer_stats.cameraPosX = pointer.x - 1280 / 2;
      this.pointer_stats.cameraPosY = pointer.y - 768 / 2;
      //console.log(this.pointer_stats.cameraPosX, this.pointer_stats.cameraPosY)
      this.pointer_stats.gunAngle = Phaser.Math.Angle.Between(this.gun.x, this.gun.y, this.cameraFocal.x, this.cameraFocal.y);
      //console.log(this.pointer_stats.gunAngle)
    }, this);

    //mouse actions
    this.input.on('pointerdown', function (pointer) {
      //console.log("pointer down")
      this.shootBullet(this.bullets, this.gun.x, this.gun.y, this.pointer_stats.gunAngle);
    }, this);
  };


  update() {
    //ground movements
    if (this.player.body.blocked.down) {
      if (this.cursors.left.isDown || this.cursors.right.isDown) {
        if (this.cursors.left.isDown && this.player.body.acceleration.x > -300) {
          this.player.body.acceleration.x -= 80;
        } else
          if (this.cursors.right.isDown && this.player.body.acceleration.x < 300) {
            this.player.body.acceleration.x += 80;
          }
      } else if (-10 < this.player.velocityX < 10) {
        //ground friction
        this.player.body.acceleration.x = 0;
      } else if (this.player.body.acceleration.x > 0) {
        this.player.body.acceleration.x -= 60;
        //console.log('neg');
      } else if (this.player.body.acceleration.x < 0) {
        this.player.body.acceleration.x += 60;
        //console.log('pos');
      }

      this.player.setVelocityX(this.player.body.acceleration.x);
      //jump
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-660);
      }
    }

    //air movements
    else {
      if ((this.cursors.left.isDown) || (this.cursors.right.isDown)) {
        if (this.cursors.left.isDown && this.player.body.acceleration.x > -300) {
          this.player.body.acceleration.x -= 60;
        }
        if (this.cursors.right.isDown && this.player.body.acceleration.x < 300) {
          this.player.body.acceleration.x += 60;
        }
        this.player.setVelocityX(this.player.body.acceleration.x);
      }
      //air friction
      else {
        if (this.player.body.acceleration.x > 0) {
          this.player.body.acceleration.x -= 15;
        }
        if (this.player.body.velocity.x < 0) {
          this.player.body.acceleration.x += 15;
        }
      }
      this.player.setVelocityX(this.player.body.acceleration.x);
    }
    //Gravity tool
    if (this.cursors.down.isDown) {
      this.physics.world.gravity.y = 2600;
    }
    else {
      this.physics.world.gravity.y = 400;
    };
    //camera positioning
    this.cameraFocal.setPosition(this.player.x + (this.pointer_stats.cameraPosX) * 0.7, this.player.y + (this.pointer_stats.cameraPosY) * 0.7)

    //mouse aiming for the gun
    this.gun.setRotation(this.pointer_stats.gunAngle)
    //weaponry (need to be child but doesn't work)
    this.gun.x = this.player.x
    this.gun.y = this.player.y - 36

  }
  destroy_bullet(bullet) {
    bullet.destroy()
    //console.log("bullet destroyed")
  }
  shootBullet(bullet, x, y, angle) {
    //console.log("shoot!")
    bullet.create(x, y, 'bullet');
    this.directionBullet(bullet, angle)
  }
  directionBullet(bullet, angle) {
    bullet.setVelocity(Math.cos(angle) * 1500, Math.sin(angle) * 1500);
  }
}

export default Lobby