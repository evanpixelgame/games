class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class
    this.controls = null;
  }

  preload() {
  
  }

  create() {
    // Load tilemap
    const map = this.make.tilemap({ key: 'map' });

    // Load tileset
    const tileset = map.addTilesetImage('tilemap1', 'tiles');

    // Create layers
    const worldLayer = map.createLayer('Tile Layer 1', tileset, 0, 0);
    const worldObjectLayer = map.createLayer('Tile Layer 2', tileset, 0, 0);
    const worldCollisionObjectLayer = map.createLayer('Tile Layer 3', tileset, 0, 0);

    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;

    this.input.addPointer(3); // Add up to 3 pointers for multi-touch support

  // Create controls for both keyboard and mobile
  const cursors = this.input.keyboard.createCursorKeys();
  this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
    camera: this.cameras.main,
    left: cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    speed: 0.5,
  });

  // Handle mobile input
  this.input.on('pointermove', (pointer) => {
    if (pointer.isDown) {
      // Use the distance moved by the pointer to control camera movement
      const deltaX = pointer.x - pointer.prevPosition.x;
      const deltaY = pointer.y - pointer.prevPosition.y;

      // Adjust the camera position based on pointer movement
      this.cameras.main.scrollX += deltaX;
      this.cameras.main.scrollY += deltaY;
    }
  });

  // ... (existing code)
}

update(time, delta) {
  // Apply the controls to the camera each update tick of the game
  if (this.controls) {
    this.controls.update(delta);

    // Adjust the camera position for mobile controls
    if (this.input.activePointer.isDown) {
      const deltaX = this.input.activePointer.x - this.input.activePointer.prevPosition.x;
      const deltaY = this.input.activePointer.y - this.input.activePointer.prevPosition.y;

      this.cameras.main.scrollX += deltaX;
      this.cameras.main.scrollY += deltaY;
    }
  }

window.OpenWorld = OpenWorld;
