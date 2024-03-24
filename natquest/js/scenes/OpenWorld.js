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
 //  this.matterEngine.gravity.y = 0.5;

    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.scene.launch('MobileControls', { player: this.player, speed: this.speed });
      }
     this.scene.launch('ComputerControls', { player: this.player, speed: this.speed });
     this.scene.launch('PlayerAnimations', { player: this.player, speed: this.speed });
   this.scene.launch('CompUI', { OpenWorld: this, player: this.player, speed: this.speed, map: this.map, camera: this.cameras.main });

  //Load map
  const map = this.make.tilemap({ key: 'map' });
  // Load tileset
  const tileset = map.addTilesetImage('tilemap1', 'tiles');

  // Create layers ('Object Layer 1' layer creation is in collisionHanlder.js aka collision barrier layer 
  const worldLayer = map.createLayer('Tile Layer 1', tileset, 0, 0);
//  const worldObjectLayer = map.createLayer('Object Layer 1', tileset, 0, 0);
 // const worldCollisionObjectLayer = map.createLayer('Tile Layer 3', tileset, 0, 0);

    
const collisionLayer = map.getLayer('Object Layer 1'); // Replace with your actual collision layer name
this.matter.world.convertTilemapLayer(collisionLayer);



    this.player = new PlayerSprite(this, 15, 15, 'player'); // Create the player object

    // Access player properties or methods as needed after it's created
    const playerX = this.player.x;
    const playerY = this.player.y;
    
    //*****************************************CAMERA CONTROLS****************************************************
  // Constrain the camera
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        const startMenuScene = this.scene.get('StartMenu');
        this.cameras.main.setZoom(2);
    
  } // <==== create func end tag    

//*****************************************************END OF CREATE FUNC ABOVE*******************************************************

  //*****************************************************************END METHODS, START OF UPDATE FUNC**************************************
  
  
update(time, delta) {
  
}
  
}
window.OpenWorld = OpenWorld;
