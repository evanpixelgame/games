import PlayerSprite from './PlayerSprite.js';

export default class ComputerControls extends Phaser.Scene {
  constructor() {
    super({ key: 'ComputerControls' });

    this.player = null; // Initialize player reference
    this.speed = 0; // Initialize speed
  }

    setPlayer(player) {
        this.player = player;
    }

  init(data) {
    // Retrieve player reference and speed from the data object
    this.player = data.player;
    this.speed = data.speed;
    console.log("Received player in ComputerControls:", this.player); // Log player reference
  }

  preload() {

  }

  create() {
  //  this.player = new PlayerSprite(this, 500, 500, 'player');

    // Initialize the player sprite
//    this.player.init();

    // Add the player sprite to the scene
 //   this.add.existing(this.player);
    this.matter.add.gameObject(this.player);

    // Set the world property to the scene's matter world
   // this.player.world = this.matter.world; //DO THIS IN OPENWORLD INSTEAD

    
    // Create controls for arrow keys and WASD
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

       console.log("Received player in ComputerControls createfunc:", this.player); // Log player reference
  }

  update(time, delta) {

    if (!this.player) {
      return;
    }

    let velocityX = 0;
    let velocityY = 0;

    // Determine velocity based on key presses
    if (this.cursors.up.isDown) {
      velocityY = -this.speed;
    } else if (this.cursors.down.isDown) {
      velocityY = this.speed;
    }

    if (this.cursors.left.isDown) {
      velocityX = -this.speed;
    } else if (this.cursors.right.isDown) {
      velocityX = this.speed;
    }

    // Normalize velocity to prevent faster movement diagonally
    if (velocityX !== 0 && velocityY !== 0) {
      const magnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
      velocityX *= this.speed / magnitude;
      velocityY *= this.speed / magnitude;
    }

    // Set the velocity of the player's Matter body
    Matter.Body.setVelocity(this.player.body, velocityX, velocityY);
  }
}
