
//export class ComputerControls extends Phaser.Scene  {
export class ComputerControls extends Phaser.Physics.Matter.Sprite {
  constructor(scene, velocityX, velocityY, player, speed) {
    super(scene.matter.world, velocityX, velocityY);
     this.scene = scene; 
    this.player = player; // Set player reference
    this.speed = speed; // Set speed
    scene.add.existing(this);
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
    // Create controls for arrow keys and WASD
    this.cursors = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

update(time, delta) {
    console.log("Update method of ComputerControls is being called.");

    if (!this.player) {
        console.log("Player not found.");
        return;
    }

    // Determine velocity based on key presses
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.up.isDown) {
        console.log("Up key is pressed.");
        velocityY = -this.speed;
    } else if (this.cursors.down.isDown) {
        console.log("Down key is pressed.");
        velocityY = this.speed;
    }

    if (this.cursors.left.isDown) {
        console.log("Left key is pressed.");
        velocityX = -this.speed;
    } else if (this.cursors.right.isDown) {
        console.log("Right key is pressed.");
        velocityX = this.speed;
    }

    // Normalize velocity to prevent faster movement diagonally
    if (velocityX !== 0 && velocityY !== 0) {
        const magnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        velocityX *= this.speed / magnitude;
        velocityY *= this.speed / magnitude;
    }

    // Set the velocity of the player sprite
    this.player.setVelocity(velocityX, velocityY);

    // Play appropriate animation based on movement direction
    if (velocityX !== 0 || velocityY !== 0) {
        if (velocityX > 0) {
            this.player.anims.play('walking-right', true);
        } else if (velocityX < 0) {
            this.player.anims.play('walking-left', true);
        } else if (velocityY < 0) {
            this.player.anims.play('walking-down', true);
        } else if (velocityY > 0) {
            this.player.anims.play('walking-up', true);
        }
    } else {
        // Stop animation when no movement
        this.player.anims.stop();
    }
    this.player.setRotation(0);
}

}
