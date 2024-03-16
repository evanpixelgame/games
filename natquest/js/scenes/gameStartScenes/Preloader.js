class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  preload() {


        // Display a progress bar during asset loading
    const progressBar = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, 300, 50, 0xcccccc);
    progressBar.setOrigin(0, 0.5);
    
    const progressText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 50, 'Loading...', {
        fontFamily: 'Knewave',
        color: 'black',
        fontSize: '32px'
    });
    progressText.setOrigin(0.5, 0.5);
    
    this.load.on('progress', (percent) => {
        progressBar.setScale(percent, 1);
        progressText.setText(`Loading: ${Math.floor(percent * 100)}%`);
    });


    this.load.image('background', 'assets/backgrounds/startScreenBackground.png');

    // Create backdrop
    const backdrop = this.add.graphics();
    backdrop.fillStyle(0x000000, 0.7); // Black with 70% opacity
    backdrop.fillRect(0, 0, this.game.config.width, this.game.config.height);

    
    // Load your assets here using Phaser's loading methods
   // this.load.image('backgroundPortrait', 'assets/backgrounds/startScreenBackground.png');
    this.load.image('sprite1', 'assets/sprites/charSelect/sprite1.png');
    this.load.image('Baby Mouse', 'assets/sprites/charSelect/babyMouse64.png');
    this.load.image('Confused Woman', 'assets/sprites/charSelect/confusedWoman64.png');
    this.load.image('Fat Wolf', 'assets/sprites/charSelect/fatWolf64.png');
    this.load.image('backgroundLandscape', 'assets/backgrounds/startScreenBackgroundLandscape.png');
    this.load.image('tiles', 'assets/tilesets/tilemap1.png');
    this.load.tilemapTiledJSON('map', 'assets/json/map.json');
    this.load.image('base', 'assets/images/base.png');
    this.load.image('thumb', 'assets/images/thumb.png');
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    this.load.image('zoomInIcon', 'assets/UI/icons/zoom-icon.png');
     this.load.image('zoomOutIcon', 'assets/UI/icons/zoom-out-icon.png');
     this.load.image('settingsIcon', 'assets/UI/icons/settings-icon.png');
     this.load.image('fullscreenIcon', 'assets/UI/icons/full-screen-icon.png');
    this.load.image('infoIcon', 'assets/UI/icons/info-icon.png');
    
    this.load.on('complete', () => {
        progressText.destroy(); // Remove the progress text when loading is complete
        progressBar.destroy(); // Remove the progress bar when loading is complete
        this.scene.start('StartMenu');
    });
}

  
   create() {

   //  const graphics = this.add.graphics();
    // Fill the background with a solid color
 //   graphics.fillStyle(0xfdd5d5); // Specify the color (black in this case)
  //  graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);

         const background = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.8, 'background');
    background.setOrigin(0.5);
}
}

window.Preloader = Preloader;
