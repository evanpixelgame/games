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

     if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.scene.launch('MobileControls', { player: this.player, speed: this.speed });
     //  this.cameras.main.setZoom(2);
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

/*
    window.addEventListener('orientationchange', () => {
      this.scale.resize(window.innerWidth, window.innerHeight);
            // Reset the scene upon orientation change
      this.scale.setMode(Phaser.Scale.ScaleModes.FIT);
            this.scene.restart();
      this.cameras.main.startFollow(this.player);
      
        });
        */


//window.addEventListener('orientationchange', handleReorientation);
    
  }

/*
function handleOrientationChange() {
  const game = this.game; // Assuming you have a reference to your game instance in this scope

  // Update game canvas dimensions
  game.canvas.width = Math.min(window.screen.availWidth, 800); // Set a maximum width
  game.canvas.height = window.screen.availHeight;
} */
  
  update(time, delta) {
  //  this.cameras.main.centerOn(this.player.x, this.player.y);
   //    this.game.config.width = window.innerHeight;
    //    this.game.config.height = window.innerWidth
     //  this.cameras.main.scrollY = this.player.y + 200;
  }
  
}
window.OpenWorld = OpenWorld;
