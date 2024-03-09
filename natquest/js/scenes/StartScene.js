class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    // Load background image
    this.load.image('background', 'assets/backgrounds/startScreenBackground.png');
  }

  create() {
    // Add background image
    const background = this.add.image(400, 300, 'background');
    background.setOrigin(0.5);

    // Add a title
    const title = this.add.text(400, 200, 'NAT QUEST', {
      font: '48px Arial',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 },
    })
      .setOrigin(0.5);

    // Set up a scaling animation for the title
    this.tweens.add({
      targets: title,
      scaleX: 1.2,  // Scale up by 20%
      scaleY: 1.2,
      ease: 'Sine.easeInOut',
      duration: 1000,
      yoyo: true,  // Scale back to the original size
      repeat: -1,  // Infinite loop
    });

    // Add a start button
    const startButton = this.add.text(400, 400, 'Start', {
      fontSize: '32px', 
      fontFamily: 'Arial',
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
