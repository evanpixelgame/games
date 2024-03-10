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

 /* confirmSelection() {
    // Handle confirm button logic
    this.playerName = document.querySelector('input').value;
    console.log(`Player Name: ${this.playerName}`);

    // Store player name and selected character, and transition to the next scene
    this.scene.start('OpenWorld', { playerName: this.playerName, selectedCharacter: this.selectedCharacter });
  } */
}

window.CharSelect = CharSelect;
