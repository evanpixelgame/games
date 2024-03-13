class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class
    this.controls = null;
    this.isMobile = null;
    this.isComputer = true;
    this.map = null;
    let selectedCharacter = this.selectedCharacter;
    this.playerCharacter = this.selectedCharacter;
  }
      
  preload() {
     // startFrame: 0,   // The first frame to start with (optional)
     // endFrame: 272     // The last frame to end with (optional)
     // this.load.image('base', 'assets/images/base.png');
     // this.load.image('thumb', 'assets/images/thumb.png');
    // this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    
    console.log(this.selectedCharacter);
    
    if (gameManager.selectedCharacter == 'Baby Mouse') {  
    this.load.spritesheet("player", "assets/sprites/player/babyMouse.png", {
          frameWidth: 64,
          frameHeight: 64
      }); 
    } else if (gameManager.selectedCharacter == 'Confused Woman') {
    
       this.load.spritesheet("player", "assets/sprites/player/womanPlayer.png", {
          frameWidth: 64,
          frameHeight: 64
      });
    } else {
       this.load.spritesheet("player", "assets/sprites/player/fatWolf.png", {
          frameWidth: 64,
          frameHeight: 64
      });
    }
  }

  create() {

    // COMPUTER/TV SCREEN SPECIFIC LOGIC 
  if (!this.sys.game.device.os.android && !this.sys.game.device.os.iOS) {
     this.scale.setGameSize(window.innerWidth, window.innerHeight); 
      // Help text
  this.add
    .text(16, 16, 'WASD to move', {
      font: '18px monospace',
      fill: '#ffffff',
      padding: { x: 20, y: 10 },
      backgroundColor: '#000000',
    })
    .setScrollFactor(0); 
  }
    //    this.scale.scaleMode = Phaser.Scale.ScaleModes.RESIZE;

        // Center game objects (optional)
      //  this.scale.pageAlignHorizontally = true;
      //  this.scale.pageAlignVertically = true;
  const map = this.make.tilemap({ key: 'map' });
  // Load tileset
  const tileset = map.addTilesetImage('tilemap1', 'tiles');

  // Create layers
  const worldLayer = map.createLayer('Tile Layer 1', tileset, 0, 0);
  const worldObjectLayer = map.createLayer('Tile Layer 2', tileset, 0, 0);
  const worldCollisionObjectLayer = map.createLayer('Tile Layer 3', tileset, 0, 0);

  // Create player sprite
  this.player = this.physics.add.sprite(200, 200, 'player');

  // Set world bounds for the player

    // Set world bounds slightly smaller than the map size
    const boundaryOffset = 20; // Adjust this value as needed
    const worldBounds = new Phaser.Geom.Rectangle(
        boundaryOffset,
        boundaryOffset,
        map.widthInPixels - 2 * boundaryOffset,
        map.heightInPixels - 2 * boundaryOffset
    );

    this.physics.world.setBounds(worldBounds.x, worldBounds.y, worldBounds.width, worldBounds.height);
    this.player.setCollideWorldBounds(true);

     this.speed = 200;

  // Create controls for arrow keys and WASD
  this.cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });

  // Constrain the camera
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
/* MOVE THIS TO THE CONDITIONAL, UNCOMMENT IF THAT DOESNT WORK
  // Help text
  this.add
    .text(16, 16, 'WASD to move', {
      font: '18px monospace',
      fill: '#ffffff',
      padding: { x: 20, y: 10 },
      backgroundColor: '#000000',
    })
    .setScrollFactor(0); */

    //MOBILE SPECIFIC UI AND STUFF ****************************************************************************************************************************************************************

   if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
    // Code for Android or iOS
  //  this.scale.scaleMode = Phaser.Scale.ScaleModes.RESIZE;
    this.scene.launch('MobileControls');

   // this.scale.scaleMode = Phaser.Scale.ScaleModes.RESIZE;
    // Center game objects (optional)
  //  this.scale.pageAlignHorizontally = true;
  //  this.scale.pageAlignVertically = true;
    // Set the size of the game canvas to fill the entire screen
 //   this.scale.setGameSize(window.innerWidth, window.innerHeight);
      
         if (window.orientation === 0 || window.orientation === 180) {
        // Portrait mode alert
        alert("Please switch to landscape mode for the best experience.");
      }
 }
    //***********************************************************************************************************************************************************************************

    
       this.createAnimations();
  }

  createAnimations() {
    this.anims.create({
        key: 'walking-up',
        frames: this.anims.generateFrameNames('player', {
            frames: [
              130, 131, 132, 133, 134, 135, 136, 137, 138
            ]
        }),
        yoyo: false,
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'walking-left',
        frames: this.anims.generateFrameNames('player', {
            frames: [
              117, 118, 119, 120, 121, 122, 123, 124, 125
            ]
        }),
        yoyo: false,
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'walking-down',
        frames: this.anims.generateFrameNames('player', {
            frames: [
                104, 105, 106, 107, 108, 109, 110, 111, 112
            ]
        }),
        yoyo: false,
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'walking-right',
        frames: this.anims.generateFrameNames('player', {
            frames: [
              143, 144, 145, 146, 147, 148, 149, 150, 151 
            ]
        }),
        yoyo: false,
        frameRate: 12,
        repeat: -1
    });
  } // <=== create() end tag

  update(time, delta) {

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-this.speed);
       this.player.anims.play('walking-down', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(this.speed);
       this.player.anims.play('walking-up', true);
    } else {
      this.player.setVelocityY(0);
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.speed);
      this.player.anims.play('walking-left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.speed);
      this.player.anims.play('walking-right', true);
    } else {
      this.player.setVelocityX(0);
    }
    
    this.cameras.main.startFollow(this.player);
    
  }
}
window.OpenWorld = OpenWorld;
