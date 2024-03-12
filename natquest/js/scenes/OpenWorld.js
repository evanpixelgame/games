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

    init() {
      this.staticXJsPos = this.gameWidthMiddle;
      this.staticYJsPos = this.gameHeightMiddle + (this.gameHeightMiddle / 2) + (this.gameHeightMiddle / 4);
      this.playerSpeed = 1;
      this.lastCursorDirection = "center";
      this.joystickConfig = {
        x: this.staticXJsPos,
        y: this.staticYJsPos,
        enabled: true
    };
  }

  createAnimations() {
    this.anims.create({
        key: 'walking-left',
        frames: this.anims.generateFrameNames('player', {
            frames: [
                9 , 11, 12, 13, 14, 15, 16, 17
            ]
        }),
        yoyo: true,
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'walking-right',
        frames: this.anims.generateFrameNames('player', {
            frames: [
                27,28,29,30,31,32,33,34,35
            ]
        }),
        yoyo: true,
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'walking-up',
        frames: this.anims.generateFrameNames('player', {
            frames: [
                0,1.2,3,4,5,6,7,8
            ]
        }),
        yoyo: true,
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'walking-down',
        frames: this.anims.generateFrameNames('player', {
            frames: [
                18,19,20,21,22,23,24,25,26
            ]
        }),
        yoyo: true,
        frameRate: 12,
        repeat: -1
    });
  }

  createPlayer() {
    this.player = this.add.sprite(this.gameWidthMiddle, this.gameHeightMiddle, 'player', 1);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);
    this.player.setScale(1.25);
    this.player.setFrame(18);
  }

  createVirtualJoystick() {
    this.joyStick = this.plugins.get('rex-virtual-joystick-plugin"').add(
        this,
        Object.assign({}, this.joystickConfig, {
            radius: 32,
            base: this.add.image(0, 0, 'base').setDisplaySize(110, 110),
            thumb: this.add.image(0, 0, 'thumb').setDisplaySize(48, 48)
        })
    ).on('update', this.updateJoystickState, this);
    this.cursorKeys = this.joyStick.createCursorKeys();

    // Listener event to reposition virtual joystick
    // whatever place you click in game area
    this.input.on('pointerdown', pointer => {
        this.joyStick.x = pointer.x;
        this.joyStick.y = pointer.y;
        this.joyStick.base.x = pointer.x;
        this.joyStick.base.y = pointer.y;
        this.joyStick.thumb.x = pointer.x;
        this.joyStick.thumb.y = pointer.y;
    });

    // Listener event to return virtual 
    // joystick to its original position
    this.input.on('pointerup', pointer => {
        this.joyStick.x = this.staticXJsPos;
        this.joyStick.y = this.staticYJsPos;
        this.joyStick.base.x = this.staticXJsPos;
        this.joyStick.base.y = this.staticYJsPos;
        this.joyStick.thumb.x = this.staticXJsPos;
        this.joyStick.thumb.y = this.staticYJsPos;
        this.lastCursorDirection = "center";
        this.setCursorDebugInfo();
    });

  }

  setCursorDebugInfo() {
    const force = Math.floor(this.joyStick.force * 100) / 100;
    const angle = Math.floor(this.joyStick.angle * 100) / 100;
    let text = `Direction: ${this.lastCursorDirection}\n`;
    text += `Force: ${force}\n`;
    text += `Angle: ${angle}\n`;
    text += `FPS: ${this.sys.game.loop.actualFps}\n`;
    this.cursorDebugText.setText(text);
  }

  preload() {
  this.load.image('sprite1', 'assets/sprites/charSelect/sprite1.png');
      this.load.image('base', 'assets/images/base.png');
      this.load.image('thumb', 'assets/images/thumb.png');
      this.load.plugin('rex-virtual-joystick-plugin', 'assets/plugins/rex-virtual-joystick-plugin.js', true);
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
  this.player = this.physics.add.sprite(200, 200, 'sprite1');

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
