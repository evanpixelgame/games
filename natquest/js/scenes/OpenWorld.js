import { PlayerSprite } from './PlayerSprite.js';
import { createCollisionObjects, 
 createTransitionSensors, 
      // TransitionSensorHandler,
        handleBarrierCollision } from './collisionHandler.js';

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
    this.world = this.engine.world;

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

    this.player = new PlayerSprite(this, 495, 325, 'player'); // Create the player object, just took away this.world as 2nd argument
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
    this.transitionSensors = createTransitionSensors(this, map, this.player); 

  // Use TransitionSensorHandler to handle collision events with transition sensors
this.TransitionSensorHandler(this.player, this.transitionSensors);
          


    // Constrain the camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    const startMenuScene = this.scene.get('StartMenu');
    this.cameras.main.setZoom(2);




  }

TransitionSensorHandler(player, transitionSensors) {
    // Listen for collisionstart event on the world property of the scene where the player is created
    this.player.scene.matter.world.on('collisionstart', (eventData) => {
        eventData.pairs.forEach(pair => {
            const { bodyA, bodyB } = pair;

            // Log information about colliding bodies for debugging
            console.log('Body A:', bodyA);
            console.log('Body B:', bodyB);
            console.log('Object A:', bodyA.gameObject);
            console.log('Object B:', bodyB.gameObject);

            // Check if either bodyA or bodyB has the customId property set to 'transitionSensor'
            const isTransitionSensorA = bodyA.gameObject && bodyA.gameObject.customId === 'transitionSensor';
            const isTransitionSensorB = bodyB.gameObject && bodyB.gameObject.customId === 'transitionSensor';

            // Log whether objects are transition sensors for debugging
            console.log('Is Transition Sensor A:', isTransitionSensorA);
            console.log('Is Transition Sensor B:', isTransitionSensorB);

            // Check if player collides with a transition sensor
            if ((bodyA === player.body && isTransitionSensorB) || (bodyB === player.body && isTransitionSensorA)) {
                console.log('Sensor collision detected!'); // Perform scene transition or other actions here
            }
        });
    });
}



        
  update(time, delta) {
    // Update method code here
  //  Matter.Runner.run(this.engine);
  }
}

window.OpenWorld = OpenWorld;
