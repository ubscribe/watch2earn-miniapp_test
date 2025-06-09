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
  slider.style.transition = "transform 1.5s ease-in-out";
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
let totalMined = 0;
const maxSupply = 1000000000;

function updateMiningProgress() {
  // Симуляция: каждое обновление прибавляем случайное число
  const minedThisTick = Math.floor(Math.random() * 100000); 
  totalMined += minedThisTick;

  if (totalMined > maxSupply) totalMined = maxSupply;

  const percentage = (totalMined / maxSupply) * 100;
  document.getElementById("mining-fill").style.width = `${percentage}%`;
  document.getElementById("mined-count").textContent = totalMined.toLocaleString();
}

setInterval(updateMiningProgress, 3000); // каждые 3 сек
// Анимация минибара на странице learn.html
document.addEventListener("DOMContentLoaded", () => {
  const barFill = document.getElementById("bar-fill");
  if (barFill) {
    let width = 0;
    const target = 100; // до 100%
    const speed = 1; // скорость нарастания

    const interval = setInterval(() => {
      if (width >= target) {
        clearInterval(interval);
      } else {
        width += speed;
        barFill.style.width = `${width}%`;
      }
    }, 15); // каждые 15мс
  }
});
function goToNext() {
  window.location.href = "learn.html";
}
