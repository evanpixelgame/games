
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

class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class
    this.controls = null;
  }

  preload() {
  
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

    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;

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


    const player = new Player (this, 100, 100)

    
    // Constrain the camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Help text
    this.add
      .text(16, 16, 'Arrow keys to scroll', {
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


