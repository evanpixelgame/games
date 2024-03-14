class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });

    // Declare controls as a property of the class
    this.controls = null;
    this.map = null;
    this.player = null;
    this.speed = 200;
    this.isPortrait = window.innerHeight > window.innerWidth; // Check if the initial orientation is portrait
  }

  preload() {}

  create() {
    // Listen for orientation change event
    window.addEventListener('orientationchange', this.handleOrientationChange.bind(this));

    // Launch appropriate control scenes based on the device type
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
    this.player = this.physics.add.sprite(600, 600, 'player');

    // Set world bounds for the player
    const boundaryOffset = 20; // Adjust this value as needed
    const worldBounds = new Phaser.Geom.Rectangle(
      boundaryOffset,
      boundaryOffset,
      map.widthInPixels - 2 * boundaryOffset,
      map.heightInPixels - 2 * boundaryOffset
        );


   this.logText = this.add.text(10, 10, '', { fill: '#ffffff' });

    // Listen for orientation change event


    this.physics.world.setBounds(worldBounds.x, worldBounds.y, worldBounds.width, worldBounds.height);
    this.player.setCollideWorldBounds(true);

    // Constrain the camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
  }

  update(time, delta) {

        window.addEventListener('orientationchange', this.handleOrientationChange.bind(this));
  }

handleOrientationChange() {
    // Check if the new orientation is portrait
    this.isPortrait = window.innerHeight > window.innerWidth;

    // Log the orientation to the screen
    this.logText.setText(`Orientation: ${this.isPortrait ? 'Portrait' : 'Landscape'}`);

    // Resize the game and update camera accordingly
    if (this.isPortrait) {
        this.scale.setGameSize(window.innerWidth, window.innerHeight);
    } else {
        this.scale.setGameSize(window.innerHeight, window.innerWidth);
    }

    // Update camera bounds
    const map = this.make.tilemap({ key: 'map' });
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
}
  
}

window.OpenWorld = OpenWorld;
