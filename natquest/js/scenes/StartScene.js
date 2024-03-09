class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    // Load the TTF font
    this.load.bitmapFont('KneWave', 'path/to/KneWave/font.png', 'path/to/KneWave/font.xml');
  }

  create() {
    // Add background image
    const background = this.add.image(400, 300, 'background');
    background.setOrigin(0.5);

    // Create text with the custom font
    const title = this.add.bitmapText(400, 200, 'KneWave', 'Your Game Title', {
      fontSize: '48px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5);

    // Set up a scaling animation for the title
    this.tweens.add({
      targets: title,
      scaleX: 1.2,
      scaleY: 1.2,
      ease: 'Sine.easeInOut',
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

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
}

window.StartScene = StartScene;
