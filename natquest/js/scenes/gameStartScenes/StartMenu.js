class StartMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'StartMenu' });
  }

  preload() {
    
  }

  create() {

    // Add background image
    const background = this.add.image(400, 300, 'background');
    background.setOrigin(0.5);

    // Add a title
    const title = this.add.text(400, 200, 'NAT QUEST', {
      fontSize: '72px', 
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
    const startButton = this.add.text(100, 100, 'Start', {
      fontSize: '48px', 
      fontFamily: 'knewave',
      fill: '#c92b23',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
      .setInteractive();

    // Set a callback function for the button click event
    startButton.on('pointerdown', function () {
         const orientation = window.screen.orientation.type;
    // Check if the device is in landscape mode
    if (orientation.includes('landscape')) {
        // Execute event handler code only in landscape mode
        console.log('Click event in landscape mode');
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
