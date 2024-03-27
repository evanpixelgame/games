import { PlayerSprite } from './PlayerSprite.js';
import ComputerControls from './ComputerControls.js';
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
    this.world = this.matterEngine.create({
        // your Matter.js world options here
    });
    console.log('Matter.js world:', this.world);

    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.scene.launch('MobileControls', { player: this.player, speed: this.speed });
    }

    // Launch ComputerControls scene
    this.scene.add('ComputerControls', ComputerControls);
    this.scene.launch('ComputerControls', { player: this.player, speed: this.speed });

    console.log('Player:', this.player);
    console.log('Player body:', this.player.body);
    console.log('Player body world:', this.player.body ? this.player.body.world : null);
    console.log('Player GameObject:', this.player.gameObject);
    console.log('Player Body GameObject:', this.player.body.gameObject);
    console.log('Player Body GameObject layer:', this.player.body.gameObject.layer);

    // Set world bounds for the player
    const boundaryOffset = 2; // Adjust this value as needed
    const worldBounds = new Phaser.Geom.Rectangle(
        boundaryOffset,
        boundaryOffset,
        this.map.widthInPixels - 2 * boundaryOffset,
        this.map.heightInPixels - 2 * boundaryOffset
    );
    this.matter.world.setBounds(0, 0, worldBounds.width, worldBounds.height);
    console.log('World bounds:', worldBounds);

    // Other console logs for testing
    console.log('Controls:', this.controls);
    console.log('Camera:', this.cameras.main);

    console.log('OpenWorld scene:', this);
}

TransitionSensorHandler(player, transitionSensors) {
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

                // Additional console logs for testing
                console.log('Player position:', player.body.position);
                console.log('Other body position:', otherBody.position);
            }
        });
    });
}



 TransitionSensorHandler(player, transitionSensors) {
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
  this.scene.start('InsideRoom', {
  player: this.player,
  speed: this.speed,
  camera: this.cameras.main,
  controls: this.controls, // Passing the controls object here
  engine: this.matter.world,
 // world: this.engine.world,
   world: this.world,
});

}
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
