class StartMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'StartMenu' });
  }

  preload() {
    
  }

  create() {

    const vw = window.innerWidth;
    const xMid = vw * .5;
    const vh = window.innerHeight;
      

    // Add background image
    const background = this.add.image(xMid, vh * .8, 'background');
    background.setOrigin(0.5);

// Add selection menu container
     const backdrop = this.add.graphics();
        backdrop.fillStyle(0xE6E6FA, .7);
        backdrop.lineStyle(4, 0x000000, 1);
        backdrop.fillRect(10, 20, 150, 300);

    
    // Add a title
    const title = this.add.text(xMid, 200, 'NAT QUEST', {
      fontSize: '68px', 
      fontFamily: 'Knewave',
      fill: '#ba76d2',
      padding: { x: 20, y: 10 },
    })
      .setOrigin(0.5);

    // Set up a scaling animation for the title
    this.tweens.add({
      targets: title,
      scaleX: 1.2,  // Scale up by 20%
      scaleY: 1.2,
      ease: 'Sine.easeInOut',
      duration: 1000,
      yoyo: true,  // Scale back to the original size
      repeat: -1,  // Infinite loop
    });

    // Add a start button
    const startButton = this.add.text(75, 100, 'Start', {
      fontSize: '26px', 
      fontFamily: 'knewave',
      fill: '#c92b23',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
      .setInteractive();

        // Add a settings button
    const settingsButton = this.add.text(75, 150, 'Settings', {
      fontSize: '26px', 
      fontFamily: 'knewave',
      fill: '#c92b23',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
      .setInteractive();
    // ^^ make interactable later with a Settings page with the proper UI
    // also include an audio on/off toggle in top right when audio is added
    //eventually also have a Load Game option when i figure out how to use browser local storage to create saves
    //should also make a save option that lets people save their file to their local pc/device
    //so that they can continue their game without fear of it being solely held in a browser that might get wiped

        // Add a fullscreen button
    const fullscreenButton = this.add.text(75, 200, 'Fullscreen', {
      fontSize: '26px', 
      fontFamily: 'knewave',
      fill: '#c92b23',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
      .setInteractive();

    
if (this.isMobileDevice() && this.isPortraitMode()) {
            // Add some text to the backdrop
  const instructionText = this.add.text(xMid, 2*vh/3, 'Please set your\nmobile device\nto landscape mode\nto continue', {
    fontSize: '36px',
    fontFamily: 'knewave',
    fill: '#c92b23',
    stroke: '#ba76d2',
    strokeThickness: 6,
    fontWeight: 'bold',
    align: 'center',
  })
    .setOrigin(0.5);
}
    
    // Set a callback function for the button click event
    startButton.on('pointerdown', function () {
         const orientation = window.screen.orientation.type;
    // Check if the device is in landscape mode
    if (orientation.includes('landscape')) {
        // Execute event handler code only in landscape mode
        console.log('Click event in landscape mode');
       window.removeEventListener('orientationchange', this.handleResizeOnReorientation);
      this.scene.start('NameSelect');
    } else {
        // Ignore the click event in portrait mode
        console.log('Ignoring click event in portrait mode');
      alert('please enter landscape mode to continue');
    } 
      // Transition to the main scene when the button is clicked
    }, this);

     fullscreenButton.on('pointerdown', () => {
    if (this.isFullScreen()) {
        this.exitFullScreen();
    } else {
        this.requestFullScreen();
    }
});


      settingsButton.on('pointerdown', () => {
            this.scene.start('Settings');
        });


this.scale.on('fullscreenchange', this.handleFullscreenChange, this);
this.scale.on('resize', this.resizeGame, this);
 window.addEventListener('orientationchange', this.handleResizeOnReorientation);
 //   window.addEventListener('resize', this.handleResizeOnReorientation);
    
  }

handleResizeOnReorientation() {
location.reload();
  console.log('thisworksed');
}

 isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Check if the device is in portrait mode
isPortraitMode() {
    return window.innerHeight > window.innerWidth;
}


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
        if (this.scale.isFullscreen) {
            console.log('Entering fullscreen mode');
            this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
        } else {
            console.log('Exiting fullscreen mode');
            this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
        }
    }

      resizeGame(gameSize) {
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


  
}

window.StartMenu = StartMenu;
