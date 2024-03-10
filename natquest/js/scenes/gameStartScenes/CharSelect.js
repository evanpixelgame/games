class CharSelect extends Phaser.Scene {
  constructor() {
    super({ key: 'CharSelect' });
    this.selectedCharacter = null;
    this.playerName = '';
    this.characterHighlight = null;
    this.inputText = '';
  }

  preload() {
    this.load.image('background', 'assets/backgrounds/startScreenBackground.png');
    this.load.image('character1', 'assets/sprites/charSelect/sprite1.png');
    this.load.image('character2', 'assets/sprites/charSelect/sprite2.png');
    this.load.image('character3', 'assets/sprites/charSelect/sprite3.png');
  }

create() {
    // Display background
    const background = this.add.image(400, 300, 'background').setOrigin(0.5);

    // Display character options
    const character1 = this.add.image(200, 200, 'character1').setInteractive();
    const character2 = this.add.image(400, 200, 'character2').setInteractive();
    const character3 = this.add.image(600, 200, 'character3').setInteractive();

    // Set up input events for character selection
    character1.on('pointerdown', () => this.selectCharacter('character1', character1));
    character2.on('pointerdown', () => this.selectCharacter('character2', character2));
    character3.on('pointerdown', () => this.selectCharacter('character3', character3));

    // Display instructions
    this.add.text(10, 10, 'Enter your name:', { fontSize: '24px', fill: '#ffffff' });

    // Create a rectangle as a background for the input field
    const inputBackground = this.add.graphics();
    inputBackground.fillStyle(0xadd8e6, 1); // Light blue color
    inputBackground.fillRect(10, 50, 300, 40);

    // Create a text object to display the input
    this.inputElement = this.add.text(20, 60, this.inputText, { fontSize: '24px', fill: '#ffffff' });

    // Enable input events on the background rectangle
    inputBackground.setInteractive({ useHandCursor: true });
    inputBackground.on('pointerdown', () => this.handleInputClick());

    // Set up input events for the confirm button
    const confirmButton = this.add.text(400, 150, 'Confirm', {
        fontSize: '24px',
        fill: '#ffffff',
        backgroundColor: '#add8e6', // Light blue color
        padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive();
    confirmButton.on('pointerdown', () => this.confirmSelection());

    // Centered container for input field and confirm button
    const container = this.add.container(400, 300);
    container.add([background, character1, character2, character3, inputBackground, this.inputElement, confirmButton]);

    // Center the container
    Phaser.Display.Align.In.Center(container, this.add.zone(400, 300, 800, 600));
}

}

window.CharSelect = CharSelect;
