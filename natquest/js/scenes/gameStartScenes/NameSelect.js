class NameSelect extends Phaser.Scene {
    constructor() {
        super({ key: 'NameSelect' });
        this.playerName = '';
        this.inputText = '';
        this.inputElement = null;
    }

    preload() {}

    create() {
        window.removeEventListener('orientationchange', this.handleResizeOnReorientation);

        const background = this.add.image(400, 300, 'background').setOrigin(0.5);

        const backdrop = this.add.graphics();
        backdrop.fillStyle(0xE6E6FA, .7);
        backdrop.lineStyle(4, 0x000000, 1);
        backdrop.fillRect(100, 150, 600, 150);

        // Create an input element
        this.inputElement = document.createElement('input');
        this.inputElement.type = 'text';
        this.inputElement.placeholder = 'Enter your name';
        this.inputElement.style = 'position: absolute; top: 20vh; left: 50vw; transform: translateX(-50%); font-size: 24px; border: 1px solid black; background: cerulean; color: black;';
        this.inputElement.readOnly = true; // Prevent native keyboard from appearing

        // Append the input element to the document body
        document.body.appendChild(this.inputElement);

        // Create virtual keyboard
        this.createVirtualKeyboard();

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
    let alertMessage = '';

    if (this.inputText.trim() === '') {
      alertMessage += 'Please enter a valid name.';
    }

    alert(alertMessage);
  }
}, this);

  // Set a callback function for the button click event
  continueButton.on('pointerdown', function () {
  // Check if both character and name are selected
  if (this.inputText) {
    // Transition to the main scene when the conditions are met
    this.inputElement.style = 'display: none;';
    gameManager.playerName = this.inputText.trim();
      this.scene.start('CharSelect');
  } else {
    // Display alert for incomplete conditions
    let alertMessage = '';

    if (!selectedCharacter) {
      alertMessage += 'Please choose a name.\n';
    }

    alert(alertMessage);
  }
}, this);
    }

createVirtualKeyboard() {
    // Create virtual keyboard buttons
    // Example: Create a button for each letter
    // ID of individual buttons for individual styling follows convention of:
    //letter "A" button will have the ID keyboard-button-a, the letter "B" button will have the ID keyboard-button-b, and so on.
    //The space button will have the ID keyboard-button-space, and the backspace button will have the ID keyboard-button-backspace.
    //The classes for the overall keyboard are 
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const keyboardContainer = document.createElement('div');
    keyboardContainer.style = 'position: absolute; bottom: 10vh; left: 50vw; transform: translateX(-50%);';
    document.body.appendChild(keyboardContainer);

    for (let letter of letters) {
        const button = document.createElement('button');
        button.textContent = letter;
        button.id = `keyboard-button-${letter.toLowerCase()}`;
        button.classList.add('keyboard-button'); // Add class for styling
        button.style = 'font-size: 24px; padding: 10px;';
        button.addEventListener('touchstart', () => this.updateInputText(letter));
        button.addEventListener('click', () => this.updateInputText(letter));
        keyboardContainer.appendChild(button);
    }

    // Create space button
    const spaceButton = document.createElement('button');
    spaceButton.textContent = 'Space';
    spaceButton.id = 'keyboard-button-space';
    spaceButton.classList.add('keyboard-button'); // Add class for styling
    spaceButton.style = 'font-size: 24px; padding: 10px;';
    spaceButton.addEventListener('touchstart', () => this.updateInputText(' '));
     spaceButton.addEventListener('click', () => this.updateInputText(' '));
    keyboardContainer.appendChild(spaceButton);

    // Create backspace button
    const backspaceButton = document.createElement('button');
    backspaceButton.textContent = 'Backspace';
    backspaceButton.id = 'keyboard-button-backspace';
    backspaceButton.classList.add('keyboard-button'); // Add class for styling
    backspaceButton.style = 'font-size: 24px; padding: 20px;';
    backspaceButton.addEventListener('touchstart', () => this.handleBackspace());
     backspaceButton.addEventListener('click', () => this.handleBackspace());
    keyboardContainer.appendChild(backspaceButton);
}


    
handleBackspace() {
    this.inputText = this.inputText.slice(0, -1);
    this.inputElement.value = this.inputText;
    this.inputElement.dispatchEvent(new Event('input'));
}

    updateInputText(letter) {
        this.inputText += letter;
        this.inputElement.value = this.inputText;
        this.inputElement.dispatchEvent(new Event('input'));
    }

    handleInputChange() {
        // Update the Phaser Text object with the input value
        this.inputText = this.inputElement.value;
        console.log(`Input Text: ${this.inputText}`);
    }
}

window.NameSelect = NameSelect;
