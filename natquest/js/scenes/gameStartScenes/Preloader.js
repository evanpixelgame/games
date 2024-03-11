class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  preload() {
    //USE TO LOAD ALL GAME ASSETS SO THEYRE ALL READY AND REST OF GAME IS FAST AFTER LOADING 
      //Maybe load sprites separately so only have to load the one they pick instead of all of them
    // Load your assets here using Phaser's loading methods (e.g., this.load.image, this.load.audio)


    const progressBar = this.add.rectangle(200, 200, 300, 50, 0xcccccc);
    const desiredFontFamily = 'Knewave';
  const progressText = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.8, 'Loading...', {
      fontFamily: 'Knewave',
      color: 'black',
      fontSize: '32px'
});
progressText.setOrigin(0.5, 0.5);

    // Inside the preload method of your scene
  this.load.spritesheet('babyMouse', 'assets/sprites/player/babyMouse.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('confusedWoman', 'assets/sprites/player/confusedWoman.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('fatWolf', 'assets/sprites/player/fatWolf.png', { frameWidth: 64, frameHeight: 64 });

    
    this.load.image('background', 'assets/backgrounds/startScreenBackground.png');

        this.load.image('Baby Mouse', 'assets/sprites/charSelect/babyMouse64.png');
    this.load.image('Confused Woman', 'assets/sprites/charSelect/confusedWoman64.png');
    this.load.image('Fat Wolf', 'assets/sprites/charSelect/fatWolf64.png');
    this.load.image('background', 'assets/backgrounds/startScreenBackground.png');
      this.load.image('tiles', 'assets/tilesets/tilemap1.png');
    this.load.tilemapTiledJSON('map', 'assets/json/map.json');

    
    //maybe just add a pink background that matches the background color set in StartMenu
 //also sometimes it still seems to glitch a little bit, i bet more stuff just needs to be loaded onto this screen for it to work properly
    

this.load.on('complete', () => {
  if (progressText.style.fontFamily === desiredFontFamily) { // Check stored font family
    this.scene.start('StartMenu');
  } else {
    console.warn('Font might not be loaded yet, delaying scene transition...');
  }
});

    this.load.on('progress', (percent) => {
      progressBar.setScale(percent, 1);
      progressText.setText(`Loading: ${Math.floor(percent * 100)}%`);
    });

    this.load.on('complete', () => {
      this.scene.start('StartMenu');
    });

  }
   create() {
         const background = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.8, 'background');
    background.setOrigin(0.5);
}
}

window.Preloader = Preloader;
