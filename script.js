const sliderData = [
  { title: "YouTube Revenue", value: "$0.00", icon: "📺" },
  { title: "Token Price", value: "$0.0142", icon: "💰" },
  { title: "Users Online", value: "1,842", icon: "👥" }
];

let currentSlide = 0;
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
  slide.style.minWidth = "100%";
  slide.style.flexShrink = "0";
  return slide;
}

function renderSlider() {
  slider.innerHTML = "";

  // Клонируем последний слайд в начало
  const lastClone = createSlide(sliderData[sliderData.length - 1]);
  slider.appendChild(lastClone);

  // Основные слайды
  sliderData.forEach(item => {
    slider.appendChild(createSlide(item));
  });

  // Клонируем первый слайд в конец
  const firstClone = createSlide(sliderData[0]);
  slider.appendChild(firstClone);

  // Установка на первый настоящий слайд
  slider.style.transform = `translateX(-100%)`;
}

function updateSlider() {
  if (isTransitioning) return;
  isTransitioning = true;

  currentSlide++;
  slider.style.transition = "transform 0.6s ease-in-out";
  slider.style.transform = `translateX(-${(currentSlide + 1) * 100}%)`;

  slider.addEventListener("transitionend", () => {
    if (currentSlide >= sliderData.length) {
      // Переход без анимации обратно к первому слайду
      slider.style.transition = "none";
      currentSlide = 0;
      slider.style.transform = `translateX(-100%)`;
    }
    isTransitioning = false;
  }, { once: true });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSlider();
  setInterval(updateSlider, 3000);
});


