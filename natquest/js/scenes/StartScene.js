class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  create() {
    // Add a start button
    const startButton = this.add.text(400, 300, 'Start', {
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
