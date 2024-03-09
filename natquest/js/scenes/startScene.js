export const startScene = { // Export the scene object
  preload: preloadStart,
  create: createStart,
};

function preloadStart() {
  // Load any assets needed for the start screen
  this.load.image('startBackground', 'path/to/start_background.png');
  this.load.spritesheet('startButton', 'path/to/start_button.png', { frameWidth: 128, frameHeight: 64 });
}

function createStart() {
  // Add background image
  const background = this.add.image(0, 0, 'startBackground').setOrigin(0, 0);

  // ... rest of your start scene logic here ...

  // Button click event handler
  button.on('pointerdown', () => {
    this.scene.start('mapScene'); // Transition to the map scene
  });
}
