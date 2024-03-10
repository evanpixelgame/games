/*  // Create a new file, e.g., OrientationScene.js
class OrientationScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OrientationScene', active: true });
  }

  preload() {
    // Preload any assets you need for this scene
  }

  create() {
    const background = this.add.image(400, 300, 'background').setOrigin(0.5);

    // Display a message for portrait orientation
    if (this.scale.orientation === Phaser.Scale.PORTRAIT) {
      const message = this.add.text(400, 300, 'Please switch to landscape mode', {
        fontSize: '24px',
        fontFamily: 'Arial',
        fill: '#ffffff',
        align: 'center',
      }).setOrigin(0.5);

      // Handle orientation changes
      window.addEventListener('resize', () => {
        if (this.scale.orientation === Phaser.Scale.PORTRAIT) {
          // Display the message for portrait orientation
          message.visible = true;
        } else {
          // Set the game to landscape mode and hide the message
          this.scale.setMode(Phaser.Scale.LANDSCAPE);
          message.visible = false;
        }
      });
    }
  }
}

window.ScreenOrientation = ScreenOrientation;
