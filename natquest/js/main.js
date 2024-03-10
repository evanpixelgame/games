class GameManager {
  constructor() {
    this.selectedCharacter = null;
    this.playerName = '';
    this.health = 100;
    this.stamina = 100;
  }
}

const gameManager = new GameManager();

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  pixelArt: true,
  scene: [
    Preloader,
    StartMenu,
    CharSelect,
    WelcomePlayer,
    OpenWorld,
  ],
};

const game = new Phaser.Game(config);
