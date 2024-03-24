import { PlayerSprite } from './PlayerSprite.js';
import { createCollisionObjects, handleBarrierCollision } from './collisionHandler.js';

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

    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.scene.launch('MobileControls', { player: this.player, speed: this.speed });
      }
     this.scene.launch('ComputerControls', { player: this.player, speed: this.speed });
     this.scene.launch('PlayerAnimations', { player: this.player, speed: this.speed });
   this.scene.launch('CompUI', { OpenWorld: this, player: this.player, speed: this.speed, map: this.map, camera: this.cameras.main });

  //Load map
  const map = this.make.tilemap({ key: 'map' });

    /*
    // Load tileset
//  const tileset = map.addTilesetImage('tilemap2', 'tiles');
     const tileset1 = map.addTilesetImage('tilesheetTerrain', 'tilesheetTerrain');
     const tileset2 = map.addTilesetImage('tilesheetInterior', 'tilesheetInterior');
     const tileset3 = map.addTilesetImage('tilesheetBuildings', 'tilesheetBuildings');
     const tileset4 = map.addTilesetImage('tilesheetWalls', 'tilesheetWalls');
     const tileset5 = map.addTilesetImage('tilesheetObjects', 'tilesheetObjects');
     const tileset6 = map.addTilesetImage('tilesheetFlourishes', 'tilesheetFlourishes');

  // Create layers ('Object Layer 1' layer creation is in collisionHanlder.js aka collision barrier layer 
  const worldLayer = map.createLayer('Tile Layer 1', tileset1, 0, 0);
     const layer2 = map.createLayer('Tile Layer 2', [tileset2, tileset3, tileset4, tilset5, tilset6], 0, 0);
     const layer3 = map.createLayer('Tile Layer 3', tileset3, 0, 0);
//  const worldObjectLayer = map.createLayer('Object Layer 1', tileset, 0, 0);
 // const worldCollisionObjectLayer = map.createLayer('Tile Layer 3', tileset, 0, 0);
*/
    // Get all tilesets from the map
// Get all tilesets from the map by their keys
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
  console.log('LayerLoadattempthopeful');
    tilesets.push(map.addTilesetImage(tilesetData.name, tilesetData.key));
});

    this.player = new PlayerSprite(this, 15, 15, 'player'); // Create the player object

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



    //*****************************************CAMERA CONTROLS****************************************************
  // Constrain the camera
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        const startMenuScene = this.scene.get('StartMenu');
        this.cameras.main.setZoom(2);
    
  } // <==== create func end tag    

//*****************************************************END OF CREATE FUNC ABOVE*******************************************************

  //*****************************************************************END METHODS, START OF UPDATE FUNC**************************************
  
  
update(time, delta) {
    Matter.Events.on(this.matter.world, 'collisionStart', (event) => {
        event.pairs.forEach((pair) => {
            if (pair.bodyA === this.player.body || pair.bodyB === this.player.body) {
                if (this.collisionObjects.includes(pair.bodyA) || this.collisionObjects.includes(pair.bodyB)) {
                    handleBarrierCollision(this.player, pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA);
                }
            }
        });
    });
}
  
}
window.OpenWorld = OpenWorld;
