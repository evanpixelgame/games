
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
    
     const fullscreenButton = this.add.text(120, 30, 'Fullscreen', {
      fontSize: '22px', 
      fontFamily: 'Roboto',
      fill: '#ffffff',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
      .setInteractive();

 //   this.scale.on('fullscreenchange', this.handleFullscreenChange.bind(this));
    this.scale.on('resize', startMenuScene.handleFullscreenChange, this);

  }

  update(time, delta) {

  }

}
window.CompUI = CompUI;
