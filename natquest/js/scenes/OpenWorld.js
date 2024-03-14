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
  }

  update(time, delta) {
// Clamp sprite position
//this.player.x = Phaser.Math.Clamp(this.player.x, this.camera.scrollX, this.camera.scrollX + this.camera.width);
//this.player.y = Phaser.Math.Clamp(this.player.y, this.camera.scrollY, this.camera.scrollY + this.camera.height);
//Alt clamp attempt
    //const { width, height } = this.game.scale;
   ///   const clampedX = Math.max(0, Math.min(this.player.x, width - this.player.width));
   //   const clampedY = Math.max(0, Math.min(this.player.y, height - this.player.height));
   //  this.player.setPosition(clampedX, clampedY);

     //     const camera = this.cameras.main;
          //Clamp player position
        // this.player.x = Phaser.Math.Clamp(this.player.x, camera.worldView.left, camera.worldView.right - this.player.width);
      //   this.player.y = Phaser.Math.Clamp(this.player.y, camera.worldView.top, camera.worldView.bottom - this.player.height);
    

    

 //   this.cameras.main.centerOn(this.player.x, this.player.y);
   // this.cameras.main.setSnap(window.innerWidth / 2, window.innerHeight / 2);
   // this.cameras.main.scrollY = this.player.y + 200;
  }
  
}
window.OpenWorld = OpenWorld;
