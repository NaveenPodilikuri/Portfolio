const container = document.getElementById('scrollCertificates');
let scrollAmount = 1;
let isPaused = false;
let isDragging = false;
let startX, scrollLeft;

// Auto-scroll function
function autoScroll() {
  if (!isPaused && !isDragging) {
    container.scrollLeft += scrollAmount;
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth || container.scrollLeft <= 0) {
      scrollAmount = -scrollAmount; // reverse direction
    }
  }
}

let scrollInterval = setInterval(autoScroll, 20);

// Pause auto-scroll on mouse enter
container.addEventListener('mouseenter', () => isPaused = true);
container.addEventListener('mouseleave', () => isPaused = false);

// Drag to scroll
container.addEventListener('mousedown', (e) => {
  isDragging = true;
  isPaused = true;
  container.classList.add('active');
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener('mouseleave', () => {
  isDragging = false;
  isPaused = false;
  container.classList.remove('active');
});

container.addEventListener('mouseup', () => {
  isDragging = false;
  isPaused = false;
  container.classList.remove('active');
});

container.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 2; // adjust drag speed
  container.scrollLeft = scrollLeft - walk;
});
