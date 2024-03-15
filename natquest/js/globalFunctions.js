
function handleReorientation() {
  // Update game canvas dimensions
  game.canvas.width = Math.min(window.screen.availWidth, 900);
  game.canvas.height = window.screen.availHeight;
  game.scale.setScaleMode(Phaser.Scale.ScaleModes.FIT);
}

window.addEventListener('orientationchange', handleReorientation);
