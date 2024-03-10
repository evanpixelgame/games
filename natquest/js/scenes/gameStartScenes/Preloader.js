class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  preload() {
    // Load your assets here using Phaser's loading methods (e.g., this.load.image, this.load.audio)
    this.load.image('background', 'assets/backgrounds/bodyBackground2.jpg');

    const progressBar = this.add.rectangle(200, 200, 300, 50, 0xcccccc);
    const progressText = this.add.text(200, 220, 'Loading...', { color: 'black' });

    this.load.on('progress', (percent) => {
      progressBar.setScale(percent, 1);
      progressText.setText(`Loading: ${Math.floor(percent * 100)}%`);
    });

    this.load.on('complete', () => {
      this.scene.start('StartMenu');
    });
  }
}

window.Preloader = Preloader;
