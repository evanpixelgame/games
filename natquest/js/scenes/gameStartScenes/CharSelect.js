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
  const background = this.add.image(this.game.config.width * 0.5, this.game.config.height, 'background').setOrigin(0.5);

  // Display character options
  const character1 = this.add.image(this.game.config.width * 0.25, this.game.config.height * 0.6, 'character1').setInteractive();
  const character2 = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.6, 'character2').setInteractive();
  const character3 = this.add.image(this.game.config.width * 0.75, this.game.config.height * 0.6, 'character3').setInteractive();

  // Set up input events for character selection
  character1.on('pointerdown', () => this.selectCharacter('character1', character1));
  character2.on('pointerdown', () => this.selectCharacter('character2', character2));
  character3.on('pointerdown', () => this.selectCharacter('character3', character3));

  // Create an input element
  this.inputElement = document.createElement('input');
  this.inputElement.type = 'text';
  this.inputElement.placeholder = 'Enter your name'; 
  this.inputElement.style = 'position: absolute; top: 75vh; left: 50%; transform: translateX(-50%); font-size: 24px; border: 1px solid black; background: cerulean; color: black;';

  // Append the input element to the document body
  document.body.appendChild(this.inputElement);

  // Set focus on the input element
  this.inputElement.focus();

  // Handle input change event
  this.inputElement.addEventListener('input', () => this.handleInputChange());
}

selectCharacter(characterKey, characterImage) {
  // Remove highlight from the previous selected character
  if (this.characterHighlight) {
    this.characterHighlight.destroy();
  }

  // Handle character selection logic
  this.selectedCharacter = characterKey;

  // Add a highlight effect to the selected character
  this.characterHighlight = this.add.image(
    characterImage.x,
    characterImage.y,
    'characterHighlight'
  );

  console.log(`Selected character: ${this.selectedCharacter}`);

  // Continue button
  const continueButton = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.25, 'Continue', {
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
  if (this.selectedCharacter && this.inputText.trim() !== '') {
    // Transition to the main scene when the conditions are met
    this.scene.start('WelcomePlayer');
    this.inputElement.style = 'display: none;';
    gameManager.playerName = this.inputText.trim();
    gameManager.selectedCharacter = this.selectedCharacter;
  } else {
    // Display alert for incomplete conditions
    let alertMessage = '';

    if (!this.selectedCharacter) {
      alertMessage += 'Please select a character.\n';
    }

    if (this.inputText.trim() === '') {
      alertMessage += 'Please enter a valid name.';
    }

    if (!this.selectedCharacter && this.inputText.trim() === '') {
      alertMessage = 'Please select a character and enter a valid name.';
    }

    alert(alertMessage);
  }
}, this);
}

handleInputChange() {
  // Update the Phaser Text object with the input value
  this.inputText = this.inputElement.value;
  console.log(`Input Text: ${this.inputText}`);
}

}

window.CharSelect = CharSelect;
