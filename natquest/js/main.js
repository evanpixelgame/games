const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  pixelArt: true,
  scene: [
    StartScene,
    CharacterSelectScreen,
    WorldScene,
  ],
};

const game = new Phaser.Game(config);
