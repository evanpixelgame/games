class CharSelect extends Phaser.Scene {
  constructor() {
    super({ key: 'CharSelect' });
    this.selectedCharacter = null;
    this.playerName = '';
  }

  preload() {
    this.load.image('character1', 'assets/sprites/charSelect/sprite1.png');
    this.load.image('character2', 'assets/sprites/charSelect/sprite2.png');
    this.load.image('character3', 'assets/sprites/charSelect/sprite3.png');
  }

   create() {
    // Display character options
    const character1 = this.add.image(200, 200, 'character1').setInteractive();
    const character2 = this.add.image(400, 200, 'character2').setInteractive();
    const character3 = this.add.image(600, 200, 'character3').setInteractive();

    // Set up input events for character selection
    character1.on('pointerdown', () => this.selectCharacter('character1'));
    character2.on('pointerdown', () => this.selectCharacter('character2'));
    character3.on('pointerdown', () => this.selectCharacter('character3'));

    // Display name input field
    const nameLabel = this.add.text(300, 400, 'Enter your name:', { fontSize: '24px', fill: '#ffffff' });
    const nameInput = this.add.dom(500, 400, 'input', 'width: 200px; height: 40px; font-size: 24px;');

    // Display confirm button
    const confirmButton = this.add.text(500, 500, 'Confirm', {
      fontSize: '24px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive();

    // Set up input events for the confirm button
    confirmButton.on('pointerdown', () => this.confirmSelection());
  }

  selectCharacter(characterKey) {
    // Handle character selection logic
    this.selectedCharacter = characterKey;
    console.log(`Selected character: ${this.selectedCharacter}`);
  }

  confirmSelection() {
    // Handle confirm button logic
    this.playerName = document.querySelector('input').value;
    console.log(`Player Name: ${this.playerName}`);

    // Store player name and selected character, and transition to the next scene
    this.scene.start('OpenWorld', { playerName: this.playerName, selectedCharacter: this.selectedCharacter });
  }
}

window.CharSelect = CharSelect;
