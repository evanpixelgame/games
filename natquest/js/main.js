
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
    //mode: Phaser.Scale.LANDSCAPE,
    //autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [
    Preloader,
    StartMenu,
    CharSelect,
    WelcomePlayer,
    OpenWorld,
  ],
};

const game = new Phaser.Game(config);
