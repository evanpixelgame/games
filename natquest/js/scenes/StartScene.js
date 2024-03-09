class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    // Load background image
    this.load.image('background', 'assets/backgrounds/startScreenBackground.jpg');
  }

  create() {
    // Add background image
    const background = this.add.image(400, 300, 'background');
    background.setOrigin(0.5);

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

    // Add dynamic text effect (e.g., bouncing animation)
    this.tweens.add({
      targets: startButton,
      y: 380,  // Bounce up by 20 pixels
      ease: 'Bounce.easeInOut',
      duration: 1000,
      repeat: -1,  // Infinite loop
      yoyo: true  // Bounce back to the original position
    });
  }
}

window.StartScene = StartScene;
