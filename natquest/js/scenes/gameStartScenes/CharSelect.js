create() {
  // Display character options
  const character1 = this.add.image(200, 200, 'character1').setInteractive();
  const character2 = this.add.image(400, 200, 'character2').setInteractive();
  const character3 = this.add.image(600, 200, 'character3').setInteractive();

  // Set up input events for character selection
  character1.on('pointerdown', () => this.selectCharacter('character1', character1));
  character2.on('pointerdown', () => this.selectCharacter('character2', character2));
  character3.on('pointerdown', () => this.selectCharacter('character3', character3));

  // Display confirm button
  const confirmButton = this.add.text(500, 500, 'Confirm', {
    fontSize: '24px',
    fill: '#ffffff',
    backgroundColor: '#000000',
    padding: { x: 20, y: 10 },
  }).setOrigin(0.5).setInteractive();

  // Set up input events for the confirm button
  confirmButton.on('pointerdown', () => this.confirmSelection());

  // Display name input field
  const nameLabel = this.add.text(300, 400, 'Enter your name:', { fontSize: '24px', fill: '#ffffff' });
  const nameInput = this.add.dom(500, 400, 'input', 'width: 200px; height: 40px; font-size: 24px; border: 2px solid #fff; padding: 12px;');

  // Set up the name input event
  nameInput.addListener('change');
  nameInput.on('change', (event) => {
    if (event.target.value !== '') {
      this.playerName = event.target.value;
    }
  });
}
