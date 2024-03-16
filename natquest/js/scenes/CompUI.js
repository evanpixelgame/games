
class CompUI extends Phaser.Scene {
  constructor() {
    super({ key: 'CompUI' });
  }
      
  preload() {

  }

  create() {

        this.openWorldScene = this.scene.get('OpenWorld');
        this.player = this.openWorldScene.player;
        this.speed = this.openWorldScene.speed;

     const startMenuScene = this.scene.get('StartMenu');

        const fullscreenButton = this.add.text(120, 50, 'Fullscreen', {
      fontSize: '26px', 
      fontFamily: 'knewave',
      fill: '#c92b23',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
      .setInteractive();


     fullscreenButton.on('pointerdown', () => {
    if (this.isFullScreen()) {
        this.exitFullScreen();
    } else {
        this.requestFullScreen();
    }
});

    
 //   this.scale.on('fullscreenchange', this.handleFullscreenChange.bind(this));
    this.scale.on('resize', startMenuScene.handleFullscreenChange, this);

  }


  

  update(time, delta) {

  }

}
window.CompUI = CompUI;
