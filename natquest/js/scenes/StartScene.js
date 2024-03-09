class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    // Load the TTF font using WebFont loader
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  create() {
    // Configure the font using the WebFont loader
    WebFont.load({
      google: {
        families: ['KneWave']
      },
      active: () => {
        // After the font is loaded, create your text
        this.add.text(400, 300, 'Your Game Title', {
          fontFamily: 'KneWave',
          fontSize: '48px',
          fill: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 20, y: 10 },
        }).setOrigin(0.5);

        // Add a start button
        const startButton = this.add.text(400, 400, 'Start', {
          font: '32px Arial',
          fill: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 20, y: 10 },
        })
          .setOrigin(0.5)
          .setInteractive();

        // Set a callback function for the button click event
        startButton.on('pointerdown', function () {
          // Transition to the main scene when the button is clicked
          this.scene.start('WorldScene');
        }, this);
      }
    });
  }
}

window.StartScene = StartScene;
