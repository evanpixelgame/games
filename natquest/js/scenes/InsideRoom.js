export default class InsideRoom extends Phaser.Scene {
  constructor() {
    super({ key: 'InsideRoom' });
    }

    preload() {
    }

    create() {
        // Create the new map using the loaded tilemap
        const map = this.make.tilemap({ key: 'insidemap' });

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
   this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      
        // Load tilesets and create layers similar to how it's done in the OpenWorld scene
        // Adjust camera bounds and follow the player if needed
        // Add any additional setup specific to this scene
    }

    // Optionally, you may need to define an update method if this scene requires regular updates
    update(time, delta) {
        // Update method code here
    }
}
window.InsideRoom = InsideRoom;
