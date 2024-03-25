import { PlayerSprite } from './PlayerSprite.js';
import { createCollisionObjects, createCollisionObjectsLayer2, ObjectLayer2Handler } from './collisionHandler.js';

export default class OpenWorld extends Phaser.Scene {
    constructor() {
        super({ key: 'OpenWorld' });
        
        // Declare controls as a property of the class
        this.controls = null;
        this.map = null;
        this.player = null;
        this.speed = 2; 
        this.collisionObjects = null;
        this.collisionObjects2 = null;
    }

    init(data) {
        this.openWorldScene = data.OpenWorld;
    }
        
    preload() {
        // Preload assets if needed
    }

    create() {
        // Create Matter.js engine
        this.matterEngine = this.matter.world;

        // Load map
        this.map = this.make.tilemap({ key: 'map' });

        // Create tilesets
        const tilesetsData = [
            { name: 'tilesheetTerrain', key: 'tilesheetTerrain' },
            { name: 'tilesheetInterior', key: 'tilesheetInterior' },
            { name: 'tilesheetBuildings', key: 'tilesheetBuildings' },
            { name: 'tilesheetWalls', key: 'tilesheetWalls' },
            { name: 'tilesheetObjects', key: 'tilesheetObjects' },
            { name: 'tilesheetFlourishes', key: 'tilesheetFlourishes' }
        ];

        const tilesets = tilesetsData.map(tilesetData => {
            return this.map.addTilesetImage(tilesetData.name, tilesetData.key);
        });

        // Create layers using all tilesets
        const layers = [];
        for (let i = 0; i < this.map.layers.length; i++) {
            layers.push(this.map.createLayer(i, tilesets, 0, 0));
        }

        // Create the player object
        this.player = new PlayerSprite(this, 495, 325, 'player');

        // Set world bounds for the player
        const boundaryOffset = 2;
        const worldBounds = new Phaser.Geom.Rectangle(
            boundaryOffset,
            boundaryOffset,
            this.map.widthInPixels - 2 * boundaryOffset,
            this.map.heightInPixels - 2 * boundaryOffset
        );
        this.matterEngine.setBounds(0, 0, worldBounds.width, worldBounds.height);

        // Create collision objects for Object Layer 1 and Object Layer 2
        this.collisionObjects = createCollisionObjects(this, this.map);
        this.collisionObjects2 = createCollisionObjectsLayer2(this, this.map);

        // Set up collision event handlers for Object Layer 1
        this.matterCollision.addOnCollideStart({
            objectA: this.player,
            callback: (eventData) => {
                eventData.bodyB.gameObject && this.handleCollisionWithObjectLayer1(eventData.bodyB.gameObject);
            }
        });

        // Set up collision event handlers for Object Layer 2
        this.matterCollision.addOnCollideStart({
            objectA: this.player,
            callback: (eventData) => {
                eventData.bodyB.gameObject && this.handleCollisionWithObjectLayer2(eventData.bodyB.gameObject);
            }
        });

        // Configure camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.setZoom(2);
    }

    update(time, delta) {
        // Update logic if needed
    }

    handleCollisionWithObjectLayer2() {
        // Handle collision with Object Layer 2
        // Transition to the InsideRoom scene or perform any other necessary actions here
        console.log('Transitioning to InsideRoom scene');
        this.scene.start('InsideRoom');
    }
}
