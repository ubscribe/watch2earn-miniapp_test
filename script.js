const sliderData = [
  { title: "YouTube Revenue", value: "$0.00", icon: "📺" },
  { title: "Token Price", value: "$0.0142", icon: "💰" },
  { title: "Users Online", value: "1,842", icon: "👥" }
];

let currentSlide = 1;
let isTransitioning = false;
const slider = document.getElementById("slider");

function createSlide(item) {
  const slide = document.createElement("div");
  slide.className = "slide";
  slide.innerHTML = `
    <div class="slide-inner">
      <div class="slide-title">${item.icon} <strong>${item.title}</strong></div>
      <div class="slide-value">${item.value}</div>
    </div>
  `;
  return slide;
}

function renderSlider() {
  slider.innerHTML = "";

  // Клонируем последний и добавляем первым
  slider.appendChild(createSlide(sliderData[sliderData.length - 1]));

  // Основные слайды
  sliderData.forEach(item => {
    slider.appendChild(createSlide(item));
  });

  // Клонируем первый и добавляем последним
  slider.appendChild(createSlide(sliderData[0]));

  // Установка стартовой позиции (слайд #1)
  slider.style.transform = `translateX(-100%)`;
}

function updateSlider() {
  if (isTransitioning) return;
  isTransitioning = true;

  currentSlide++;
  slider.style.transition = "transform 0.6s ease-in-out";
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;

  slider.addEventListener("transitionend", () => {
    if (currentSlide === sliderData.length + 1) {
      // Без анимации возвращаемся на первый реальный слайд
      slider.style.transition = "none";
      currentSlide = 1;
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    isTransitioning = false;
  }, { once: true });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSlider();
  setInterval(updateSlider, 3000);
});




