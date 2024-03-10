class StartMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'StartMenu' });
  }

  preload() {
    // Preload assets if needed
  }

  create() {
    const smallScreenSize = (this.scale.width < 600);

    if (smallScreenSize) {
      // Add elements for small screens
      const background = this.add.image(400, 300, 'background').setOrigin(0.5);

      const title = this.add.text(400, 200, 'NAT QUEST', {
        fontSize: '72px',
        fontFamily: 'Knewave',
        fill: '#ba76d2',
        padding: { x: 20, y: 10 },
      }).setOrigin(0.5);

      this.tweens.add({
        targets: title,
        scaleX: 1.2,
        scaleY: 1.2,
        ease: 'Sine.easeInOut',
        duration: 1000,
        yoyo: true,
        repeat: -1,
      });

      const startButton = this.add.text(400, 300, 'Start', {
        fontSize: '48px',
        fontFamily: 'knewave',
        fill: '#c92b23',
        padding: { x: 20, y: 20 },
      }).setOrigin(0.5).setInteractive();

      startButton.on('pointerdown', function () {
        this.scene.start('CharSelect');
      }, this);
    } else {
      // Add elements for larger screens
      const background = this.add.image(400, 300, 'background').setOrigin(0.5);

      const title = this.add.text(400, 200, 'NAT QUEST', {
        fontSize: '72px',
        fontFamily: 'Knewave',
        fill: '#ba76d2',
        padding: { x: 20, y: 10 },
      }).setOrigin(0.5);

      this.tweens.add({
        targets: title,
        scaleX: 1.2,
        scaleY: 1.2,
        ease: 'Sine.easeInOut',
        duration: 1000,
        yoyo: true,
        repeat: -1,
      });

      const startButton = this.add.text(400, 300, 'Start', {
        fontSize: '48px',
        fontFamily: 'knewave',
        fill: '#c92b23',
        padding: { x: 20, y: 20 },
      }).setOrigin(0.5).setInteractive();

      startButton.on('pointerdown', function () {
        this.scene.start('CharSelect');
      }, this);
    }
  }
}

window.StartMenu = StartMenu;
