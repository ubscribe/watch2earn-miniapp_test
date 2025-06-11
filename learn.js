const slides = [
  "Welcome to <strong>$UBSCRIBE</strong>",
  "$UBSCRIBE is a Watch-to-Earn platform.",
  "Earn tokens just by watching videos.",
  "Each view counts. Literally.",
  "Your time = your value.",
  "Stake, watch, earn and grow.",
  "Let the Game of Attention begin."
];

const backgrounds = [
  "url('assets/bg1.png')",
  "url('assets/bg2.png')",
  "url('assets/bg3.png')",
  "url('assets/bg4.png')",
  "url('assets/bg5.png')",
  "url('assets/bg6.png')",
  "url('assets/bg7.png')"
];

let currentIndex = 0;

const slideText = document.getElementById("slide-text");
const nextBtn = document.getElementById("next-btn");
const dots = document.querySelectorAll(".progress-dot");
const learnContainer = document.querySelector(".learn-container");

nextBtn.addEventListener("click", () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    slideText.innerHTML = slides[currentIndex];
    updateProgress(currentIndex);
    updateBackground(currentIndex);
  } else {
    window.location.href = "index.html";
  }
});

function updateProgress(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i <= index);
  });
}

function updateBackground(index) {
  learnContainer.style.backgroundImage = backgrounds[index];
  learnContainer.style.backgroundSize = "cover";
  learnContainer.style.backgroundPosition = "center";
  learnContainer.style.transition = "background-image 0.5s ease-in-out";
}

// Устанавливаем начальный фон
updateBackground(0);

