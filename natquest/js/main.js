const startSceneConfig = {
  key: 'StartScene',
  create: function() {
    // Add a start button
    const startButton = this.add.text(400, 300, 'Start', {
      font: '32px Arial',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 },
    })
    .setOrigin(0.5)
    .setInteractive();

    // Set a callback function for the button click event
    startButton.on('pointerdown', function () {
      // Transition to the main scene when the button is clicked
      this.scene.start('MainScene');
    }, this);
  },
};

const mainSceneConfig = {
  key: 'MainScene',
  // Your existing create, preload, and update functions go here
  preload: 
    function preload() {
  this.load.image("tiles", "assets/tilesets/tilemap1.png");
  this.load.tilemapTiledJSON("map", "assets/json/map.json"); //"../assets/tilemaps/ use the ../???
},
  create: function create() {
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
},
  update:

function update(time, delta) {
  // Apply the controls to the camera each update tick of the game
  controls.update(delta);
},
};

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  pixelArt: true,
  scene: [startSceneConfig, mainSceneConfig], // Add both scenes to the game
};

const game = new Phaser.Game(config);
let controls;

// Your existing functions (preload, create, update) go here

// Instead of directly calling create, use the StartScene
// Remove the line: game.scene.start('StartScene');

// After creating the game instance, Phaser automatically starts the first scene in the scene list,
// which is 'StartScene' in this case.






