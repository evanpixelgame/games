
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  pixelArt: true,
  scale: {
    //mode: Phaser.Scale.RESIZE,
    //autoCenter: Phaser.Scale.CENTER_BOTH
   mode: Phaser.Scale.FIT,
   // autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [
    Preloader,
    StartMenu,
    CharSelect,
    WelcomePlayer,
    OpenWorld,
    MobileControls,
  ],
};

const game = new Phaser.Game(config);
