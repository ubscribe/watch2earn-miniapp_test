const sliderData = [
  { title: "YouTube Revenue", value: "$0.00", icon: "▶️" },
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
  return slide;
}

function renderSlider() {
  slider.innerHTML = "";

  // Клон последнего слайда в начало
  const lastClone = createSlide(sliderData[sliderData.length - 1]);
  slider.appendChild(lastClone);

  // Основные слайды
  sliderData.forEach(item => {
    const slide = createSlide(item);
    slider.appendChild(slide);
  });

  // Клон первого слайда в конец
  const firstClone = createSlide(sliderData[0]);
  slider.appendChild(firstClone);

  // Стартовая позиция — на первом настоящем слайде
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
      slider.style.transition = "none";
      slider.style.transform = `translateX(-100%)`;
      currentSlide = 0;
    }
    isTransitioning = false;
  }, { once: true });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSlider();
  setInterval(updateSlider, 3000);
});



