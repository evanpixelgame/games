class Settings extends Phaser.Scene {
  constructor() {
    super({ key: 'Settings' });
  }

  
  preload() {


   if (gameManager.selectedCharacter == 'Baby Mouse') {  
    this.load.spritesheet("player", "assets/sprites/player/babyMouse.png", {
          frameWidth: 64,
          frameHeight: 64
      }); 
    } else if (gameManager.selectedCharacter == 'Confused Woman') {
    
       this.load.spritesheet("player", "assets/sprites/player/womanPlayer.png", {
          frameWidth: 64,
          frameHeight: 64
      });
    } else {
       this.load.spritesheet("player", "assets/sprites/player/fatWolf.png", {
          frameWidth: 64,
          frameHeight: 64
      });
    }
    
  }

  create() {

    console.log(gameManager.selectedCharacter + ': should be being displayed');

        const vw = window.innerWidth;
        const xMid = vw * .5;
        const vh = window.innerHeight;

     const graphics = this.add.graphics();

    // Fill the background with a solid color
    graphics.fillStyle(0xfdd5d5); // Specify the color (black in this case)
    graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);

      
       const backdrop = this.add.graphics();
        backdrop.fillStyle(0xE6E6FA, .7);
        backdrop.lineStyle(4, 0x000000, 1);
        backdrop.fillRect(vw * .05, vh * .05, vw * .9, vh * .85);

    
    //this.openWorldScene = this.scene.get('OpenWorld'); //DELETE IF THIS DOESNT WORK
  //  this.openWorldScene = this.scene.get('ComputerControls'); 
 //   const beginButton = this.add.text(385, 550, 'Click Here To Begin Game!', {
     const backButton = this.add.text(xMid, vh * .8, 'Back', {
      fontSize: '48px', 
      fontFamily: 'knewave',
      fill: '#c92b23',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
      .setInteractive();


    
    // Set a callback function for the button click event
    backButton.on('pointerdown', function () {
      this.scene.start('startMenu');
    }, this);


    // Declaration and initialization of welcomeTextBlock
    const welcomeTextBlock = this.add.text(xMid, vh * .3, `Currently only Fullscreen setting functional\nMore settings to come soon!
      \nThanks for your patience :)`, {
      fontSize: '24px',
      fontFamily: 'Roboto, sans-serif',
      fill: '#0d1117',
      align: 'center',
    })
      .setOrigin(0.5);

    
  }
}

window.Settings = Settings;





/*
add settings options here 

background music volume
Noise/sound effects volume
Accessibility Controls
    -screen reader
    -additional magnification
    
-UI interface size
-Text font size
-maybe get into fun specifics like color themes, font choices, other stylistic things

-Location where to save local files/browser files if browser saves need a location which they may not 
*/
