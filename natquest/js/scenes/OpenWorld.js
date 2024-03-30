import { PlayerSprite } from './PlayerSprite.js';
import { sensorMapSet, createCollisionObjects, sensorHandler } from './collisionHandler.js';
import { gameManager } from '../gameState.js';
import { ComputerControls } from './ComputerControls.js';

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
//    this.world = this.engine.world;
     this.world = this.matterEngine.create({
    // your Matter.js world options here
  });
console.log('HELLO THERE PLEASE LOG ' + this.world);
    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.scene.launch('MobileControls', { player: this.player, speed: this.speed });
    }
 //  this.controls = null;
 //  this.controls = this.scene.get('ComputerControls'); 
 
  

   
 //this.controls = this.scene.launch('ComputerControls', { player: this.player, speed: this.speed });
  /* this.scene.launch('ComputerControls', { player: this.player, speed: this.speed }, (scene) => {
  this.controls = scene; // Scene instance passed as argument
}); */
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

    this.player = new PlayerSprite(this, 495, 325, 'player', initialVelocityX, initialVelocityY); // Create the player object, just took away this.world as 2nd argument
  // Listen for the 'created' event on the player sprite
            const playerBodyWorld = this.player.body ? this.player.body.world : null;
        console.log('Player Body World123:', playerBodyWorld);

      
    console.log(this.player.body);
    console.log('Player World:', this.player.body.world);
    console.log('Player Body:', this.player.body);
console.log('Player GameObject:', this.player.gameObject);
          console.log('Player Body GameObject:', this.player.body.gameObject);
             console.log('Player Body GameObject layer:', this.player.body.gameObject.layer);

  //  console.log('Player Layer Index:', this.player.body.gameObject.layer.index);

// Set world bounds for the player
const boundaryOffset = 2; // Adjust this value as needed
const worldBounds = new Phaser.Geom.Rectangle(
    boundaryOffset,
    boundaryOffset,
    map.widthInPixels - 2 * boundaryOffset,
    map.heightInPixels - 2 * boundaryOffset
);

this.matter.world.setBounds(0, 0, worldBounds.width, worldBounds.height);
          
           console.log(this.world);
    // Create collision objects
    this.collisionObjects = createCollisionObjects(this, map);
//    this.transitionSensors = createTransitionSensor(this, map, this.player, this.sensorID); 
//  console.log('fromopenworldattempt' + transitionSensors[transitionSensor]);
   this.sensorMapping = sensorMapSet(this, map, this.sensorID);  //this.transitionSensors?
  // Use TransitionSensorHandler to handle collision events with transition sensors
this.sensorHandling = sensorHandler(this, map, this.player); //used to have this.transitionSensors as an argument then it became  this.sensorID
          


    // Constrain the camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    const startMenuScene = this.scene.get('StartMenu');
    this.cameras.main.setZoom(2);

   console.log('PLEASE PLEASE LOG' + this.world);
   console.log('PRETTY PLEASE' + this.controls);
   console.log('PRETY PLZ LOG VELOCITY FROM OPENWORLD: ' + this.velocity);
 console.log('TITI IS SO PRETTY HERES SENSORID OBJECT: ' + gameManager.sensorID.fastZone);

    this.scene.events.once('update', this.createComputerControls, this);
  }
   

  createComputerControls() {
    // Create ComputerControls instance
    this.controls = new ComputerControls(this, 0, 0, this.player, this.speed);
  }

        
  update(time, delta) {
     if (this.controls) {
        this.controls.update(time, delta);
    }
  }
}

window.OpenWorld = OpenWorld;
