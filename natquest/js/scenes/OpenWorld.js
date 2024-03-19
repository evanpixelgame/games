class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class (should I delete these and put in the init func?
    this.controls = null;
    this.map = null;
    this.player = null;
    this.speed = 200; 
    this.collisionObjects = null; 
  }

  init(data) {
        this.openWorldScene = data.OpenWorld;
    }
      
  preload() {
    
  }

  create() {

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
  const worldCollisionObjectLayer = map.createLayer('Tile Layer 3', tileset, 0, 0);

  // Create player sprite
  this.player = this.scene.get('WelcomePlayer').player;
  this.player = this.physics.add.sprite(15, 15, 'player');

  // Set world bounds for the player
    const boundaryOffset = 2; // Adjust this value as needed
    const worldBounds = new Phaser.Geom.Rectangle(
        boundaryOffset,
        boundaryOffset,
        map.widthInPixels - 2 * boundaryOffset,
        map.heightInPixels - 2 * boundaryOffset
    );

    this.physics.world.setBounds(worldBounds.x, worldBounds.y, worldBounds.width, worldBounds.height);
    this.player.setCollideWorldBounds(true);


// Get the object layer from the tilemap
const objectLayer = map.getObjectLayer('Object Layer 1');

      // Store reference to collision objects
        this.collisionObjects = this.physics.add.staticGroup();
        objectLayer.objects.forEach(object => {
            const collisionObject = this.add.rectangle(object.x + object.width / 2, object.y + object.height / 2, object.width, object.height);
            this.physics.world.enable(collisionObject, Phaser.Physics.Arcade.STATIC_BODY);
            collisionObject.setOrigin(0, 0);
            collisionObject.setVisible(false);
            this.collisionObjects.add(collisionObject); // Add collision object to group
        });
    

// Enable physics on each object in the object layer
objectLayer.objects.forEach(object => {
    // Create a rectangle sprite for each object and add it to the scene
    const collisionObject = this.add.rectangle(object.x + object.width / 2, object.y + object.height / 2, object.width, object.height);
    
    // Enable physics on the collision object
    this.physics.world.enable(collisionObject, Phaser.Physics.Arcade.STATIC_BODY);
    
    // Optionally, you can set additional properties for the collision object
    collisionObject.setOrigin(0, 0); // Adjust origin as needed
    collisionObject.setVisible(false); // Optionally hide the collision object
});

    




    //*****************************************CAMERA CONTROLS****************************************************
  // Constrain the camera
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

        const startMenuScene = this.scene.get('StartMenu');
        this.cameras.main.setZoom(2);
        this.player.setScale(0.5); 

    
  } // <==== create func end tag    

//*****************************************************END OF CREATE FUNC ABOVE*******************************************************

//*************************************************************OPEN WORLD METHODS*****************************************************
/*   BOUNCE BACK COLLISION BOUNDARY
handleOverlap(player, collisionObject) {
    // Calculate the overlap depth between the player and the collision object
    const overlapX = Math.abs(player.x - collisionObject.x);
    const overlapY = Math.abs(player.y - collisionObject.y);

    // Determine which direction the player should be pushed back based on the overlap
    let pushX = 0;
    let pushY = 0;

    if (overlapX > overlapY) {
        // Push the player horizontally
        pushX = this.player.x < collisionObject.x ? -overlapX : overlapX;
    } else {
        // Push the player vertically
        pushY = this.player.y < collisionObject.y ? -overlapY : overlapY;
    }

    // Update player's position to move them outside the collision object
    player.x += pushX;
    player.y += pushY;

    // Stop the player's movement
    this.player.setVelocity(0, 0);
}
*/

  handleOverlap(player, collisionObject) {
    // Calculate the overlap depth between the player and the collision object
    const overlapX = Math.abs(player.x - collisionObject.x);
    const overlapY = Math.abs(player.y - collisionObject.y);

    // Determine the direction of overlap
    const directionX = player.x < collisionObject.x ? -1 : 1;
    const directionY = player.y < collisionObject.y ? -1 : 1;

    // Calculate the push amount based on the direction of overlap
    const pushX = overlapX * directionX;
    const pushY = overlapY * directionY;

    // Update player's position to move them outside the collision object
    player.x += pushX;
    player.y += pushY;

    // Stop the player's movement in the direction of the collision
    if (overlapX > overlapY) {
        // Horizontal collision, stop horizontal movement
        player.setVelocityX(0);
    } else {
        // Vertical collision, stop vertical movement
        player.setVelocityY(0);
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
    
 this.physics.overlap(this.player, this.collisionObjects, this.handleOverlap, null, this);
    
  }
  
}
window.OpenWorld = OpenWorld;
