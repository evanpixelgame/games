const width = window.innerWidth;
const height = window.innerHeight;
//const width = 800;
//const height = 600;
const config = {
  type: Phaser.AUTO,
  width: height,
  height: width,
  parent: 'game-container',
  pixelArt: true,
  scale: {
  //  mode: Phaser.Scale.LANDSCAPE,
//  mode: Phaser.Scale.RESIZE,
   // mode: Phaser.Scale.ScaleModes.WIDTH_CONTROLS_HEIGHT,
//  autoCenter: Phaser.Scale.CENTER_BOTH,
  // autoCenter: Phaser.Scale.CENTER_VERTICALLY,
  //  autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
   // autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [
    Preloader,
    StartMenu,
    CharSelect,
    WelcomePlayer,
    OpenWorld,
    MobileControls,
    ComputerControls,
    PlayerAnimations,
  ],
};

const game = new Phaser.Game(config);
