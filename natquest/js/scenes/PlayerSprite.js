export class PlayerSprite extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture) {
        super(scene.matter.world, x, y, texture); // Pass texture parameter directly
        scene.add.existing(this);
        this.scene = scene;

        // Call the initialization method
        this.init();
    }

    init() {
        // Set up physics body
        const playerWidth = this.width; // Use original sprite width
        const playerHeight = this.height; // Use original sprite height

        this.setBody({
            type: 'rectangle',
            width: playerWidth, // Adjust width according to sprite size
            height: playerHeight, // Adjust height according to sprite size
            isStatic: false,
            restitution: 0,
            friction: 0.1,
            frictionAir: 0.02,
        });

        // Set scale
        this.setScale(0.5); // You can adjust the scale as needed

        // Set size
        const scaledWidth = this.width * 0.5;
        const scaledHeight = this.height * 0.5;
        this.setSize(scaledWidth, scaledHeight);
    }
}
