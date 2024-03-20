class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class (should I delete these and put in the init func?
    this.controls = null;
    this.map = null;
    this.player = null;
    this.speed = 1; 
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
    // Set gravity (optional)
  //  this.matterEngine.gravity.y = 0.5;
    // Other initialization code...

     if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.scene.launch('MobileControls', { player: this.player, speed: this.speed });
     //  this.cameras.main.setZoom(2);
       }
      this.scene.launch('ComputerControls', { player: this.player, speed: this.speed });
     this.scene.launch('PlayerAnimations', { player: this.player, speed: this.speed });
     this.scene.launch('CompUI', { OpenWorld: this, player: this.player, speed: this.speed });

  //Load map
  const map = this.make.tilemap({ key: 'map' });
  // Load tileset
  const tileset = map.addTilesetImage('tilemap1', 'tiles');

  // Create layers
  const worldLayer = map.createLayer('Tile Layer 1', tileset, 0, 0);
//  const worldObjectLayer = map.createLayer('Object Layer 1', tileset, 0, 0);
 // const worldCollisionObjectLayer = map.createLayer('Tile Layer 3', tileset, 0, 0);

  // Create player sprite
  this.player = this.scene.get('WelcomePlayer').player;
this.player = this.matter.add.sprite(15, 15, 'player');

    const playerWidth = this.player.width;
const playerHeight = this.player.height;


    this.player.setBody({
    type: 'rectangle', // Set the body type as a rectangle
    width: playerWidth / 2,/* Width of your player sprite */
    height: playerHeight / 2,/* Height of your player sprite */
    isStatic: false, // Set to true if your player shouldn't move
    restitution: 0, // Bounce (0 = no bounce, 1 = full bounce)
    friction: .1, // Friction (0 = no friction, 1 = full friction)
    frictionAir: 0.02, // Air friction (drag)
    // Other optional properties...
});

  // Set world bounds for the player
    const boundaryOffset = 2; // Adjust this value as needed
    const worldBounds = new Phaser.Geom.Rectangle(
        boundaryOffset,
        boundaryOffset,
        map.widthInPixels - 2 * boundaryOffset,
        map.heightInPixels - 2 * boundaryOffset
    );

   this.matterEngine.setBounds(0, 0, worldBounds.width, worldBounds.height);


// Get the object layer from the tilemap
const objectLayer = map.getObjectLayer('Object Layer 1');

// Create an empty array to store collision objects
this.collisionObjects = [];

objectLayer.objects.forEach(object => {
    const centerX = object.x + object.width / 2;
    const centerY = object.y + object.height / 2;

    const collisionObject = this.matter.add.rectangle(centerX, centerY, object.width, object.height, { isStatic: true });
    //collisionObject.setVisible(false); // Optionally hide the collision object
    this.collisionObjects.push(collisionObject); // Add collision object to the array
});




    //*****************************************CAMERA CONTROLS****************************************************
  // Constrain the camera
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        const startMenuScene = this.scene.get('StartMenu');
        this.cameras.main.setZoom(2);
        this.player.setScale(0.5);

    
        const scaledWidth = this.player.width * 0.5; // Scale the width
        const scaledHeight = this.player.height * 0.5; // Scale the height

          // Set the size of the player's collision body
        this.player.setSize(scaledWidth, scaledHeight);

    
  } // <==== create func end tag    

//*****************************************************END OF CREATE FUNC ABOVE*******************************************************

//*************************************************************OPEN WORLD METHODS*****************************************************

handleBarrierCollision(player, barrier) {
    // Calculate the overlap between the player and the barrier
    const overlapX = this.player.x - barrier.x;
    const overlapY = this.player.y - barrier.y;

    // Check if the player is moving towards the barrier along the X-axis
    if (this.player.body.velocity.x > 0 && overlapX < 0) {
        // Player is moving right and overlapping on the left side of the barrier
        this.player.body.velocity.x = 0; // Stop horizontal movement
        this.player.x = barrier.x - this.player.width / 2;
    } else if (this.player.body.velocity.x < 0 && overlapX > 0) {
        // Player is moving left and overlapping on the right side of the barrier
        this.player.body.velocity.x = 0; // Stop horizontal movement
        this.player.x = barrier.x + barrier.width + this.player.width / 2;
    }

    // Check if the player is moving towards the barrier along the Y-axis
    if (this.player.body.velocity.y > 0 && overlapY < 0) {
        // Player is moving down and overlapping on the top side of the barrier
        this.player.body.velocity.y = 0; // Stop vertical movement
        this.player.y = barrier.y - this.player.height / 2;
    } else if (this.player.body.velocity.y < 0 && overlapY > 0) {
        // Player is moving up and overlapping on the bottom side of the barrier
        this.player.body.velocity.y = 0; // Stop vertical movement
        this.player.y = barrier.y + barrier.height + this.player.height / 2;
    }
}



  //**************************************************************ZOOM IN/OUT METHODS***************************************************
 zoomIn() {
        if (this.cameras.main.zoom < 3) {
            this.cameras.main.zoom *= 1.1; // Increase zoom by 10%
        } else {
            console.log('Maximum zoom level reached.');
        }
    }

   zoomOut() {
        if (this.cameras.main.zoom > 1) { // Set a minimum zoom level (0.2 is just an example)
            this.cameras.main.zoom /= 1.1; // Decrease zoom by 10%
        } else {
            console.log('Minimum zoom level reached.');
        }
    }


  //*****************************************************************END METHODS, START OF UPDATE FUNC**************************************
  
  
  update(time, delta) {

        Matter.Events.on(this.matter.world, 'collisionStart', (event) => {
        event.pairs.forEach((pair) => {
            if (pair.bodyA === this.player.body || pair.bodyB === this.player.body) {
                if (this.collisionObjects.includes(pair.bodyA) || this.collisionObjects.includes(pair.bodyB)) {
                    this.handleBarrierCollision();
                }
            }
        });
    });

  
  }
  
}
window.OpenWorld = OpenWorld;
