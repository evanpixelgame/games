'use strict'

class MobileControls extends Phaser.Scene {
    constructor() {
        super({
            key: 'MobileControls'
        })
    }

      init() {
     // super.init();
      this.staticXJsPos = this.gameWidthMiddle;
      this.staticYJsPos = this.gameHeightMiddle + (this.gameHeightMiddle / 2) + (this.gameHeightMiddle / 4);
      this.playerSpeed = 1;
      this.lastCursorDirection = "center";
      this.joystickConfig = {
        x: this.staticXJsPos,
        y: this.staticYJsPos,
        enabled: true
    };
  }

    preload() {
        var url;
  
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);
    }

    create() {
        console.log('pleasewritethis');
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
        
     this.updateJoystickState();
        
    }

      movePlayer() {
      if (this.lastCursorDirection === "up") {
        this.player.y -= this.playerSpeed;
        if (!this.player.anims.isPlaying)
            this.player.anims.play('walking-up');
    } else if (this.lastCursorDirection === "down") {
        this.player.y += this.playerSpeed;
        if (!this.player.anims.isPlaying)
            this.player.anims.play('walking-down');
    } else if(this.lastCursorDirection === "right") {
        this.player.x += this.playerSpeed;
        if (!this.player.anims.isPlaying)
            this.player.anims.play('walking-right');
    } else if (this.lastCursorDirection === "left") {
        this.player.x -= this.playerSpeed;
        if (!this.player.anims.isPlaying)
            this.player.anims.play('walking-left');
    } else if (this.lastCursorDirection === "upright") {
        this.player.x += this.playerSpeed;
        this.player.y -= this.playerSpeed;
        if (!this.player.anims.isPlaying)
        this.player.anims.play('walking-right');
    } else if (this.lastCursorDirection === "downright") {
        this.player.x += this.playerSpeed;
        this.player.y += this.playerSpeed;
        if (!this.player.anims.isPlaying)
        this.player.anims.play('walking-right');
    } else if (this.lastCursorDirection === "downleft") {
        this.player.x -= this.playerSpeed;
        this.player.y += this.playerSpeed;
        if (!this.player.anims.isPlaying)
        this.player.anims.play('walking-left');
    } else if (this.lastCursorDirection === "upleft") {
        this.player.x -= this.playerSpeed;
        this.player.y -= this.playerSpeed;
        if (!this.player.anims.isPlaying)
        this.player.anims.play('walking-left');
    } else {
        this.stopPlayerAnimations();
    }
  }

  updateJoystickState() {
      let direction = '';
      for (let key in this.cursorKeys) {
          if (this.cursorKeys[key].isDown) {
            direction += key;
          }
      }
      
      // Set the new cursor direction
      this.lastCursorDirection = direction;

      // Handle the player moving
      this.movePlayer();

      // Set debug info about the cursor
      this.setCursorDebugInfo();
  }
}

window.MobileControls = MobileControls;
