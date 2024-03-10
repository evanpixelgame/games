class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  preload() {
    // Load your assets here using Phaser's loading methods (e.g., this.load.image, this.load.audio)
    // this.load.image('background', 'assets/backgrounds/startScreenBackground.jpg');
    this.load.image('background', 'assets/backgrounds/startScreenBackground.png');

    
    //maybe just add a pink background that matches the background color set in StartMenu
 //also sometimes it still seems to glitch a little bit, i bet more stuff just needs to be loaded onto this screen for it to work properly
    
    const progressBar = this.add.rectangle(200, 200, 300, 50, 0xcccccc);
    const desiredFontFamily = 'Knewave';
  const progressText = this.add.text(200, 220, 'Loading...', {
      fontFamily: 'Knewave',
      color: 'black',
      fontSize: '32px'
});
progressText.setOrigin(0.5, 0.5);

this.load.on('complete', () => {
  if (progressText.style.fontFamily === desiredFontFamily) { // Check stored font family
    this.scene.start('StartMenu');
  } else {
    console.warn('Font might not be loaded yet, delaying scene transition...');
  }
});

/*    const progressText = this.add.text(200, 220, 'Loading...', {
      fontFamily: 'Knewave',
      color: 'black',
      fontSize: '32px'
});
      progressText.setOrigin(0.5, 0.5); /* Center the text (optional) */


    this.load.on('progress', (percent) => {
      progressBar.setScale(percent, 1);
      progressText.setText(`Loading: ${Math.floor(percent * 100)}%`);
    });

    this.load.on('complete', () => {
      this.scene.start('StartMenu');
    });

    create() {
         const background = this.add.image(400, 300, 'background');
    background.setOrigin(0.5);
}
  }
}

window.Preloader = Preloader;
