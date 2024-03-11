

class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class
    this.controls = null;
  }

  preload() {
  this.load.image('sprite1', 'assets/sprites/charSelect/sprite1.png');
  }

  create() {

        // Check for portrait mode on mobile devices
    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
      if (window.orientation === 0 || window.orientation === 180) {
        // Portrait mode alert
        alert("Please switch to landscape mode for the best experience.");
      }
    }

    
    // Load tilemap
    const map = this.make.tilemap({ key: 'map' });

    // Load tileset
    const tileset = map.addTilesetImage('tilemap1', 'tiles');

    // Create layers
    const worldLayer = map.createLayer('Tile Layer 1', tileset, 0, 0);
    const worldObjectLayer = map.createLayer('Tile Layer 2', tileset, 0, 0);
    const worldCollisionObjectLayer = map.createLayer('Tile Layer 3', tileset, 0, 0);

    //const sprite = this.add.image(0, 0, 'sprite1');
    const sprite = this.add.sprite(200, 200, 'sprite1');

    
    // Enable physics for the sprite if needed
    this.physics.world.enable(sprite);

    // Create controls
     const cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // Optionally, you can customize properties of the sprite, such as scale, rotation, etc.
    sprite.setScale(2); // Example: Set scale to 2x

    // Set camera to follow the sprite (optional)
    this.cameras.main.startFollow(sprite);

    // Constrain the camera
    this.cameras.main.setBounds(0, 0, this.game.config.width * 2, this.game.config.height * 2);

    // Update function for continuous movement
    this.input.keyboard.on('keydown', (event) => {
      const speed = 200; // Adjust the speed as needed
      switch (event.code) {
        case 'KeyW':
          sprite.setVelocityY(-speed);
          break;
        case 'KeyS':
          sprite.setVelocityY(speed);
          break;
        case 'KeyA':
          sprite.setVelocityX(-speed);
          break;
        case 'KeyD':
          sprite.setVelocityX(speed);
          break;
      }
    });
    
    // Phaser supports multiple cameras, but you can access the default camera like this:
   // const camera = this.cameras.main;
  //  let x = 200;
    //let y = 200;
  /*  if (this.selectedCharacter == 'Baby Mouse') {mainChar = this.add.sprite(x, y, 'babyMouse') }
    else if (this.selectedCharacter == 'Confused Woman') {mainChar = this.add.sprite(x, y, 'confusedWoman')}
    else if (this.selectedCharacter == 'Fat Wolf') {mainChar = this.add.sprite(x, y, 'fatWolf')} */
     

    // You can customize properties of the sprite, such as scale, rotation, etc.
    //mainChar.setScale(2); // Example: Set scale to 2x

    // Enable physics for the sprite if needed
  //  this.physics.world.enable(mainChar);

    // Set camera to follow the sprite (optional)
   /* this.cameras.main.startFollow(sprite);

    // Create controls
    const cursors = this.input.keyboard.createCursorKeys();
    this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5,
    });

    // Constrain the camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); */

    // Help text
    this.add
      .text(16, 16, 'Arrow keys\nto scroll\n\nW,A,S,D\n to move avatar', {
        font: '18px monospace',
        fill: '#ffffff',
        padding: { x: 20, y: 10 },
        backgroundColor: '#000000',
      })
      .setScrollFactor(0);
  }

  update(time, delta) {
    // Apply the controls to the camera each update tick of the game
    if (this.controls) {
      this.controls.update(delta);
    }
  }
}

window.OpenWorld = OpenWorld;


/*   the controls for this are half working, they appear on the map but the map has disappeared 

class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class
     this.player = null;
    this.speed = 200; // Adjust the speed as needed
  }

  preload() {
    // Load player sprite and button images
    this.load.image('player', 'path/to/player.png');
    this.load.image('leftButton', 'path/to/leftButton.png');
    this.load.image('rightButton', 'path/to/rightButton.png');
    this.load.image('upButton', 'path/to/upButton.png');
    this.load.image('downButton', 'path/to/downButton.png');
  }

  create() {
    // Create player sprite
    this.player = this.add.sprite(400, 300, 'player').setOrigin(0.5);

    // Create onscreen buttons
    const leftButton = this.add.sprite(50, 550, 'leftButton').setInteractive();
    const rightButton = this.add.sprite(150, 550, 'rightButton').setInteractive();
    const upButton = this.add.sprite(100, 500, 'upButton').setInteractive();
    const downButton = this.add.sprite(100, 600, 'downButton').setInteractive();

    // Add event listeners for button clicks
    leftButton.on('pointerdown', () => this.moveLeft());
    rightButton.on('pointerdown', () => this.moveRight());
    upButton.on('pointerdown', () => this.moveUp());
    downButton.on('pointerdown', () => this.moveDown());

    // Stop player when buttons are released
    this.input.on('pointerup', () => this.stopMovement());
  }

  moveLeft() {
    this.player.setVelocityX(-this.speed);
  }

  moveRight() {
    this.player.setVelocityX(this.speed);
  }

  moveUp() {
    this.player.setVelocityY(-this.speed);
  }

  moveDown() {
    this.player.setVelocityY(this.speed);
  }

  stopMovement() {
    this.player.setVelocity(0);
  }
}
window.OpenWorld = OpenWorld; */
