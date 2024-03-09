
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  scene: {
    startScene: preloadStart, // Add the start scene
    createStart,
    mapScene: { // Existing map scene definition
      preload: preload,
      create: create,
      update: update,
    },
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

  //these are the simple ways to do it, the function is just so it will accomadate a map of any size and can just cycle through as many layers as it has
  // Parameters: layer name (or index) from Tiled, tileset, x, y
 // const belowLayer = map.createLayer("Below Player", tileset, 0, 0); 
  const worldLayer = map.createLayer("Tile Layer 1", tileset, 0, 0);
  const worldObjectsLayer = map.createLayer("Tile Layer 2", tileset, 0, 0);

  // Phaser supports multiple cameras, but you can access the default camera like this:
  const camera = this.cameras.main;

  // Set up the arrows to control the camera
  const cursors = this.input.keyboard.createCursorKeys();
  controls = new Phaser.Cameras.Controls.FixedKeyControl({
    camera: camera,
    left: cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    speed: 0.5,
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
