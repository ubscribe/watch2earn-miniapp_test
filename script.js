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
  // Обязательно фиксируем ширину слайда
  slide.style.minWidth = "100%";
  slide.style.flexShrink = "0";
  return slide;
}

function renderSlider() {
  slider.innerHTML = "";

  // Клон последнего слайда в начало
  const lastClone = createSlide(sliderData[sliderData.length - 1]);
  slider.appendChild(lastClone);

  // Основные слайды
  sliderData.forEach(item => {
    slider.appendChild(createSlide(item));
  });

  // Клон первого слайда в конец
  const firstClone = createSlide(sliderData[0]);
  slider.appendChild(firstClone);

  // Устанавливаем стартовую позицию
  slider.style.transform = `translateX(-100%)`;
}

function updateSlider() {
  if (isTransitioning) return;
  isTransitioning = true;

  currentSlide++;
  slider.style.transition = "transform 0.6s ease-in-out";
  slider.style.transform = `translateX(-${100 * currentSlide}%)`;

  slider.addEventListener("transitionend", () => {
    if (currentSlide === sliderData.length + 1) {
      slider.style.transition = "none";
      currentSlide = 1;
      slider.style.transform = `translateX(-100%)`;
    }
    isTransitioning = false;
  }, { once: true });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSlider();
  setInterval(updateSlider, 3000);
});

