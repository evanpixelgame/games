class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class
    this.controls = null;
    this.isMobile = null;
    this.isComputer = true;
  }
  // Handle the case when the custom scene should not run
  
  if (isComputer) {

    console.log('does this work');
  }

  preload() {
  this.load.image('sprite1', 'assets/sprites/charSelect/sprite1.png');
      this.load.image('base', './assets/image/base.png');
      this.load.image('thumb', './assets/image/thumb.png');
      this.load.plugin('rex-virtual-joystick-plugin"', VirtualJoyStickPlugin, true);
      this.load.spritesheet("player", "./assets/image/player.png", {
          frameWidth: 64,
          frameHeight: 64,
          startFrame: 0,
          endFrame: 36
      });
  }


  create() {
    this.isMobile = (this.sys.game.device.os.android || this.sys.game.device.os.iOS);
       if (!this.isMobile) {
         console.log('this should be the computer screen code');
      
         //COMPUTER CONTROL LOGIC HERE
const map = this.make.tilemap({ key: 'map' });

  // Load tileset
  const tileset = map.addTilesetImage('tilemap1', 'tiles');

  // Create layers
  const worldLayer = map.createLayer('Tile Layer 1', tileset, 0, 0);
  const worldObjectLayer = map.createLayer('Tile Layer 2', tileset, 0, 0);
  const worldCollisionObjectLayer = map.createLayer('Tile Layer 3', tileset, 0, 0);

  // Create player sprite
  this.player = this.physics.add.sprite(200, 200, 'sprite1');

  // Set world bounds for the player
//  this.player.setCollideWorldBounds(true);

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
    this.physics.world.bounds.width = this.gameWidth;
    this.physics.world.bounds.height = this.gameHeight;
    this.background = this.add.sprite(0, 0, "background").setOrigin(0, 0);
    this.background.setDisplaySize(this.gameWidth, this.gameHeight);
    this.background.setDepth(-1);
    this.cursorDebugText = this.add.text(10, 10);
    this.createAnimations();
    this.createPlayer();
    this.createVirtualJoystick();
    this.setCursorDebugInfo();
    this.updateJoystickState();
         
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
