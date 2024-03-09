export const startScene = {
  preload: preloadStart,
  create: createStart,
};

function preloadStart() {
  // No need to load images for this setup
}

function createStart() {
  // Create a red background
  const background = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0xff0000);

  // Create a yellow circle with black text
  const circle = this.add.circle(400, 300, 150, 0xffff00);
  const text = this.add.text(400, 300, "START", {
    fontSize: 48,
    color: 0x000000,
  });
  text.setOrigin(0.5); // Center the text within the circle

  // Make the circle interactive
  circle.setInteractive();

  // Handle circle click to start the map scene
  circle.on('pointerdown', () => {
    this.scene.start('mapScene');
  });
}
