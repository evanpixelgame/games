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

        // Add a start button
    const settings = this.add.text(75, 150, 'Settings', {
      fontSize: '26px', 
      fontFamily: 'knewave',
      fill: '#c92b23',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
    //  .setInteractive();
    // ^^ make interactable later with a Settings page with the proper UI
    // also include an audio on/off toggle in top right when audio is added
    //eventually also have a Load Game option when i figure out how to use browser local storage to create saves
    //should also make a save option that lets people save their file to their local pc/device
    //so that they can continue their game without fear of it being solely held in a browser that might get wiped

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



 window.addEventListener('orientationchange', this.handleResizeOnReorientation);
 //   window.addEventListener('resize', this.handleResizeOnReorientation);
    
  }

handleResizeOnReorientation() {
location.reload();
  console.log('thisworksed');
}

  
}

window.StartMenu = StartMenu;
