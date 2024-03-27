import PlayerSprite from './PlayerSprite.js';
import ComputerControls from './ComputerControls.js';
import { createCollisionObjects, createTransitionSensors, handleBarrierCollision } from './collisionHandler.js';

export default class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class AKA set up the properties as blank variables for stuff you intend to share with other scenes
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
     this.player = data.player;
    this.speed = data.speed;
    console.log("Received player in ComputerControls:", this.player); // 
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
    console.log('Matter.js world:', this.world);

    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.scene.launch('MobileControls', { player: this.player, speed: this.speed });
    }

    console.log("Player object in OpenWorld:", this.player);
    this.controls = new ComputerControls();
  this.controls.setPlayer(this.player);
    // Launch ComputerControls scene
    this.scene.add('ComputerControls', ComputerControls);
    this.scene.launch('ComputerControls', { player: this.player, speed: this.speed });

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

  
    // Initialize controls after creating the player sprite

    // Define world bounds based on map dimensions
    const boundaryOffset = 2; // Adjust this value as needed
    const worldBounds = new Phaser.Geom.Rectangle(
        boundaryOffset,
        boundaryOffset,
        map.widthInPixels - 2 * boundaryOffset,
        map.heightInPixels - 2 * boundaryOffset
    );

  this.player = new PlayerSprite(this, 500, 500, 'player');

    // Initialize the player sprite
    this.player.init();

    // Add the player sprite to the scene
    this.add.existing(this.player);
    this.matter.add.gameObject(this.player);

    // Set the world property to the scene's matter world
//    this.player.world = this.matter.world;

    this.collisionObjects = createCollisionObjects(this, map);
    this.transitionSensors = createTransitionSensors(this, map, this.player);

    // Use TransitionSensorHandler to handle collision events with transition sensors
    this.TransitionSensorHandler(this.player, this.transitionSensors);
    this.matter.world.setBounds(0, 0, worldBounds.width, worldBounds.height);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setZoom(2);

    console.log('Player:', this.player);
    console.log('Player body:', this.player.body);
    console.log('Player body world:', this.player.body ? this.player.body.world : null);
    console.log('Player GameObject:', this.player.gameObject);
    console.log('Player Body GameObject:', this.player.body.gameObject);
    console.log('Player Body GameObject layer:', this.player.body.gameObject.layer);
    console.log('Controls:', this.controls);
    console.log('Camera:', this.cameras.main);
    console.log('OpenWorld scene:', this);
}




 TransitionSensorHandler(scene, player, transitionSensors) {
    // Listen for collisionstart event on the world property of the scene where the player is created
    this.player.scene.matter.world.on('collisionstart', (eventData) => {
        // Loop through pairs of colliding bodies
        eventData.pairs.forEach(pair => {
            // Check if the player is one of the bodies involved in the collision
            if (pair.bodyA === player.body || pair.bodyB === player.body) {
                // Get the ID of the other body (the one the player collided with)
                const otherBody = pair.bodyA === player.body ? pair.bodyB : pair.bodyA;
                // Log the ID of the other object
                console.log('Collision detected with object ID:', otherBody.id);
              if (otherBody.id == 19) {
   console.log('youve hit the farming pen');
    
}            
             
             if (otherBody.id == 25) {
   console.log('youve hit the sensor by the door');
             //  this.scene.remove('ComputerControls');
  scene.scene.start('InsideRoom', {
  player: scene.player,
  speed: scene.speed,
  camera: scene.cameras.main,
  controls: scene.controls, // Passing the controls object here
  engine: scene.matter.world,
 // world: scene.engine.world,
   world: scene.world,
});

}
            }
        });
    });

       this.scene.start('InsideRoom', {
  player: this.player,
  speed: this.speed,
  camera: this.cameras.main,
  controls: this.controls, // Passing the controls object here
  engine: this.matter.world,
 // world: scene.engine.world,
   world: this.world,
});
}

        
  update(time, delta) {
    // Update method code here
  //  Matter.Runner.run(this.engine);
  }
}

window.OpenWorld = OpenWorld;
