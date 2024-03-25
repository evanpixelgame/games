export class PlayerSprite extends Phaser.Physics.Matter.Sprite {
    constructor(world, scene, x, y, texture) {
        super(world, x, y, texture);

        // Initialize the player sprite
        this.init();

        // Add the player sprite to the scene
        scene.add.existing(this);
        this.body = this.body;
        this.gameObject = this;
    }

    init() {
        // Set up the player's physics body
        const playerWidth = this.width;
        const playerHeight = this.height;
        this.setBody({
            type: 'rectangle',
            width: playerWidth / 2,
            height: playerHeight / 2,
            isStatic: false,
            restitution: 0,
            friction: 0.1,
            frictionAir: 0.02,
        });

        // Set the player's scale and size
        this.setScale(0.5);
        const scaledWidth = playerWidth * 0.5;
        const scaledHeight = playerHeight * 0.5;
        this.setSize(scaledWidth, scaledHeight);
    }
}
