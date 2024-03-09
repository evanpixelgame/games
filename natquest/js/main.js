
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
let controls;

function preload() {
  this.load.image("tiles", "assets/tilesets/tilemap1.png");
  this.load.tilemapTiledJSON("map", "assets/json/map.json"); //"../assets/tilemaps/ use the ../???
}

function create() {
  const map = this.make.tilemap({ key: "map" });

  // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name you used in preload)
  const tileset = map.addTilesetImage("tilemap1", "tiles");

  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const worldLayer = map.createLayer("Tile Layer 1", tileset, 0, 0);
  const worldObjectLayer = map.createLayer("Tile Layer 2", tileset, 0, 0);
  const worldCollisionObjectLayer = map.createLayer("Tile Layer 3", tileset, 0, 0);


  // Phaser supports multiple cameras, but you can access the default camera like this:
  const camera = this.cameras.main;

  // Set up the arrows to control the camera
// Still need to create the cursor keys and individual WASD keys
const cursors = this.input.keyboard.createCursorKeys();
const wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
const aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
const sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
const dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

// Combine corresponding keys for each direction
const combinedKeys = {
    up: [cursors.up, wKey],
    down: [cursors.down, sKey],
    left: [cursors.left, aKey],
    right: [cursors.right, dKey],
};

// Use the combined keys in the control configuration
controls = new Phaser.Cameras.Controls.FixedKeyControl({
    camera: camera,
    up: combinedKeys.up,
    down: combinedKeys.down,
    left: combinedKeys.left,
    right: combinedKeys.right,
    speed: 0.5, // Adjust speed as needed
});



  // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  // Help text that has a "fixed" position on the screen
  this.add
    .text(16, 16, "Arrow keys to scroll", {
      font: "18px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
      backgroundColor: "#000000",
    })
    .setScrollFactor(0);
}

function update(time, delta) {
  // Apply the controls to the camera each update tick of the game
  controls.update(delta);
}
