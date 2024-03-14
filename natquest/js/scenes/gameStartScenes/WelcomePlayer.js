class WelcomePlayer extends Phaser.Scene {
  constructor() {
    super({ key: 'WelcomePlayer' });
  }

  
  preload() {


       this.load.spritesheet("player", "assets/sprites/player/fatWolf.png", {
          frameWidth: 64,
          frameHeight: 64
      });
    
  }

  create() {
    //this.openWorldScene = this.scene.get('OpenWorld'); //DELETE IF THIS DOESNT WORK
  //  this.openWorldScene = this.scene.get('ComputerControls'); 
    const beginButton = this.add.text(385, 550, 'Click Here To Begin Game!', {
      fontSize: '48px', 
      fontFamily: 'knewave',
      fill: '#c92b23',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
      .setInteractive();

    beginButton.on('pointerdown', function () {
      // Transition to the main scene when the button is clicked
      this.scene.start('OpenWorld');
    }, this);

    // Declaration and initialization of welcomeTextBlock
    const welcomeTextBlock = this.add.text(400, 300, `Welcome to Nat Quest, ${gameManager.playerName}!
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
