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
window.OpenWorld = OpenWorld;
