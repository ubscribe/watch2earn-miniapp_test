const slides = [
  "Welcome to $UBSCRIBE",
  "The first watch-to-earn token",
  "Earn by watching YouTube",
  "Every second = crypto reward",
  "Only 1,000,000,000 tokens available",
  "Progress unlocks new rewards",
  "Let's go mining now!"
];

let currentSlide = 0;

const slideText = document.getElementById("slide-text");
const nextBtn = document.getElementById("next-btn");
const dots = document.querySelectorAll(".progress-dot");

function updateSlide() {
  slideText.textContent = slides[currentSlide];
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index <= currentSlide);
  });
  if (currentSlide === slides.length - 1) {
    nextBtn.textContent = "Start Mining";
  }
}

nextBtn.addEventListener("click", () => {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    updateSlide();
  } else {
    window.location.href = "index.html"; // переход на главную
  }
});

document.addEventListener("DOMContentLoaded", updateSlide);
