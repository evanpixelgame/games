import { PlayerSprite } from './PlayerSprite.js';

export default class InsideRoom extends Phaser.Scene {
  constructor() {
    super({ key: 'InsideRoom' });
  }


  init(data) {
    // Check if the necessary data is provided
   // Check if the necessary data is provided
if (!data || !data.player || !data.speed || !data.camera || !data.controls || !data.engine || !data.world) {
    let missingData = [];
    if (!data) {
        missingData.push("data");
    } else {
        if (!data.player) missingData.push("player");
        if (!data.speed) missingData.push("speed");
        if (!data.camera) missingData.push("camera");
        if (!data.controls) missingData.push("controls");
        if (!data.engine) missingData.push("engine");
        if (!data.world) missingData.push("world");
    }
    console.error("Missing required data for InsideRoom scene initialization: " + missingData.join(", "));
    return;
}


    // Initialize properties
    this.player = data.player;
    this.speed = data.speed;
    this.camera = data.camera;
   // this.controls = data.controls;
   // this.engine = data.engine;
    this.world = data.world;

    // Debugging: Log initialized properties
    console.log("InsideRoom initialized with:", {
        player: this.player,
        speed: this.speed,
        camera: this.camera,
       controls: this.controls,
        engine: this.engine,
       world: this.world
    });

    // Check if the necessary data is provided
if (!data || !data.player || !data.speed || !data.camera || !data.controls || !data.engine || !data.world) {
    let missingData = [];
    if (!data) {
        missingData.push("data");
    } else {
        if (!data.player) missingData.push("player");
        if (!data.speed) missingData.push("speed");
        if (!data.camera) missingData.push("camera");
        if (!data.controls) missingData.push("controls");
        if (!data.engine) missingData.push("engine");
        if (!data.world) missingData.push("world");
    }
    console.error("Missing required data for InsideRoom scene initialization: " + missingData.join(", "));
    return;
}

}

  preload() {
    // Preload assets if needed
  }

  create() {
    // Create the new map using the loaded tilemap
    const map = this.make.tilemap({ key: this.mapKey });

    // Load tileset
    const tilesetsData = [
        { name: 'tilesheetInterior', key: 'tilesheetInterior' },
        { name: 'tilesheetWalls', key: 'tilesheetWalls' },
        { name: 'tilesheetObjects', key: 'tilesheetObjects' },
    ];

    const tilesets = [];
    tilesetsData.forEach(tilesetData => {
        tilesets.push(map.addTilesetImage(tilesetData.name, tilesetData.key));
    });

    // Create layers using all tilesets
    const layers = [];
    for (let i = 0; i < map.layers.length; i++) {
        layers.push(map.createLayer(i, tilesets, 0, 0));
    }

    // Initialize player sprite
    this.player = new PlayerSprite(this, 495, 325, 'player');

    this.player.setVelocityX(0); // Set initial X velocity to 0
    this.player.setVelocityY(0); // Set initial Y velocity to 0

    // Set world bounds for the player
    // Adjust boundaryOffset and other settings as needed
    const boundaryOffset = 2;
    const worldBounds = new Phaser.Geom.Rectangle(
        boundaryOffset,
        boundaryOffset,
        map.widthInPixels - 2 * boundaryOffset,
        map.heightInPixels - 2 * boundaryOffset
    );
   // this.world.setBounds(0, 0, worldBounds.width, worldBounds.height);

  }

  update(time, delta) {
  }
}

window.InsideRoom = InsideRoom;
