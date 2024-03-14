class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class
    this.controls = null;
  //  this.isMobile = null;
  //  this.isComputer = true;
    this.map = null;
    //this.player = welcomePlayer.player; // Declare player as a property of the class
    this.speed = 200; // Move the speed declaration here
   // let selectedCharacter = this.selectedCharacter;
    //this.playerCharacter = this.selectedCharacter;
  }
      
  preload() {
    
  }

  create() {

    
       if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
    this.scene.launch('MobileControls');
       }
      this.scene.launch('ComputerControls', { player: this.player, speed: this.speed });
      const player = this.scene.get('WelcomePlayer').getData('player');
    
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

    // Set world bounds slightly smaller than the map size
    const boundaryOffset = 20; // Adjust this value as needed
    const worldBounds = new Phaser.Geom.Rectangle(
        boundaryOffset,
        boundaryOffset,
        map.widthInPixels - 2 * boundaryOffset,
        map.heightInPixels - 2 * boundaryOffset
    );

    this.physics.world.setBounds(worldBounds.x, worldBounds.y, worldBounds.width, worldBounds.height);
    this.player.setCollideWorldBounds(true);

     this.speed = 200;

  // Constrain the camera
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
  this.createAnimations();
    
  }

  createAnimations() {
    this.anims.create({
        key: 'walking-up',
        frames: this.anims.generateFrameNames('player', {
            frames: [
              130, 131, 132, 133, 134, 135, 136, 137, 138
            ]
        }),
        yoyo: false,
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'walking-left',
        frames: this.anims.generateFrameNames('player', {
            frames: [
              117, 118, 119, 120, 121, 122, 123, 124, 125
            ]
        }),
        yoyo: false,
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'walking-down',
        frames: this.anims.generateFrameNames('player', {
            frames: [
                104, 105, 106, 107, 108, 109, 110, 111, 112
            ]
        }),
        yoyo: false,
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'walking-right',
        frames: this.anims.generateFrameNames('player', {
            frames: [
              143, 144, 145, 146, 147, 148, 149, 150, 151 
            ]
        }),
        yoyo: false,
        frameRate: 12,
        repeat: -1
    });
  } // <=== create() end tag

  update(time, delta) {
    
  }
}
window.OpenWorld = OpenWorld;
