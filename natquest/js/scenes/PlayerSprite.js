export class PlayerSprite extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture) {
        super(scene.matter.world, x, y, texture);
        scene.add.existing(this);
        this.scene = scene;

        // Call the initialization method
        this.init();
     this.body = this.body;
    this.gameObject = this;
    }

    init() {
        // Set up the body type based on the actual shape of the sprite
        this.setBody({
            type: 'rectangle', // Adjust this based on the shape of your sprite
            width: this.width,
            height: this.height,
            isStatic: false, // Adjust this based on whether the sprite should be movable by physics
            restitution: 0,
            friction: 0.1,
            frictionAir: 0.02,
        });

        this.setScale(0.5);

        // Resize the physics body if needed
        const scaledWidth = this.width * 0.5;
        const scaledHeight = this.height * 0.5;
        this.setSize(scaledWidth, scaledHeight);
    }
}
