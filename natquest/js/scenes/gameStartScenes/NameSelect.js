class NameSelect extends Phaser.Scene {
  constructor() {
    super({ key: 'NameSelect' });
    this.playerName = '';
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

  // Create an input element
  this.inputElement = document.createElement('input');
  this.inputElement.type = 'text';
  this.inputElement.placeholder = 'Enter your name'; 
  this.inputElement.style = 'position: absolute; top: 50vh; left: 50%; transform: translateX(-50%); font-size: 24px; border: 1px solid black; background: cerulean; color: black;';

  // Append the input element to the document body
  document.body.appendChild(this.inputElement);

  // Set focus on the input element
  this.inputElement.focus();

  // Handle input change event
  this.inputElement.addEventListener('input', () => this.handleInputChange());



     // Continue button
  const continueButton = this.add.text(100, 100, 'Continue', {
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
  if (this.inputText.trim() !== '') {
    // Transition to the main scene when the conditions are met
    this.scene.start('CharSelect');
    this.inputElement.style = 'display: none;';
    gameManager.playerName = this.inputText.trim();
  } else {
    // Display alert for incomplete conditions
    let alertMessage = 'Please choose valid name';
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


window.NameSelect = NameSelect;
