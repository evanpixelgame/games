let isLandscapeMode = (window.innerWidth < window.innerHeight);
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  pixelArt: true,
  scale: {
    //mode: Phaser.Scale.RESIZE,
    //autoCenter: Phaser.Scale.CENTER_BOTH
    mode: phoneScreen ? Phaser.Scale.LANDSCAPE : Phaser.Scale.PORTAIT,
    autoCenter: phoneScreen ? Phaser.Scale.CENTER_BOTH : Phaser.Scale.CENTER_NONE,
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
