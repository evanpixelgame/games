class CharSelect extends Phaser.Scene {
  constructor() {
    super({ key: 'CharSelect' });
    this.selectedCharacter = gameManager.selectedCharacter;
    this.playerName = gameManager.playerName;
 /*   this.characterHighlight = null;
    this.inputText = '';
    this.inputElement = null; */
  }
      
preload() {}

create() {
const heartButton = this.add.text(385, 550, gameManager.playerName, {
      fontSize: '48px', 
      fontFamily: 'knewave',
      fill: '#c92b23',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
      .setInteractive();
}
}
