import { PlayerSprite } from './PlayerSprite.js';
import { createCollisionObjects, createTransitionSensors, 
        //TransitionSensorHandler,
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

  // Move TransitionSensorHandler inside the class
TransitionSensorHandler(player, transitionSensors) {
    // Listen for collisionstart event on the world property of the scene where the player is created
    this.player.scene.matter.world.on('collisionstart', (eventData) => {
            console.log('shouldbedoingtransitionsensorthing');
        const { bodyA, bodyB } = eventData;
        
        // Check if player (bodyA) collides with a transition sensor (bodyB)
        if (bodyA === player.body && transitionSensors.includes(bodyB)) {
            // Perform scene transition
                console.log('1');
            this.player.scene.start('InsideRoom');
        } else if (bodyB === player.body && transitionSensors.includes(bodyA)) {
            // Perform scene transition (handle the case where player is bodyB)
            console.log('1');
                this.player.scene.start('InsideRoom');
                
        }
    });
}

        
  update(time, delta) {
    // Update method code here
  //  Matter.Runner.run(this.engine);
  }
}

window.OpenWorld = OpenWorld;
