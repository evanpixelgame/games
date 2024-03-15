class WelcomePlayer extends Phaser.Scene {
  constructor() {
    super({ key: 'WelcomePlayer' });
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
    
    //this.openWorldScene = this.scene.get('OpenWorld'); //DELETE IF THIS DOESNT WORK
  //  this.openWorldScene = this.scene.get('ComputerControls'); 
 //   const beginButton = this.add.text(385, 550, 'Click Here To Begin Game!', {
     const beginButton = this.add.text(50vw, 90vw, 'Click', {
      fontSize: '48px', 
      fontFamily: 'knewave',
      fill: '#c92b23',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
      .setInteractive();


    
    // Set a callback function for the button click event
    beginButton.on('pointerdown', function () {
         const orientation = window.screen.orientation.type;
    // Check if the device is in landscape mode
    if (orientation.includes('landscape')) {
        // Execute event handler code only in landscape mode
        console.log('Click event in landscape mode2');
      this.scene.start('OpenWorld');
    } else {
        // Ignore the click event in portrait mode
        console.log('Ignoring click event in portrait mode2');
      alert('please enter landscape mode to begin');
    } 
      // Transition to the main scene when the button is clicked
      //this.scene.start('OpenWorld');
    }, this);

    /*
function handleResizeOnReorientation() {
//location.reload();
  this.scene.reload();
  console.log('thisworksed');
}

window.addEventListener('orientationchange', handleResizeOnReorientation);
   window.addEventListener('resize', handleResizeOnReorientation);

*/
    

    // Declaration and initialization of welcomeTextBlock
    const welcomeTextBlock = this.add.text(50vw, 30vh, `Welcome to Nat Quest, ${gameManager.playerName}!
      \nYou have chosen the ${gameManager.selectedCharacter} as your character. \nIt's time to start your adventure!`, {
      fontSize: '24px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      align: 'center',
    })
      .setOrigin(0.5);

    
  }
}

window.WelcomePlayer = WelcomePlayer;
