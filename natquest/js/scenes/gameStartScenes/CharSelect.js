class CharSelect extends Phaser.Scene {
  constructor() {
    super({ key: 'CharSelect' });
    this.selectedCharacter = null;
    this.playerName = '';
    this.characterHighlight = null;
  }

  preload() {
    this.load.image('character1', 'assets/sprites/charSelect/sprite1.png');
    this.load.image('character2', 'assets/sprites/charSelect/sprite2.png');
    this.load.image('character3', 'assets/sprites/charSelect/sprite3.png');
  }

  create() {

      const background = this.add.image(400, 300, 'background');
    background.setOrigin(0.5);
    
    // Display character options
    const character1 = this.add.image(200, 200, 'character1').setInteractive();
    const character2 = this.add.image(400, 200, 'character2').setInteractive();
    const character3 = this.add.image(600, 200, 'character3').setInteractive();

    // Set up input events for character selection
    character1.on('pointerdown', () => this.selectCharacter('character1', character1));
    character2.on('pointerdown', () => this.selectCharacter('character2', character2));
    character3.on('pointerdown', () => this.selectCharacter('character3', character3));

    // Set up input events for the confirm button
    confirmButton.on('pointerdown', () => this.confirmSelection());
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
  }

// Display instructions
    this.add.text(10, 10, 'Enter your name:', { fontSize: '24px', fill: '#ffffff' });

    // Create a rectangle as a background for the input field
    const inputBackground = this.add.graphics();
    inputBackground.fillStyle(0x000000, 1);
    inputBackground.fillRect(10, 50, 300, 40);

    // Create a text object to display the input
    this.inputElement = this.add.text(20, 60, this.inputText, { fontSize: '24px', fill: '#ffffff' });

    // Enable input events on the background rectangle
    inputBackground.setInteractive({ useHandCursor: true });
    inputBackground.on('pointerdown', () => this.handleInputClick());

    // Handle keyboard input
    this.input.keyboard.on('keydown', (event) => this.handleKeyDown(event));
  }

  handleInputClick() {
    // Trigger the browser's native input when the user clicks the Phaser input area
    this.inputElement.visible = false;

    // Create a standard HTML input element
    const input = document.createElement('input');
    input.type = 'text';
    input.style = 'position: absolute; top: 60px; left: 20px; font-size: 24px; border: none; background: none; color: #ffffff;';

    // Append the input element to the document body
    document.body.appendChild(input);

    // Set focus on the input element
    input.focus();

    // Handle input change event
    input.addEventListener('input', () => this.handleInputChange(input));
  }

  handleInputChange(input) {
    // Update the Phaser text element with the input value
    this.inputText = input.value;
    this.inputElement.text = this.inputText;
  }

  handleKeyDown(event) {
    // Close the native input when Enter is pressed
    if (event.key === 'Enter') {
      this.inputElement.visible = true;
      const input = document.querySelector('input');
      if (input) {
        input.blur();
        input.remove();
      }
    }
  }
  
 /* confirmSelection() {
    // Handle confirm button logic
    this.playerName = document.querySelector('input').value;
    console.log(`Player Name: ${this.playerName}`);

    // Store player name and selected character, and transition to the next scene
    this.scene.start('OpenWorld', { playerName: this.playerName, selectedCharacter: this.selectedCharacter });
  } */
}

window.CharSelect = CharSelect;
