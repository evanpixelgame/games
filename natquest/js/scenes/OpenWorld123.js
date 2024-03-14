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
// computer specific create ************************************************************************************************************************************************
  create() {
     this.scene.launch('MobileControls');

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
  const playerStartingX = 1200;
  const playerStartingY = 1200;
  this.player = this.physics.add.sprite(playerStartingX, playerStartingY, 'player');

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
   this.scale.scaleMode = Phaser.Scale.ScaleModes.RESIZE;

   if (window.orientation === 0 || window.orientation === 180) {
        // Portrait mode alert
        alert("Please switch to landscape mode for the best experience.");
      }
     


window.addEventListener('orientationchange', () => {
    // Calculate new sprite position based on orientation
    updateSpritePosition();
  alert("Please switch to landscape mode for the best experience.");
    this.cameras.main.startFollow(this.player);
});
     
      this.cameras.main.startFollow(this.player);


    
      //  const centerX = map.width / 2;
   //     const centerY = map.height / 2;
       /// this.player.setPosition(centerX, centerY);
       // Check the current orientation
   //     const currentOrientation = this.scale.orientation;

        // If the current orientation is portrait, switch to landscape
     //   if (currentOrientation === Phaser.Scale.Orientation.PORTRAIT) {
       //     this.scale.setOrientation(Phaser.Scale.Orientation.LANDSCAPE);
        //}

      this.setInitialPlayerPosition();
    this.scene.launch('MobileControls');

   // this.scale.scaleMode = Phaser.Scale.ScaleModes.RESIZE;
    // Center game objects (optional)
  //  this.scale.pageAlignHorizontally = true;
  //  this.scale.pageAlignVertically = true;
    // Set the size of the game canvas to fill the entire screen
 //   this.scale.setGameSize(window.innerWidth, window.innerHeight);
      
      
 }
    //***********************************************************************************************************************************************************************************

    
       this.createAnimations();
  }  // <== create func end tag


updateSpritePosition() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get sprite's current position
    const spriteX = player.x;
    const spriteY = player.y;

    // Calculate the center of the viewport
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;

    // Calculate the difference between the sprite's current position and the center of the viewport
    const deltaX = spriteX - centerX;
    const deltaY = spriteY - centerY;

    // Update the sprite's position to maintain its relative position to the center of the viewport
    player.x = centerX + deltaX;
    player.y = centerY + deltaY;
}
  
/*
  setInitialPlayerPosition() {
    // Check the current orientation
    const currentOrientation = this.scale.orientation;

    // Set the player's initial position based on the orientation
    if (currentOrientation === Phaser.Scale.Orientation.PORTRAIT) {
        this.player = this.physics.add.sprite(this.playerStartingX, this.playerStartingY, 'player');
    } else if (currentOrientation === Phaser.Scale.Orientation.LANDSCAPE) {
        const centerX = this.scale.gameSize.width / 2;
        const centerY = this.scale.gameSize.height / 2;
        
        // Set the player's position to the center of the landscape viewport
        this.player = this.physics.add.sprite(centerX, centerY, 'player');
    }
} 
*/
  

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
  } 

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
    
   // this.cameras.main.startFollow(this.player);


    
    

 if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
    // Get the viewport size
    const viewportWidth = this.scale.gameSize.width;
    const viewportHeight = this.scale.gameSize.height;

    // Get the player's position
    const playerX = this.player.x;
    const playerY = this.player.y;

    // Calculate the camera position based on the player's position and the viewport size
    let cameraX = playerX - viewportWidth / 2;
    let cameraY = playerY - viewportHeight / 2;

    // Ensure the camera stays within the bounds of the game world
    cameraX = Phaser.Math.Clamp(cameraX, 0, this.map.widthInPixels - viewportWidth);
    cameraY = Phaser.Math.Clamp(cameraY, 0, this.map.heightInPixels - viewportHeight);

    // Set the camera position
    this.cameras.main.scrollX = cameraX;
    this.cameras.main.scrollY = cameraY;
 //  this.cameras.main.startFollow(this.player);
}

     this.cameras.main.startFollow(this.player);
    



    
  }
}
window.OpenWorld = OpenWorld;