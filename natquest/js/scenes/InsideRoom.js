import { PlayerSprite } from './PlayerSprite.js';
import { createCollisionObjects, createTransitionSensors, handleBarrierCollision } from './collisionHandler.js';

export default class InsideRoom extends Phaser.Scene {
  constructor() {
    super({ key: 'InsideRoom' });
    }

    preload() {
    }

  init(data) {
    this.mapKey = data.mapKey;
    this.player = data.player;
    this.camera = data.camera;
    this.speed = data.speed;
}

    create() {
        // Create the new map using the loaded tilemap
        const map = this.make.tilemap({ key: 'insidemap' });

         // Load tileset
    const tilesetsData = [
        { name: 'tilesheetInterior', key: 'tilesheetInterior' },
        { name: 'tilesheetWalls', key: 'tilesheetWalls' },
        { name: 'tilesheetObjects', key: 'tilesheetObjects' },
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
    }


    update(time, delta) {
     
    }
}
window.InsideRoom = InsideRoom;
