import { PlayerSprite } from './PlayerSprite.js';
import { PlayerControls } from './PlayerControls.js';
import { sensorMapSet, createCollisionObjects, sensorHandler } from './collisionHandler.js';

export default class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class (should I delete these and put in the init func?
    this.controls = null;
    this.map = null;
    this.player = null;
    this.velocity = 2; 
    this.collisionObjects = null; 
    this.transitionSensors = null; // Add transitionSensors property
    this.engine = null;
   this.world = null;
  }

  init(data) {
        this.openWorldScene = data.OpenWorld;
  }
      
  preload() {
    
  }
       
  
  
  create() {
    // Create Matter.js engine
    this.matterEngine = Phaser.Physics.Matter.Matter.World;
    this.engine = this.matter.world;
     this.world = this.matterEngine.create({
    // your Matter.js world options here
  });

    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.scene.launch('MobileControls', { player: this.player, speed: this.speed });
    }

  //  this.scene.launch('PlayerAnimations', { player: this.player, speed: this.speed }); // READD ANIMATIONS AFTER CONTROLS HAVE BEEN WORKED OUT
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

    this.player = new PlayerSprite(this, 495, 325, 'player');

    if (this.player) {
     //  this.scene.launch('ComputerControls', { player: this.player, cursors: this.cursors, speed: this.speed }); // velocity: this.velocity }); //Computer controls launched here after this.player aka this.player.body has been established
      this.controls = new PlayerControls(this, this.player, this.velocity, this.player.x, this.player.y, this.player.texture);  //, this.player.frame);
    }

// Set world bounds for the player
const boundaryOffset = 2; // Adjust this value as needed
const worldBounds = new Phaser.Geom.Rectangle(
    boundaryOffset,
    boundaryOffset,
    map.widthInPixels - 2 * boundaryOffset,
    map.heightInPixels - 2 * boundaryOffset
);

this.matter.world.setBounds(0, 0, worldBounds.width, worldBounds.height);
          
    // Create collision objects
    this.collisionObjects = createCollisionObjects(this, map);
   this.sensorMapping = sensorMapSet(this, map, this.sensorID);  //this.transitionSensors?
//this.sensorHandling = sensorHandler(this, map, this.player); //used to have this.transitionSensors as an argument then it became  this.sensorID
          
    // Constrain the camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setZoom(2);
  }
  
 
  update(time, delta) {

  }
  
}
window.OpenWorld = OpenWorld;
