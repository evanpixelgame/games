
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

    // ****************************************************************TOP BAR UI ICONS*************************************************************

    const settingsIcon = this.add.sprite(6.5 * vw / 9, 50, 'settingsIcon').setInteractive();
        const zoomInIcon = this.add.sprite(7 * vw / 9, 50, 'zoomInIcon').setInteractive();
        const zoomOutIcon = this.add.sprite(6 * vw / 9, 50, 'zoomOutIcon').setInteractive();   //was at 7.5 vw changed temp for diagnosis
        const fullscreenIcon = this.add.sprite(8.1 * vw/ 9, 50, 'fullscreenIcon').setInteractive();

       settingsIcon.setScale(0.1);
        zoomInIcon.setScale(0.2);
        zoomOutIcon.setScale(0.2);
        fullscreenIcon.setScale(.12);

settingsIcon.on('pointerdown', () => {
    // Get the position of the settings icon
    const { x, y } = settingsIcon;

    // Offset the dropdown menu position based on the settings icon
    const dropdownButton = this.add.text(x, y + settingsIcon.displayHeight, 'settingsIcon', { fill: '#ffffff' })
        .setInteractive();

        // Create a dropdown container group
        const dropdownContainer = this.add.group();

        // Add dropdown options
        const options = ['Option 1', 'Option 2', 'Option 3'];
        options.forEach((option, index) => {
            const optionText = this.add.text(100, 150 + index * 50, option, { fill: '#ffffff' })
                .setInteractive();
            dropdownContainer.add(optionText);

            // Set up click event for each option
            optionText.on('pointerdown', () => {
                console.log(`Selected: ${option}`);
                // Handle option selection logic here
            });
        });

        // Hide dropdown container initially
        dropdownContainer.setVisible(false);

        // Set up click event for dropdown button
        dropdownButton.on('pointerdown', () => {
            dropdownContainer.setVisible(!dropdownContainer.visible);
        });
          });

  /*      zoomOutIcon.on('pointerdown', () => {
            // Handle zoom out icon click
            console.log('Zoom out icon clicked');
              }
        }); */
          

        // Set click event handler for the zoom in icon
        zoomInIcon.on('pointerdown', () => {
          console.log('zoominattempt');
            // Check if the current zoom level is less than the maximum allowed
            if (this.zoomLevel < 5) {
                // Increase the zoom level
                this.zoomLevel++;
                console.log('Zoom in clicked. Zoom level:', this.zoomLevel);

                // Perform zoom operation here, e.g., adjust camera zoom, scale game objects, etc.
                this.cameras.main.zoom *= 1.1; // Increase zoom by 10%
            } else {
                console.log('Maximum zoom level reached.');
            }
        });

            // Set click event handler for the zoom in icon
        zoomOutIcon.on('pointerdown', () => {
          console.log('zoomoutattempt');
            // Check if the current zoom level is less than the maximum allowed
            if (this.zoomOutLevel < 5) {
                // Increase the zoom level
                this.zoomLevel++;
                console.log('Zoom out clicked. Zoom level:', this.zoomLevel);

                // Perform zoom operation here, e.g., adjust camera zoom, scale game objects, etc.
                this.cameras.main.zoom /= 1.1; // Increase zoom by 10%
            } else {
                console.log('Maximum zoom out level reached.');
            }
        });



        fullscreenIcon.on('pointerdown', () => {
            // Handle fullscreen icon click
            console.log('Fullscreen icon clicked');
              if (this.isFullScreen()) {
              this.exitFullScreen();
                } else {
              this.requestFullScreen();
                }
                    });

            

    

    // ****************************************************************FULL SCREEN BUTTON*************************************************************
  /*    const fullscreenButton = this.add.text(xMid/3, 50, 'Fullscreen', {
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

  */  //hopefully this just gets rid of the white text that says fullscreen and just leaves the icons

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
    console.log('Fullscreen change detected');

    // Check if the game is running on a mobile device
    const isMobile = /Mobi|Android|iOS/i.test(navigator.userAgent);

    // Apply delay only if on a mobile device was running into problem where it would capture resize zone too early and cut off the canvas
    if (isMobile) {
        // Wait for a short delay before resizing
        setTimeout(() => {
            if (this.scale.isFullscreen) {
                console.log('Entering fullscreen mode');
                this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
            } else {
                console.log('Exiting fullscreen mode');
                this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
            }
        }, 1000); // Adjust the delay time as needed
    } else {
        // Resize immediately without delay for desktop
        if (this.scale.isFullscreen) {
            console.log('Entering fullscreen mode');
            this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
        } else {
            console.log('Exiting fullscreen mode');
            this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
        }
    }
}

  
 /*
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
    */

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
