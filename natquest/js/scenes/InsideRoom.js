import { PlayerSprite } from './PlayerSprite.js';

export default class InsideRoom extends Phaser.Scene {
  constructor() {
    super({ key: 'InsideRoom' });
  }

  init(data) {
    this.mapKey = data.mapKey;
    this.player = data.player;
    this.speed = data.speed;
    this.camera = data.camera;
    this.controls = data.controls; // Include other properties if needed
 //   this.map = data.map;
   // this.collisionObjects = data.collisionObjects;
    //this.transitionSensors = data.transitionSensors;
    this.engine = data.engine;
    this.world = data.world;
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
    this.player = new PlayerSprite(this, /* specify player position */, 'player');

    // Set world bounds for the player
    // Adjust boundaryOffset and other settings as needed
    const boundaryOffset = 2;
    const worldBounds = new Phaser.Geom.Rectangle(
        boundaryOffset,
        boundaryOffset,
        map.widthInPixels - 2 * boundaryOffset,
        map.heightInPixels - 2 * boundaryOffset
    );
    this.world.setBounds(0, 0, worldBounds.width, worldBounds.height);

    // Additional setup specific to this scene
  }

  update(time, delta) {
    // Update method code here
  }
}
