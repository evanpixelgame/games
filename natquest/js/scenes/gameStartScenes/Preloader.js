class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  preload() {
    // Load your assets here using Phaser's loading methods (e.g., this.load.image, this.load.audio)
    this.load.image('background', 'assets/backgrounds/startScreenBackground.jpg');

    const webfontConfig = {
      families: ['Knewave', 'Protest Riot'], // Specify your font families
      active: () => {
        // This function will be called when fonts are loaded
        this.fontsLoaded = true; // Set a flag to track font loading completion
      }
    };

    WebFont.load(webfontConfig);

    // Additional assets loading if needed...

    const progressBar = this.add.rectangle(200, 200, 300, 50, 0xcccccc);
    const progressText = this.add.text(200, 220, 'Loading...', { color: 'black' });

    this.load.on('progress', (percent) => {
      progressBar.setScale(percent, 1);
      progressText.setText(`Loading: ${Math.floor(percent * 100)}%`);
    });

    this.load.on('complete', () => {
      if (this.fontsLoaded) {
        this.scene.start('StartMenu');
      } else {
        console.warn('Fonts not fully loaded yet, waiting...'); // Handle potential delays
      }
    };
  }
}

window.Preloader = Preloader;
