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
        this.inputElement.style = 'position: absolute; top: 30vh; left: 20vw; transform: translateX(-50%); font-size: 24px; border: 1px solid black; background: cerulean; color: black;';
        this.inputElement.readOnly = true; // Prevent native keyboard from appearing

        // Append the input element to the document body
        document.body.appendChild(this.inputElement);

        // Create virtual keyboard
        this.createVirtualKeyboard();

        // Handle input change event
        this.inputElement.addEventListener('input', () => this.handleInputChange());
    }

    createVirtualKeyboard() {
        // Create virtual keyboard buttons
        // Example: Create a button for each letter
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const keyboardContainer = document.createElement('div');
        keyboardContainer.style = 'position: absolute; bottom: 20vh; left: 50vw; transform: translateX(-50%);';
        document.body.appendChild(keyboardContainer);

        for (let letter of letters) {
            const button = document.createElement('button');
            button.textContent = letter;
            button.style = 'font-size: 24px; padding: 10px;';
            button.addEventListener('touchstart', () => this.updateInputText(letter));
            keyboardContainer.appendChild(button);
        }

          // Create space button
    const spaceButton = document.createElement('button');
    spaceButton.textContent = 'Space';
    spaceButton.style = 'font-size: 24px; padding: 10px;';
    spaceButton.addEventListener('touchstart', () => this.updateInputText(' '));
    keyboardContainer.appendChild(spaceButton);

    // Create backspace button
    const backspaceButton = document.createElement('button');
    backspaceButton.textContent = 'Backspace';
    backspaceButton.style = 'font-size: 24px; padding: 10px;';
    backspaceButton.addEventListener('touchstart', () => this.handleBackspace());
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
