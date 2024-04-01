export default class PlayerControls {
  constructor(data) {
    this.scene = data.scene;
    this.player = data.player;
    this.velocity = data.velocity;
    this.world = data.world;

    this.cursors = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update(time, delta) {
    if (!this.player) {
      return;
    }

    let velocityX = 0;
    let velocityY = 0;

    // Determine velocity based on key presses
    if (this.cursors.up.isDown) {
      velocityY = -this.velocity;
    } else if (this.cursors.down.isDown) {
      velocityY = this.velocity;
    }

    if (this.cursors.left.isDown) {
      velocityX = -this.velocity;
    } else if (this.cursors.right.isDown) {
      velocityX = this.velocity;
    }

    // Normalize velocity to prevent faster movement diagonally
    if (velocityX !== 0 && velocityY !== 0) {
      const magnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
      velocityX *= this.velocity / magnitude;
      velocityY *= this.velocity / magnitude;
    }

    // Set the velocity of the player sprite
    this.player.setVelocity(velocityX, velocityY);
     this.player.body.velocity.x = velocityX;
    this.player.body.velocity.y = velocityY;

 
 console.log(this.player);
 console.log(this.player.body);
 console.log(this.player.body.velocity);

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
