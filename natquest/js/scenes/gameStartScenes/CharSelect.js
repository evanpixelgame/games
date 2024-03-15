class CharSelect extends Phaser.Scene {
  constructor() {
    super({ key: 'CharSelect' });
    this.selectedCharacter = null;
    this.playerName = '';
    this.characterHighlight = null;
    this.inputText = '';
    this.inputElement = null;
  }

  preload() {

  }

  create() {
  const background = this.add.image(400, 300, 'background').setOrigin(0.5);

      const backdrop = this.add.graphics();
  backdrop.fillStyle(0xE6E6FA, .7); // F8F8FF is the hex code for off-white, and 1 is the opacity
// Set the line style for the border (black color with 2 pixels width)
backdrop.lineStyle(4, 0x000000, 1);
//  backdrop.fillStyle(0x000000, 0.7); // Black color with 70% opacity
  backdrop.fillRect(100, 150, 600, 150);

    
  // Display character options
  const character1 = this.add.image(200, 150, 'Baby Mouse').setInteractive();
  const character2 = this.add.image(400, 150, 'Confused Woman').setInteractive();
  const character3 = this.add.image(600, 150, 'Fat Wolf').setInteractive();

character1.setScale(2); // Adjust the scale factor (0.5 scales to half the size)
character2.setScale(2); 
character3.setScale(2);

    
      // Add some text to the backdrop
  const instructionText = this.add.text(400, 270, 'Pick a character', {
    fontSize: '32px',
    fontFamily: 'knewave',
    fill: '#c92b23',
    align: 'center',
  })
    .setOrigin(0.5);

  // Set up input events for character selection
  character1.on('pointerdown', () => this.selectCharacter('Baby Mouse', character1));
  character2.on('pointerdown', () => this.selectCharacter('Confused Woman', character2));
  character3.on('pointerdown', () => this.selectCharacter('Fat Wolf', character3));

selectCharacter(characterKey, characterImage) {
  // Remove highlight from the previous selected character
  if (this.characterHighlight) {
    this.characterHighlight.destroy();
  }

  // Handle character selection logic
  this.selectedCharacter = characterKey;

 // Add a Glow effect to the selected character
  const glowColor = 0xe6e6f480; // You can adjust the color as needed
  const outerStrength = 1;
  const innerStrength = 1;
  const knockout = false;

 // Create a new sprite for the selected character
  this.characterHighlight = this.add.sprite(characterImage.x, characterImage.y, characterKey);

  // Set the scale of the new sprite based on the original characterImage
  this.characterHighlight.setScale(characterImage.scaleX, characterImage.scaleY);

  // Calculate scaled glow properties
  const scaledOuterStrength = outerStrength * characterImage.scaleX;
  const scaledInnerStrength = innerStrength * characterImage.scaleX;

  // Apply the Glow effect with scaled properties
  this.characterHighlight.preFX.addGlow(glowColor, scaledOuterStrength, scaledInnerStrength, knockout);

  console.log(`Selected character: ${this.selectedCharacter}`);

  // Continue button
  const continueButton = this.add.text(385, 550, 'Continue', {
    fontSize: '48px',
    fontFamily: 'knewave',
    fill: '#c92b23',
    padding: { x: 20, y: 20 },
  })
    .setOrigin(0.5)
    .setInteractive();

  // Set a callback function for the button click event
  continueButton.on('pointerdown', function () {
  // Check if both character and name are selected
  if (this.selectedCharacter) {
    // Transition to the main scene when the conditions are met
    this.scene.start('WelcomePlayer');
    gameManager.selectedCharacter = this.selectedCharacter;
  } else {
    // Display alert for incomplete conditions
    let alertMessage = '';

    if (!this.selectedCharacter) {
      alertMessage += 'Please select a character.\n';
    }
    alert(alertMessage);
  }
}, this);
}


}

window.CharSelect = CharSelect;
