const width = window.innerWidth;
const height = window.innerHeight;
//const width = 800;
//const height = 600;
const config = {
  type: Phaser.AUTO,
  width: width,
  height: height,
  parent: 'game-container',
  pixelArt: true,
  scale: {
   // mode: Phaser.Scale.RESIZE,
   // autoCenter: Phaser.Scale.CENTER_BOTH,
    //mode: Phaser.Scale.FIT,
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
    ComputerControls,
    PlayerAnimations,
  ],
};

const game = new Phaser.Game(config);
