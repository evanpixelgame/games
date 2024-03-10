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
    this.load.image('character1', 'assets/sprites/charSelect/sprite1.png');
    this.load.image('character2', 'assets/sprites/charSelect/sprite2.png');
    this.load.image('character3', 'assets/sprites/charSelect/sprite3.png');
    this.load.image('background', 'assets/backgrounds/startScreenBackground.png');
  }

  create() {
    const background = this.add.image(400, 300, 'background').setOrigin(0.5);

    // Display character options
    const character1 = this.add.image(200, 200, 'character1').setInteractive();
    const character2 = this.add.image(400, 200, 'character2').setInteractive();
    const character3 = this.add.image(600, 200, 'character3').setInteractive();

    // Set up input events for character selection
    character1.on('pointerdown', () => this.selectCharacter('character1', character1));
    character2.on('pointerdown', () => this.selectCharacter('character2', character2));
    character3.on('pointerdown', () => this.selectCharacter('character3', character3));

    // Set up input events for the confirm button
    const confirmButton = document.getElementById('confirmButton');
    confirmButton.addEventListener('click', () => this.confirmSelection());

    // Set up input events for the input field
    this.inputElement = document.getElementById('nameInput');
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
  }

  handleInputChange() {
    // Update the Phaser Text object with the input value
    this.inputText = this.inputElement.value;
    console.log(`Input Text: ${this.inputText}`);
  }

  confirmSelection() {
    // Handle confirm button logic
    this.playerName = this.inputText;
    console.log(`Player Name: ${this.playerName}`);

    // Store player name and selected character, and transition to the next scene
    this.scene.start('OpenWorld', { playerName: this.playerName, selectedCharacter: this.selectedCharacter });
  }
}

window.CharSelect = CharSelect;
