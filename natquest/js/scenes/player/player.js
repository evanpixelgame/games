export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    const anims = scene.anims;
    anims.create({
      key: "mouse-player-walk-front",
      frames: anims.generateFrameNumbers("babyMouse", { start: 51, end: 59 }),
      frameRate: 8,
      repeat: -1,
    });
        anims.create({
      key: "mouse-player-walk-left",
      frames: anims.generateFrameNumbers("babyMouse", { start: 60, end: 68 }),
      frameRate: 8,
      repeat: -1,
    });
        anims.create({
      key: "mouse-player-walk-down",
      frames: anims.generateFrameNumbers("babyMouse", { start: 69, end: 77 }),
      frameRate: 8,
      repeat: -1,
    });
        anims.create({
      key: "mouse-player-right",
      frames: anims.generateFrameNumbers("babyMouse", { start: 77, end: 85 }),
      frameRate: 8,
      repeat: -1,
    });

     key: "woman-player-walk-front",
      frames: anims.generateFrameNumbers("confusedWoman", { start: 51, end: 59 }),
      frameRate: 8,
      repeat: -1,
    });

  key: "woman-player-walk-left",
      frames: anims.generateFrameNumbers("confusedWoman", { start: 60, end: 68 }),
      frameRate: 8,
      repeat: -1,
    });

key: "woman-player-walk-down",
      frames: anims.generateFrameNumbers("confusedWoman", { start: 69, end: 77 }),
      frameRate: 8,
      repeat: -1,
    });

key: "woman-player-walk-right",
      frames: anims.generateFrameNumbers("confusedWoman", { start: 77, end: 85 }),
      frameRate: 8,
      repeat: -1,
    });

key: "wolf-player-walk-front",
      frames: anims.generateFrameNumbers("fatWolf", { start: 46, end: 49 }),
      frameRate: 8,
      repeat: -1,
    });

key: "wolf-player-walk-left",
      frames: anims.generateFrameNumbers("fatWolf", { start: 60, end: 68 }),
      frameRate: 8,
      repeat: -1,
    });

key: "wolf-player-walk-down",
      frames: anims.generateFrameNumbers("fatWolf", { start: 69, end: 77 }),
      frameRate: 8,
      repeat: -1,
    });

key: "wolf-player-walk-right",
      frames: anims.generateFrameNumbers("fatWolf", { start: 77, end: 85 }),
      frameRate: 8,
      repeat: -1,
    });





    this.sprite = scene.physics.add.sprite(x, y, "characters", 0).setSize(22, 33).setOffset(23, 27);

    this.sprite.anims.play("player-walk-back");

    this.keys = scene.input.keyboard.createCursorKeys();
  }

  freeze() {
    this.sprite.body.moves = false;
  }

  update() {
    const keys = this.keys;
    const sprite = this.sprite;
    const speed = 300;
    const prevVelocity = sprite.body.velocity.clone();

    // Stop any previous movement from the last frame
    sprite.body.setVelocity(0);

    // Horizontal movement
    if (keys.left.isDown) {
      sprite.body.setVelocityX(-speed);
      sprite.setFlipX(true);
    } else if (keys.right.isDown) {
      sprite.body.setVelocityX(speed);
      sprite.setFlipX(false);
    }

    // Vertical movement
    if (keys.up.isDown) {
      sprite.body.setVelocityY(-speed);
    } else if (keys.down.isDown) {
      sprite.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that sprite can't move faster along a diagonal
    sprite.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right animations precedence over up/down animations
    if (keys.left.isDown || keys.right.isDown || keys.down.isDown) {
      sprite.anims.play("player-walk", true);
    } else if (keys.up.isDown) {
      sprite.anims.play("player-walk-back", true);
    } else {
      sprite.anims.stop();

      // If we were moving, pick and idle frame to use
      if (prevVelocity.y < 0) sprite.setTexture("characters", 65);
      else sprite.setTexture("characters", 46);
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}
