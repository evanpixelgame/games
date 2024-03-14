class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class
    this.controls = null;
    this.map = null;
    this.player = null;
    this.speed = 200; 
  }
      
  preload() {
    
  }

  create() {

// this.scene.launch('MobileControls', { player: this.player, speed: this.speed }); //FOR TESTING
    
     if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.scene.launch('MobileControls', { player: this.player, speed: this.speed });
       }
      this.scene.launch('ComputerControls', { player: this.player, speed: this.speed });
     this.scene.launch('PlayerAnimations', { player: this.player, speed: this.speed });

  //Load map
  const map = this.make.tilemap({ key: 'map' });
  // Load tileset
  const tileset = map.addTilesetImage('tilemap1', 'tiles');

  // Create layers
  const worldLayer = map.createLayer('Tile Layer 1', tileset, 0, 0);
  const worldObjectLayer = map.createLayer('Tile Layer 2', tileset, 0, 0);
  const worldCollisionObjectLayer = map.createLayer('Tile Layer 3', tileset, 0, 0);

  // Create player sprite
  this.player = this.scene.get('WelcomePlayer').player;
  this.player = this.physics.add.sprite(600, 600, 'player');

  // Set world bounds for the player
    const boundaryOffset = 20; // Adjust this value as needed
    const worldBounds = new Phaser.Geom.Rectangle(
        boundaryOffset,
        boundaryOffset,
        map.widthInPixels - 2 * boundaryOffset,
        map.heightInPixels - 2 * boundaryOffset
    );

    this.physics.world.setBounds(worldBounds.x, worldBounds.y, worldBounds.width, worldBounds.height);
    this.player.setCollideWorldBounds(true);

  // Constrain the camera
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

// Handle window resize event
window.addEventListener('resize', () => {
    // Update canvas size to fill the screen       //PUT THIS IN CREATE FUNC
      this.game.config.width = window.innerHeight;
      this.game.config.height = window.innerWidth
   
});  
    
  }

  update(time, delta) {
   
this.cameras.main.centerOn(this.player.x, this.player.y);
   // this.cameras.main.scrollY = this.player.y + 200; DONT NEED 
  
// Set canvas size to fill the screen
this.game.scale.canvas.style.width = '100%';      //Put these in update func
this.game.scale.canvas.style.height = '100%';




     /*  
class YourScene extends Phaser.Scene {
    constructor() {
        super({ key: 'YourScene' });
    }

    create() {
        // Create the sprite at some initial position
        this.sprite = this.add.sprite(100, 100, 'yourSpriteKey');

        // Listen for input or events that trigger sprite destruction
        this.input.on('pointerdown', () => {
            // Destroy the sprite
            this.destroySprite();
        });
    }

    destroySprite() {
        // Store the position of the sprite before destroying it
        const xPos = this.sprite.x;
        const yPos = this.sprite.y;

        // Destroy the sprite
        this.sprite.destroy();

        // Recreate the sprite at the stored position
        this.recreateSprite(xPos, yPos);
    }

    recreateSprite(x, y) {
        // Recreate the sprite at the specified position
        this.sprite = this.add.sprite(x, y, 'yourSpriteKey');

        // Additional setup for the recreated sprite (if needed)
    }
}



*/
  }
  
}
window.OpenWorld = OpenWorld;
