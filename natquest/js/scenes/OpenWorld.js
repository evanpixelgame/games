import { PlayerSprite } from './PlayerSprite.js';
import { createCollisionObjects, createTransitionSensors, TransitionSensorHandler, handleBarrierCollision } from './collisionHandler.js';

export default class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class (should I delete these and put in the init func?
    this.controls = null;
    this.map = null;
    this.player = null;
    this.speed = 2; 
    this.collisionObjects = null; 
    this.transitionSensors = null; // Add transitionSensors property
  }

  init(data) {
        this.openWorldScene = data.OpenWorld;
  }
      
  preload() {
    
  }

  create() {
    // Create Matter.js engine
    this.matterEngine = this.matter.world;
    const engine = Matter.Engine.create();
    const world = engine.world;

    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.scene.launch('MobileControls', { player: this.player, speed: this.speed });
    }
    this.scene.launch('ComputerControls', { player: this.player, speed: this.speed });
    this.scene.launch('PlayerAnimations', { player: this.player, speed: this.speed });
    this.scene.launch('CompUI', { OpenWorld: this, player: this.player, speed: this.speed, map: this.map, camera: this.cameras.main });

    // Load map
    const map = this.make.tilemap({ key: 'map' });

    // Load tileset
    const tilesetsData = [
        { name: 'tilesheetTerrain', key: 'tilesheetTerrain' },
        { name: 'tilesheetInterior', key: 'tilesheetInterior' },
        { name: 'tilesheetBuildings', key: 'tilesheetBuildings' },
        { name: 'tilesheetWalls', key: 'tilesheetWalls' },
        { name: 'tilesheetObjects', key: 'tilesheetObjects' },
        { name: 'tilesheetFlourishes', key: 'tilesheetFlourishes' }
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

    this.player = new PlayerSprite(this, 495, 325, 'player'); // Create the player object

    // Set world bounds for the player
    const boundaryOffset = 2; // Adjust this value as needed
    const worldBounds = new Phaser.Geom.Rectangle(
        boundaryOffset,
        boundaryOffset,
        map.widthInPixels - 2 * boundaryOffset,
        map.heightInPixels - 2 * boundaryOffset
    );

    this.matterEngine.setBounds(0, 0, worldBounds.width, worldBounds.height);

    // Create collision objects
    this.collisionObjects = createCollisionObjects(this, map);
    this.transitionSensors = createTransitionSensors(this, map); // Create transition sensors

    // Use TransitionSensorHandler to handle collision events with transition sensors
    TransitionSensorHandler(this, this.player, this.transitionSensors);

    // Constrain the camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    const startMenuScene = this.scene.get('StartMenu');
    this.cameras.main.setZoom(2);

/*
    // Listen for collision events on the Matter.js world
Matter.Events.on(world, 'collisionStart', (event) => {
    const pairs = event.pairs;

    // Iterate through the collision pairs
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];

        // Check if the sensor is involved in the collision
        if (pair.bodyA === sensor || pair.bodyB === sensor) {
            // Perform your desired action when colliding with the sensor
            console.log('Collision detected with sensor');
            
            // Call your callback function here
            // For example, you can start a new scene:
            // scene.scene.start('InsideRoom');
            
            // Break out of the loop if you only want to handle the first collision
            break;
        }
    }
});
*/

  }

  update(time, delta) {
    // Update method code here
  }
}

window.OpenWorld = OpenWorld;
