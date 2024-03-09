
// Create function for the start scene
function createStart() {
  // Add background image
  const background = this.add.image(0, 0, 'startBackground').setOrigin(0, 0);

  // Add start button sprite
  const button = this.add.sprite(400, 300, 'startButton').setInteractive();

  // Animation for button (optional)
  this.anims.create({
    key: 'buttonActive',
    frames: this.anims.generateFrameNumbers('startButton', { start: 1, end: 1 }),
    frameRate: 1,
    repeat: -1
  });
  this.anims.create({
    key: 'buttonInactive',
    frames: this.anims.generateFrameNumbers('startButton', { start: 0, end: 0 }),
    frameRate: 1,
    repeat: -1
  });
  button.on('pointerover', () => button.play('buttonActive'));
  button.on('pointerout', () => button.play('buttonInactive'));
  button.play('buttonInactive'); // Set initial state

  // Button click event handler
  button.on('pointerdown', () => {
    this.scene.start('mapScene'); // Transition to the map scene
  });
}
