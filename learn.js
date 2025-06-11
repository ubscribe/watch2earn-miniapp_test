const slides = [
  "Welcome to <strong>$UBSCRIBE</strong>",
  "$UBSCRIBE is a Watch-to-Earn platform.",
  "Earn tokens just by watching videos.",
  "Each view counts. Literally.",
  "Your time = your value.",
  "Stake, watch, earn and grow.",
  "Let the Game of Attention begin."
];

// Пути к изображениям
const images = [
  "assets/bg1.png",
  "assets/bg2.png",
  "assets/bg3.png",
  "assets/bg4.png",
  "assets/bg5.png",
  "assets/bg6.png",
  "assets/bg7.png"
];

let currentIndex = 0;

// DOM элементы
const slideImage = document.getElementById("slide-image");
const nextBtn = document.getElementById("next-btn");
const dots = document.querySelectorAll(".progress-dot");

// Кнопка "Continue"
nextBtn.addEventListener("click", () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateProgress(currentIndex);
    updateImage(currentIndex);
  } else {
    window.location.href = "index.html";
  }
});

// Обновление активных точек
function updateProgress(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i <= index);
  });
}

// Обновление картинки
function updateImage(index) {
  slideImage.src = images[index];
}

// Устанавливаем начальное изображение
updateImage(0);


