document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('grid-background');
  if (!canvas) {
    // If not present, create and insert
    canvas = document.createElement('canvas');
    canvas.id = 'grid-background';
    document.body.insertBefore(canvas, document.body.firstChild);
  }
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function drawGrid(offsetX, offsetY) {
    const gridSize = 75;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#44444499';
    ctx.lineWidth = 2;

    // Vertical lines
    for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x + offsetX, 0);
      ctx.lineTo(x + offsetX, canvas.height);
      ctx.stroke();
    }
    // Horizontal lines
    for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y + offsetY);
      ctx.lineTo(canvas.width, y + offsetY);
      ctx.stroke();
    }
  }

  function animate() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxOffset = 15;
    const relativeX = (mouseX - centerX) / centerX;
    const relativeY = (mouseY - centerY) / centerY;
    const offsetX = relativeX * maxOffset;
    const offsetY = relativeY * maxOffset;
    drawGrid(offsetX, offsetY);
    requestAnimationFrame(animate);
  }
  animate();
});
