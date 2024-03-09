class WorldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WorldScene' });
  }

  preload() {
    this.load.image('tiles', 'assets/tilesets/tilemap1.png');
    this.load.tilemapTiledJSON('map', 'assets/json/map.json');
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

  // Create controls
  const cursors = this.input.keyboard.createCursorKeys();
  controls = new Phaser.Cameras.Controls.FixedKeyControl({
    camera: this.cameras.main,
    left: cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    speed: 0.5,
  });

  // Constrain the camera
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  // Help text
  this.add
    .text(16, 16, 'Arrow keys to scroll', {
      font: '18px monospace',
      fill: '#ffffff',
      padding: { x: 20, y: 10 },
      backgroundColor: '#000000',
    })
    .setScrollFactor(0);
}


  update(time, delta) {
    // Apply the controls to the camera each update tick of the game
    controls.update(delta);
  }
}

window.WorldScene = WorldScene;
