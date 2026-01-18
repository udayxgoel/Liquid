gsap.registerPlugin(ScrollTrigger);

// 1. LIQUID BACKGROUND PARTICLES
const canvas = document.getElementById("liquid-bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }
  draw() {
    ctx.fillStyle = "rgba(212, 175, 55, 0.2)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
function init() {
  for (let i = 0; i < 80; i++) particles.push(new Particle());
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
init();
animate();

// 2. HERO ANIMATIONS
gsap.from(".hero h1", {
  y: 100,
  opacity: 0,
  duration: 1.5,
  ease: "expo.out",
});
gsap.from(".hero p", {
  y: 50,
  opacity: 0,
  duration: 1.5,
  delay: 0.3,
  ease: "expo.out",
});

// 3. STATS COUNT UP
gsap.from(".count", {
  scrollTrigger: ".stats-row",
  opacity: 0,
  y: 20,
  duration: 1,
  stagger: 0.2,
});

// 4. BENTO CARDS & TERMINAL
gsap.utils.toArray(".animate-card, .tier-card").forEach((card) => {
  gsap.from(card, {
    scrollTrigger: card,
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });
});
gsap.to(".code-line", {
  scrollTrigger: ".terminal-window",
  opacity: 1,
  x: 0,
  stagger: 0.5,
  duration: 1,
});

gsap.to(".horizontal-scroll-content", {
  xPercent: -200,
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-scroll-container",
    pin: true,
    scrub: 1,
    start: "top top",
    end: "+=1500",
  },
});

// 6. 3D CARD INTERACTION
const cards = document.querySelectorAll(".asset-card");
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    card.style.transform = `rotateY(${dx / 12}deg) rotateX(${-dy / 12}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
  });
});

// 7. FAQ TOGGLE
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// 8. PARALLAX ORB
document.addEventListener("mousemove", (e) => {
  gsap.to(".blur-orb", {
    x: (e.clientX - window.innerWidth / 2) * 0.05,
    y: (e.clientY - window.innerHeight / 2) * 0.05,
    duration: 2,
    ease: "power2.out",
  });
});
