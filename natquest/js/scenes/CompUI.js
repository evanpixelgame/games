
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

        const vw = window.innerWidth;
    const xMid = vw * .5;
    const vh = window.innerHeight;

    // ****************************************************************FULL SCREEN BUTTON*************************************************************
      const fullscreenButton = this.add.text(xMid/3, 50, 'Fullscreen', {
      fontSize: '26px', 
      fontFamily: 'Roboto',
      fill: '#ffffff',  //'#c92b23',
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
 // ****************************************************************EVENT LISTENERS*************************************************************
    
 //   this.scale.on('fullscreenchange', this.handleFullscreenChange.bind(this));
    this.scale.on('resize', this.handleFullscreenChange, this);

  } 
  // ^^^closing brackets of create func

   // ****************************************************************FULL SCREEN BUTTON METHODS*************************************************************

 requestFullScreen() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
        element.msRequestFullscreen();
    }
}

   handleFullscreenChange() {
     console.log('before if logic');
        if (this.scale.isFullscreen) {
            console.log('Entering fullscreen mode');
            this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
        } else {
            console.log('Exiting fullscreen mode');
            this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
        }
    }

      resizeGame(gameSize) {
        console.log('attempting resize with resizeGame method');
        const { width, height } = gameSize;

        // Resize the game canvas
        this.sys.game.canvas.style.width = width + 'px';
        this.sys.game.canvas.style.height = height + 'px';

        // Resize the game config to match the new size
        this.sys.game.config.width = width;
        this.sys.game.config.height = height;

        // Call resize events on all scenes
        this.events.emit('resize', gameSize);
    }

  isFullScreen() {
    return (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    );
}

exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

  

  update(time, delta) {

  }

}
window.CompUI = CompUI;
