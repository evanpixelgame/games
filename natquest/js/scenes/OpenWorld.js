class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class
    this.controls = null;
    this.isMobile = null;
    this.isComputer = true;
    this.map = null;
  }
  // Handle the case when the custom scene should not run
  
  if (isComputer) {

    console.log('does this work');
  }

  createAnimations() {
    this.anims.create({
        key: 'walking-up',
        frames: this.anims.generateFrameNames('player', {
            frames: [
              104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116  
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
              117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129
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
              130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142
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
              143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155  
            ]
        }),
        yoyo: false,
        frameRate: 12,
        repeat: -1
    });
  }

  preload() {
  this.load.image('sprite1', 'assets/sprites/charSelect/sprite1.png');
    this.load.spritesheet('babyMouse', 'assets/sprites/player/babyMouse.png', {
    frameWidth: 64,  // Width of each frame in pixels
    frameHeight: 64, // Height of each frame in pixels
 //   startFrame: 0,   // The first frame to start with (optional)
 //   endFrame: 272     // The last frame to end with (optional)
});
      this.load.image('base', 'assets/images/base.png');
      this.load.image('thumb', 'assets/images/thumb.png');
      this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
      this.load.spritesheet("player", "assets/sprites/player/babyMouse.png", {
          frameWidth: 64,
          frameHeight: 64,
          startFrame: 0,
          endFrame: 36
      });
  }


  create() {
    this.isMobile = (this.sys.game.device.os.android || this.sys.game.device.os.iOS);
    const map = this.make.tilemap({ key: 'map' });

  // Load tileset
  const tileset = map.addTilesetImage('tilemap1', 'tiles');

  // Create layers
  const worldLayer = map.createLayer('Tile Layer 1', tileset, 0, 0);
  const worldObjectLayer = map.createLayer('Tile Layer 2', tileset, 0, 0);
  const worldCollisionObjectLayer = map.createLayer('Tile Layer 3', tileset, 0, 0);

  // Create player sprite
  this.player = this.physics.add.sprite(200, 200, 'babyMouse');

  // Set world bounds for the player
//  this.player.setCollideWorldBounds(true);

     this.speed = 200;

    // MAYBE PUT THE METHODS RIGHT HERE 
       if (!this.isMobile) {
         console.log('this should be the computer screen code');
      
         //COMPUTER CONTROL LOGIC HERE

  // Create controls for arrow keys and WASD
  this.cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });

  // Constrain the camera
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  // Help text
  this.add
    .text(16, 16, 'Arrow keys to move', {
      font: '18px monospace',
      fill: '#ffffff',
      padding: { x: 20, y: 10 },
      backgroundColor: '#000000',
    })
    .setScrollFactor(0);

    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
  console.log('mobile');
} else {  
  console.log('notmobile');   
       }

} else {
         if (window.orientation === 0 || window.orientation === 180) {
        // Portrait mode alert
        alert("Please switch to landscape mode for the best experience.");
      }
        console.log('this should be the phone screen code');
  
          //PUT MOBILE CONTROL LOGIC HERE 

         
       }

}  // <=== create() end tag
    

  update(time, delta) {

    if (!this.isMobile) {    
    // Update player movement based on keyboard input
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-this.speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(this.speed);
    } else {
      this.player.setVelocityY(0);
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.speed);
    } else {
      this.player.setVelocityX(0);
    }
      this.cameras.main.startFollow(this.player);
  } else {
      
     //PUT MOBILE UPDATE FUNCTION LOGIC HERE 

    this.updateJoystickState();
      
  }
  // Handle the case when the custom scene should not run
  }
}
window.OpenWorld = OpenWorld;
