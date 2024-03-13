'use strict'

class MobileControls extends Phaser.Scene {
    constructor() {
        super({
            key: 'MobileControls'
        })
    }

    preload() {
        var url;
  
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);
    }

    create() {
            this.openWorldScene = this.scene.get('OpenWorld'); //DELETE IF THIS DOESNT WORK
            const posX = this.game.config.width / 5;
    const posY = this.game.config.height - this.game.config.height / 3;
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: posX,
                y: posY,
                radius: 100,
                base: this.add.circle(0, 0, 100, 0x888888),
                thumb: this.add.circle(0, 0, 50, 0xcccccc),
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true
            })
            .on('update', this.dumpJoyStickState, this);

        this.text = this.add.text(0, 0);
        this.dumpJoyStickState();
    }

    dumpJoyStickState() {
        var cursorKeys = this.joyStick.createCursorKeys();
        var s = 'Key down: ';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += `${name} `;
            }
        }

        s += `
Force: ${Math.floor(this.joyStick.force * 100) / 100}
Angle: ${Math.floor(this.joyStick.angle * 100) / 100}
`;

        s += '\nTimestamp:\n';
        for (var name in cursorKeys) {
            var key = cursorKeys[name];
            s += `${name}: duration=${key.duration / 1000}\n`;
        }
        this.text.setText(s);
    }
    update() {
        // Assuming you have access to the OpenWorld scene
        const openWorldScene = this.scene.get('OpenWorld');

        // Get the joystick cursor keys
        var cursorKeys = this.joyStick.createCursorKeys();

        // Check the joystick input and update player movement
        if (cursorKeys.up.isDown) {
            openWorldScene.player.setVelocityY(-openWorldScene.speed);
            openWorldScene.player.anims.play('walking-down', true);
        } else if (cursorKeys.down.isDown) {
            openWorldScene.player.setVelocityY(openWorldScene.speed);
            openWorldScene.player.anims.play('walking-up', true);
        } else {
            openWorldScene.player.setVelocityY(0);
        }

        if (cursorKeys.left.isDown) {
            openWorldScene.player.setVelocityX(-openWorldScene.speed);
            openWorldScene.player.anims.play('walking-left', true);
        } else if (cursorKeys.right.isDown) {
            openWorldScene.player.setVelocityX(openWorldScene.speed);
            openWorldScene.player.anims.play('walking-right', true);
        } else {
            openWorldScene.player.setVelocityX(0);
        }
    }
}

window.MobileControls = MobileControls;
