
class ComputerControls extends Phaser.Scene {
  constructor() {
    super({ key: 'ComputerControls' });
  }
      
  preload() {

  }

  create() {

    //SCENE & VARIABLE ACCESS TO OPENWORLD SCENE
 this.openWorldScene = this.scene.get('OpenWorld');
 this.player = this.scene.get('OpenWorld').player;  
 this.speed = this.openWorldScene.speed;

    
    // COMPUTER/TV SCREEN SPECIFIC LOGIC 
  if (!this.sys.game.device.os.android && !this.sys.game.device.os.iOS) {
     this.scale.setGameSize(window.innerWidth, window.innerHeight); 
      // Help text
  this.add
    .text(16, 16, 'WASD to move', {
      font: '18px monospace',
      fill: '#ffffff',
      padding: { x: 20, y: 10 },
      backgroundColor: '#000000',
    })
    .setScrollFactor(0); 
  }

  // Create controls for arrow keys and WASD
  this.cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });
  }

  update(time, delta) {

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-this.speed);
       this.player.anims.play('walking-down', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(this.speed);
       this.player.anims.play('walking-up', true);
    } else {
      this.player.setVelocityY(0);
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.speed);
      this.player.anims.play('walking-left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.speed);
      this.player.anims.play('walking-right', true);
    } else {
      this.player.setVelocityX(0);
    }
  }
}
window.ComputerControls = ComputerControls;
