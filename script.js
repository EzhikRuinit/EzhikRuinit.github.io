// --- starfield.js ---
document.addEventListener('DOMContentLoaded', () => {
  // STARFIELD EFFECT
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');

  // Set canvas size
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Star parameters
  const STAR_NUM = 200;
  const STARS = [];
  const speed = 0.01;

  function randomStar(zMax = 1) {
    // random position in -1...1 space, central projection
    // z: distance, higher = closer & faster
    return {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random() * zMax,
    };
  }

  // Initial spawn
  for (let i = 0; i < STAR_NUM; i++) STARS.push(randomStar(1));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const fov = Math.min(cx, cy); // perspective fov

    for (let i = 0; i < STAR_NUM; i++) {
      let star = STARS[i];
      star.z -= speed;
      if (star.z <= 0.001) STARS[i] = randomStar(1);

      // Project to screen
      const px = cx + star.x * fov / star.z;
      const py = cy + star.y * fov / star.z;
      // Star "size" scales with z (near = big, far = small)
      const size = (1 - star.z) * 3 + 1;

      if (px < 0 || py < 0 || px >= canvas.width || py >= canvas.height)
        STARS[i] = randomStar(1);

      ctx.beginPath();
      ctx.arc(px, py, size, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.globalAlpha = 0.75;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(draw);
  }
  draw();

  // keep your other JS below (for title and subtitle)
  setTimeout(() => {
    document.querySelector('.title1').classList.add('animate');
    document.querySelector('.subtitle1').classList.add('animate');
  }, 250);

  const texts = [
    '"more stuff soon"',
    '"ts so pmo"',
    '"данжик когда в репо"',
    '"join our revolt btw <3"',
    '"powered by fedora"',
    '"imagine a peak text here"',
    '"catflex on top"',
    '"made with <3 by sewerend"',
    '"rtfm yo dumbahh"'
  ];

  function getRandomText(texts) {
    return texts[Math.floor(Math.random() * texts.length)];
  }

  const subtitle1Element = document.querySelector('.subtitle1');
  if (subtitle1Element) {
    subtitle1Element.textContent = getRandomText(texts);
  }
});
