export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture) {
        super(scene.matter.world, x, y, texture);
        scene.add.existing(this);

     //   this.setScale(0.5); // Scale down the player //currently handled in the create method
        // Other initialization logic for the player...
    }



create() {

     this.openWorldScene = this.scene.get('OpenWorld');
        this.player = this.openWorldScene.player;
        this.speed = this.openWorldScene.speed;

// Create player sprite
  this.player = this.scene.get('WelcomePlayer').player;
this.player = this.matter.add.sprite(15, 15, 'player');

    const playerWidth = this.player.width;
const playerHeight = this.player.height;


    this.player.setBody({
    type: 'rectangle', // Set the body type as a rectangle
    width: playerWidth / 2,/* Width of your player sprite */
    height: playerHeight / 2,/* Height of your player sprite */
    isStatic: false, // Set to true if your player shouldn't move
    restitution: 0, // Bounce (0 = no bounce, 1 = full bounce)
    friction: .1, // Friction (0 = no friction, 1 = full friction)
    frictionAir: 0.02, // Air friction (drag)
    // Other optional properties...
});

      this.player.setScale(0.5);

    
        const scaledWidth = this.player.width * 0.5; // Scale the width
        const scaledHeight = this.player.height * 0.5; // Scale the height

          // Set the size of the player's collision body
        this.player.setSize(scaledWidth, scaledHeight);

      }

  update() {
    
  }

  
      }
window.Player = Player;
