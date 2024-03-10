const globalData = new DataPlugin(); // Create a global data manager (can create additional local instances
//too by making more new DataPlugin classes in each scene that needs its own data management)
// Access the data manager using `this.dataManager`
this.globalData.set('health', 100); // Store health
const playerHealth = this.dataManager.get('health'); // Retrieve health
// ... and so on for other data keys ...

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
    OpenWorld,
  ],
};

const game = new Phaser.Game(config);
