// Make sure you have the necessary imports for Matter.js
import Phaser from 'phaser';

export class ComputerControls extends Phaser.Scene {
    constructor() {
        super({ key: 'ComputerControls' });

        this.player = null; // Initialize player reference
        this.speed = 0; // Initialize speed
    }

    init(data) {
        // Retrieve player reference and speed from the data object
        this.player = data.player;
        this.speed = data.speed;
        console.log("Received player in ComputerControls:", this.player); // Log player reference
    }

    preload() {
        // Preload assets if needed
    }

    create() {
        // Create keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
        let velocityX = 0;
        let velocityY = 0;

        // Determine velocity based on key presses
        if (this.cursors.up.isDown) {
            velocityY = -this.speed;
        } else if (this.cursors.down.isDown) {
            velocityY = this.speed;
        }

        if (this.cursors.left.isDown) {
            velocityX = -this.speed;
        } else if (this.cursors.right.isDown) {
            velocityX = this.speed;
        }


        //sdfgsdfgsfdgsd
        // Set velocity of the player's physics body
        if (this.player && this.player.body) {
            this.player.body.setVelocity(velocityX, velocityY);
        }

        // Pass velocity to the next scene
        // Example: this.scene.start('NextScene', { velocityX, velocityY, otherData: 'value' });
    }
}

window.ComputerControls = ComputerControls;
