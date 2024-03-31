import { PlayerSprite } from './PlayerSprite.js';
import { sensorMapSet, createCollisionObjects, sensorHandler } from './collisionHandler.js';

export default class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    this.map = null;
    this.player = null;
    this.collisionObjects = null; 
    this.transitionSensors = null; // Add transitionSensors property
    this.engine = null;
   this.world = null;
   this.cursors = null;
  }

  init(data) {
        this.openWorldScene = data.OpenWorld;
  }
      
  preload() {
    
  }
       
  create() {
    this.matterEngine = Phaser.Physics.Matter.Matter.World;
    this.engine = this.matter.world;
     this.world = this.matterEngine.create({
    // your Matter.js world options here
  });

    this.scene.launch('CompUI', { OpenWorld: this, player: this.player, speed: this.speed, map: this.map, camera: this.cameras.main });

    // Load map
    const map = this.make.tilemap({ key: 'map' });

    // Load tileset
    const tilesetsData = [
        { name: 'tilesheetTerrain', key: 'tilesheetTerrain' },
        { name: 'tilesheetInterior', key: 'tilesheetInterior' },
        { name: 'tilesheetBuildings', key: 'tilesheetBuildings' },
        { name: 'tilesheetWalls', key: 'tilesheetWalls' },
        { name: 'tilesheetObjects', key: 'tilesheetObjects' },
        { name: 'tilesheetFlourishes', key: 'tilesheetFlourishes' }
    ];

    const tilesets = [];
    tilesetsData.forEach(tilesetData => {
        tilesets.push(map.addTilesetImage(tilesetData.name, tilesetData.key));
    });

    // Create layers using all tilesets
    const layers = [];
    for (let i = 0; i < map.layers.length; i++) {
        layers.push(map.createLayer(i, tilesets, 0, 0));
    }

  this.player = new PlayerSprite(this, 495, 325, 'player', 0, 0); //last two arguments are initial velocity x, y

const boundaryOffset = 2; // Adjust this value as needed
const worldBounds = new Phaser.Geom.Rectangle(
    boundaryOffset,
    boundaryOffset,
    map.widthInPixels - 2 * boundaryOffset,
    map.heightInPixels - 2 * boundaryOffset
);

this.matter.world.setBounds(0, 0, worldBounds.width, worldBounds.height);

    this.collisionObjects = createCollisionObjects(this, map);
   this.sensorMapping = sensorMapSet(this, map, this.sensorID);  //this.transitionSensors?
//this.sensorHandling = sensorHandler(this, map, this.player); //used to have this.transitionSensors as an argument then it became  this.sensorID
          
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    const startMenuScene = this.scene.get('StartMenu');
    this.cameras.main.setZoom(2);

      this.cursors = this.input.keyboard.createCursorKeys();
  }
   
  update(time, delta) {

        if (!this.player) {
        return;
    }
 const cursors = this.input.keyboard.createCursorKeys();

  // Calculate velocity based on key presses
  let velocityX = 0;
  let velocityY = 0;

  if (cursors.up.isDown) {
    velocityY = -this.speed;
  } else if (cursors.down.isDown) {
    velocityY = this.speed;
  }

  if (cursors.left.isDown) {
    velocityX = -this.speed;
  } else if (cursors.right.isDown) {
    velocityX = this.speed;
  }

  // Apply force to the Matter JS body
  const playerBody = this.matter.world.bodies.filter(body => body.label === 'player')[0];
  if (playerBody) {
    Matter.Body.applyForce(playerBody, { x: velocityX, y: velocityY });
  }
  
}

window.OpenWorld = OpenWorld;
