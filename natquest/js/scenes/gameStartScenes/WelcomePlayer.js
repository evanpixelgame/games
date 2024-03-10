class WelcomePlayer extends Phaser.Scene {
  constructor() {
    super({ key: 'WelcomePlayer' });
   // this.selectedCharacter = gameManager.selectedCharacter;
   // this.playerName = gameManager.playerName;
 /*   this.characterHighlight = null;
    this.inputText = '';
    this.inputElement = null; */
  }
      
preload() {}

create() {
  
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
}

      const textBlock = this.add.text(400, 300, `Welcome to the Nat Quest, ${gameManager.playerName}!
      \nYou have chosen the ${gameManager.selectedCharacter} as your character. \nIt's time to start your adventure!`, {
      fontSize: '24px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      align: 'center',
    })
      .setOrigin(0.5);

    // Additional styling for the text block
    textBlock.setShadow(2, 2, '#000000', 2, false, true);
  }
}

window.WelcomePlayer = WelcomePlayer;
