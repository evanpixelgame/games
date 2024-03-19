class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class (should I delete these and put in the init func?
    this.controls = null;
    this.map = null;
    this.player = null;
    this.speed = 200; 
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
  const worldObjectLayer = map.createLayer('Object Layer 1', tileset, 0, 0);
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

        const startMenuScene = this.scene.get('StartMenu');
        this.cameras.main.setZoom(2);
        this.player.setScale(0.5); 

    
  } // <==== create func end tag    

//*****************************************************END OF CREATE FUNC ABOVE*******************************************************

//*************************************************************OPEN WORLD METHODS*****************************************************




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

  }
  
}
window.OpenWorld = OpenWorld;
