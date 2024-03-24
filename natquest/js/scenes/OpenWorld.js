import { PlayerSprite } from './PlayerSprite.js';
import { createCollisionObjects, handleBarrierCollision } from './collisionHandler.js';

export default class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    // Declare controls as a property of the class (should I delete these and put in the init func?
    this.controls = null;
    this.map = null;
    this.player = null;
    this.speed = 2; 
    this.collisionObjects = null; 
  }

  init(data) {
        this.openWorldScene = data.OpenWorld;
    }
      
  preload() {
    
  }

create() {
    // Create Matter.js engine
    this.matterEngine = this.matter.world;

    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.scene.launch('MobileControls', { player: this.player, speed: this.speed });
    }
    this.scene.launch('ComputerControls', { player: this.player, speed: this.speed });
    this.scene.launch('PlayerAnimations', { player: this.player, speed: this.speed });
    this.scene.launch('CompUI', { OpenWorld: this, player: this.player, speed: this.speed, map: this.map, camera: this.cameras.main });

    // Load map
    this.map = this.make.tilemap({ key: 'map' });
    const tileset = this.map.addTilesetImage('tilemap1', 'tiles');

    // Create layers
    const worldLayer = this.map.createLayer('Tile Layer 1', tileset, 0, 0);

    // Convert tilemap to Matter.js physics bodies
    this.matterEngine.convertTilemap(this.map, 'Object Layer 1');

    this.player = new PlayerSprite(this, 15, 15, 'player');

    const boundaryOffset = 2;
    const worldBounds = new Phaser.Geom.Rectangle(
        boundaryOffset,
        boundaryOffset,
        this.map.widthInPixels - 2 * boundaryOffset,
        this.map.heightInPixels - 2 * boundaryOffset
    );

    this.matterEngine.setBounds(0, 0, worldBounds.width, worldBounds.height);

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    const startMenuScene = this.scene.get('StartMenu');
    this.cameras.main.setZoom(2);
}


//*****************************************************END OF CREATE FUNC ABOVE*******************************************************

  //*****************************************************************END METHODS, START OF UPDATE FUNC**************************************
  
  
update(time, delta) {
    Matter.Events.on(this.matter.world, 'collisionStart', (event) => {
        event.pairs.forEach((pair) => {
            if (pair.bodyA === this.player.body || pair.bodyB === this.player.body) {
                if (this.collisionObjects.includes(pair.bodyA) || this.collisionObjects.includes(pair.bodyB)) {
                    handleBarrierCollision(this.player, pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA);
                }
            }
        });
    });
}
  
}
window.OpenWorld = OpenWorld;
