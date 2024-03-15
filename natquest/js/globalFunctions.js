
function handleOrientationChange() {
  // Update game canvas dimensions
  game.canvas.width = Math.min(window.screen.availWidth, 800);
  game.canvas.height = window.screen.availHeight;
}

window.addEventListener('orientationchange', handleReorientation);
