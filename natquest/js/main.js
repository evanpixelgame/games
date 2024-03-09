
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

  //these are the simple ways to do it, the function is just so it will accomadate a map of any size and can just cycle through as many layers as it has
  // Parameters: layer name (or index) from Tiled, tileset, x, y
 // const belowLayer = map.createLayer("Below Player", tileset, 0, 0); 
  //const worldLayer = map.createLayer("Tile Layer 1", tileset, 0, 0);
  //const aboveLayer = map.createLayer("Tile Layer 2", tileset, 0, 0);

// Function to create a map from all the layers in JSON data
function createLayerFromJSON(layerData) {
  const name = layerData.name; // Get the layer name from JSON
  const tileset = map.addTilesetImage(layerData.tileset, layerData.tileset); // Add tileset

  // Handle potential errors (e.g., missing data)
  if (!tileset) {
    console.error(`Tileset "${layerData.tileset}" not found in JSON!`);
    return; // Skip creating the layer if tileset is missing
  }

  const layer = map.createLayer(name, tileset, layerData.x || 0, layerData.y || 0); // Create layer with optional x and y offsets
  return layer; // Return the created layer (optional)
}

// Load and parse your JSON file (replace with your actual loading method)
fetch('path/to/your/layers.json')
  .then(response => response.json())
  .then(data => {
    const layers = data.layers || []; // Assuming your JSON has an array named "layers"

    for (const layerData of layers) {
      createLayerFromJSON(layerData);
    }
  })
  .catch(error => {
    console.error('Error loading layers JSON:', error);
  });

  createLayerFromJSON(layerData);


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
