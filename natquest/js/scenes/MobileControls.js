'use strict';

class MobileControls extends Phaser.Scene {
    constructor() {
        super({
            key: 'MobileControls'
        });
    }

    preload() {}

    create() {
        // Retrieve player reference and speed from the data object
        this.openWorldScene = this.scene.get('OpenWorld');
        this.player = this.openWorldScene.player;
        this.speed = this.openWorldScene.speed;

        const posX = 80; //window.innerWidth; //this.game.config.width / 5;
        const posY = window.innerHeight - 80;

        const base = this.add.image(0, 0, this.textures.get('base'));
        const thumb = this.add.image(0, 0, this.textures.get('thumb'));

        // Set the scale for base and thumb images
        base.setScale(0.5); // Adjust the scale as needed
        thumb.setScale(0.5);

        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: posX,
                y: posY,
                radius: 50,
                base: base,
                thumb: thumb,
            })
            .on('update', this.handleJoystickUpdate, this);
    }

    handleJoystickUpdate() {
        // Determine velocity based on joystick input
        const velocityX = this.joyStick.forceX * this.speed;
        const velocityY = this.joyStick.forceY * this.speed;

        // Set the velocity of the player sprite
        this.player.setVelocity(velocityX, velocityY);

        // Play appropriate animation based on movement direction
        if (velocityX !== 0 || velocityY !== 0) {
            if (velocityX > 0) {
                this.player.anims.play('walking-right', true);
            } else if (velocityX < 0) {
                this.player.anims.play('walking-left', true);
            } else if (velocityY < 0) {
                this.player.anims.play('walking-down', true);
            } else if (velocityY > 0) {
                this.player.anims.play('walking-up', true);
            }
        } else {
            // Stop animation when no movement
            this.player.anims.stop();
        }
        this.player.setRotation(0);
    }

    update() {}
}

window.MobileControls = MobileControls;
