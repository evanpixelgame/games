import { PlayerSprite } from './PlayerSprite.js';
import { createCollisionObjects, createTransitionSensors, TransitionSensorHandler, handleBarrierCollision,  } from './collisionHandler.js';

export default class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class (should I delete these and put in the init func?
    this.controls = null;
    this.map = null;
    this.player = null;
    this.speed = 2; 
    this.collisionObjects = null; 
  }

  init(data) {
        this.openWorldScene = data.OpenWorld;
    }
      
  preload() {
    
  }

  create() {
        // Create Matter.js engine
    this.matterEngine = this.matter.world;
 //  this.matterEngine.gravity.y = 0.5;
    const engine = Matter.Engine.create();
const world = engine.world;


    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.scene.launch('MobileControls', { player: this.player, speed: this.speed });
      }
     this.scene.launch('ComputerControls', { player: this.player, speed: this.speed });
     this.scene.launch('PlayerAnimations', { player: this.player, speed: this.speed });
   this.scene.launch('CompUI', { OpenWorld: this, player: this.player, speed: this.speed, map: this.map, camera: this.cameras.main });

  //Load map
  const map = this.make.tilemap({ key: 'map' });

    
    // Load tileset
     const tileset1 = map.addTilesetImage('tilesheetTerrain', 'tilesheetTerrain');
     const tileset2 = map.addTilesetImage('tilesheetInterior', 'tilesheetInterior');
     const tileset3 = map.addTilesetImage('tilesheetBuildings', 'tilesheetBuildings');
     const tileset4 = map.addTilesetImage('tilesheetWalls', 'tilesheetWalls');
     const tileset5 = map.addTilesetImage('tilesheetObjects', 'tilesheetObjects');
     const tileset6 = map.addTilesetImage('tilesheetFlourishes', 'tilesheetFlourishes');

  // Create layers 
//  const worldLayer = map.createLayer('Tile Layer 1', tileset1, 0, 0);
 //  const layer2 = map.createLayer('Tile Layer 2', [tileset2, tileset3, tileset4, tileset5, tileset6], 0, 0);
//   const layer3 = map.createLayer('Tile Layer 3', tileset3, 0, 0);

   
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

// Create layers using all tilesets ('Object Layer 1' layer creation is in collisionHanlder.js aka collision barrier layer 
const layers = [];
for (let i = 0; i < map.layers.length; i++) {
    layers.push(map.createLayer(i, tilesets, 0, 0));
}

    this.player = new PlayerSprite(this, 495, 325, 'player'); // Create the player object

    // Access player properties or methods as needed after it's created
    const playerX = this.player.x;
    const playerY = this.player.y;
    
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
     //this.collisionObjects2 = createTransitionSensors(this, map);
     this.transitionSensors = createTransitionSensors(this, map); // Create transition sensors
   
Matter.Events.on(world, 'collisionStart', (event) => {
  const pairs = event.pairs;

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    if (pair.bodyA === player || pair.bodyB === player) {
      if (transitionSensors.includes(pair.bodyA) || transitionSensors.includes(pair.bodyB)) {
        // Player collided with a transition zone
        console.log('Collision detected with transition sensor');
        // Perform actions or scene transitions here
        this.scene.start('InsideRoom'); // Example scene transition
      }
    }
  }
});


 /*
 // Set up collision events between the player and transition sensors
    this.transitionSensors.forEach(sensor => {
        this.matterCollision.addOnCollideStart({
            objectA: this.player,
            objectB: sensor,
            callback: () => {
                console.log('Collision detected with transition sensor');
                // Optionally, perform any actions or scene transitions upon collision
                // For example, transition to a new scene upon collision
                this.scene.start('InsideRoom');
            }
        });
    });
*/

    //*****************************************CAMERA CONTROLS****************************************************
  // Constrain the camera
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        const startMenuScene = this.scene.get('StartMenu');
        this.cameras.main.setZoom(2);

/*
    // Handle collisions with Object Layer 1 and Object Layer 2
    Matter.Events.on(this.matter.world, 'collisionStart', (event) => {
        event.pairs.forEach((pair) => {
            // Collision with Object Layer 1
            if ((pair.bodyA === this.player.body || pair.bodyB === this.player.body) &&
                (this.collisionObjects.includes(pair.bodyA) || this.collisionObjects.includes(pair.bodyB))) {
                handleBarrierCollision(this.player, pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA);
            }
            // Collision with Object Layer 2
            else if ((pair.bodyA === this.player.body || pair.bodyB === this.player.body) &&
                (this.collisionObjects2.includes(pair.bodyA) || this.collisionObjects2.includes(pair.bodyB))) {
                // Call the handler function to transition to the InsideRoom scene
                console.log('should be transitioning scenes msg coming from open world scene');
                ObjectLayer2Handler(this, this.player, pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA);
            }
        });
    });
*/
    
    
  } // <==== create func end tag    

//*****************************************************END OF CREATE FUNC ABOVE*******************************************************

  //*****************************************************************END METHODS, START OF UPDATE FUNC**************************************
  
  
update(time, delta) {

}



  
}
window.OpenWorld = OpenWorld;
