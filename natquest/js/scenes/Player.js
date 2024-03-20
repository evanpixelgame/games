export class Player extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture) {
        super(scene.matter.world, x, y, texture);
        scene.add.existing(this);
        this.scene = scene;
    }

    create() {
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

        this.setScale(0.5);

        const scaledWidth = this.width * 0.5;
        const scaledHeight = this.height * 0.5;

        this.setSize(scaledWidth, scaledHeight);
    }
}

window.player = Player;
