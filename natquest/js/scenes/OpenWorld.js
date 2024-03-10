class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    // Declare controls as a property of the class
    this.controls = null;
  }

  preload() {
    // Load assets if needed
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

    // Create controls for both keyboard and mobile
    const cursors = this.input.keyboard.createCursorKeys();
    this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera:
