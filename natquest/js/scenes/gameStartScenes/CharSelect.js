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

   const background = this.add.image(400, 300, 'background').setOrigin(0.5);
    const inputElement = document.getElementById('nameInput');
    const confirmButton = document.getElementById('confirmButton');
    inputElement.style.display = 'block';
    confirmButton.style.display = 'block';

  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.style = 'position: absolute; display: block; top: 60px; left: 20px; font-size: 24px; border: none; background: none; color: #ffffff;';

  // Append the input element to the document body
  document.body.appendChild(inputElement);

  // Set focus on the input element
  inputElement.focus();

  // Handle input change event
  inputElement.addEventListener('input', () => this.handleInputChange(inputElement));
}

handleInputChange(inputElement) {
  // Update the Phaser Text object with the input value
  this.inputText = inputElement.value;
  this.inputElement.text = this.inputText;
}
    
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
}

window.CharSelect = CharSelect;
