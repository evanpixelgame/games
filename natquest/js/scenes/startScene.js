aexport default class StartScene extends Phaser.Scene {
  constructor() {
    super('startScene'); // Set the scene key
  }

  preload() {
    // Load any assets needed for the start scene, like images or audio
    // This example loads a background image
    this.load.image('startSceneBackground', 'path/to/your/image.png');
  }

  create() {
    // Create UI elements for the start scene, like a title and a "Start Game" button
    const backgroundImage = this.add.image(400, 300, 'startSceneBackground');
    const titleText = this.add.text(400, 100, 'My Phaser Game', {
      font: '48px Arial Bold',
      fill: '#ffffff',
      align: 'center'
    });
    const startButton = this.add.text(400, 250, 'Start Game', {
      font: '32px Arial',
      fill: '#ffffff',
      align: 'center',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 },
    });

    // Add interaction to the "Start Game" button to transition to the main scene
    startButton.setInteractive();
    startButton.on('pointerdown', () => {
      this.scene.start('mainScene'); // Start the main scene on click
    });
  }
}

