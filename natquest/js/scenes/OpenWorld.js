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
    // Launch appropriate controls scene based on device type
    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.scene.launch('MobileControls', { player: this.player, speed: this.speed });
    } else {
        this.scene.launch('ComputerControls', { player: this.player, speed: this.speed });
    }
    this.scene.launch('PlayerAnimations', { player: this.player, speed: this.speed });

    // Load map
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

    // Calculate initial camera bounds
    this.calculateCameraBounds();

    // Set world bounds for physics
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

    // Listen for orientation change events
    window.addEventListener('orientationchange', () => {
        // Recalculate camera bounds on orientation change
        this.calculateCameraBounds();
    });
}



calculateCameraBounds() {
    const screenWidth = this.sys.game.config.width; // Get screen width
    const screenHeight = this.sys.game.config.height; // Get screen height

    // Calculate camera bounds based on player's position
    const spriteBounds = this.player.getBounds();
    const cameraBounds = new Phaser.Geom.Rectangle(
        spriteBounds.centerX - screenWidth / 2, // Adjusted to keep sprite centered
        spriteBounds.centerY - screenHeight / 2, // Adjusted to keep sprite centered
        screenWidth,
        screenHeight
    );

    // Set camera bounds
    this.cameras.main.setBounds(cameraBounds.x, cameraBounds.y, cameraBounds.width, cameraBounds.height);
}

  
  update(time, delta) {
   // this.cameras.main.centerOn(this.player.x, this.player.y);
  //  this.game.scale.resize(this.game.config.width, this.game.config.height);
  //     this.game.config.width = window.innerHeight;
    //    this.game.config.height = window.innerWidth
   // this.cameras.main.scrollY = this.player.y + 200;
  }
  
}
window.OpenWorld = OpenWorld;
