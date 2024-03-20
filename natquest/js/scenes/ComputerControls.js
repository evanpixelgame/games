
class ComputerControls extends Phaser.Scene {
  constructor() {
    super({ key: 'ComputerControls' });
  }
      
  preload() {

  }

  create() {

        this.openWorldScene = this.scene.get('OpenWorld');
        this.player = this.openWorldScene.player;
        this.speed = this.openWorldScene.speed;

    
    // COMPUTER/TV SCREEN SPECIFIC LOGIC 

  // Create controls for arrow keys and WASD
  this.cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });


  }

update(time, delta) {
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

    // Set the velocity of the player sprite
    this.player.setVelocity(velocityX, velocityY);

    // Play appropriate animation based on movement direction
    if (velocityX !== 0 || velocityY !== 0) {
        if (velocityX > 0) {
            this.player.anims.play('walking-right', true);
        } else if (velocityX < 0) {
            this.player.anims.play('walking-left', true);
        } else if (velocityY < 0) {
            this.player.anims.play('walking-up', true);
        } else if (velocityY > 0) {
            this.player.anims.play('walking-down', true);
        }
    } else {
        // Stop animation when no movement
        this.player.anims.stop();
    }

    // Reset rotation
    this.player.setRotation(0);
}

  
    }
     
window.ComputerControls = ComputerControls;
