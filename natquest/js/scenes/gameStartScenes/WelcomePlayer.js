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
  
const beginButton = this.add.text(385, 550, gameManager.playerName, {
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
}

window.WelcomePlayer = WelcomePlayer;
