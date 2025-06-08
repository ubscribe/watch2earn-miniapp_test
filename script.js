const sliderData = [
  {
    title: "YouTube Revenue",
    value: "$0.00",
    icon: "▶️"
  },
  {
    title: "Token Price",
    value: "$0.0142",
    icon: "💰"
  },
  {
    title: "Users Online",
    value: "1,842",
    icon: "👥"
  }
];

let currentSlide = 0;
const slider = document.getElementById("slider");

function createSlide(item) {
  const slide = document.createElement("div");
  slide.className = "slide";
  slide.innerHTML = `
    <div class="slide-title">${item.icon} <strong>${item.title}</strong></div>
    <div class="slide-value">${item.value}</div>
  `;
  return slide;
}

function renderSlider() {
  slider.innerHTML = "";

  // Клон последнего
  const lastClone = createSlide(sliderData[sliderData.length - 1]);
  slider.appendChild(lastClone);

  // Основные слайды
  sliderData.forEach(item => {
    slider.appendChild(createSlide(item));
  });

  // Клон первого
  const firstClone = createSlide(sliderData[0]);
  slider.appendChild(firstClone);

  // Установка ширины (необязательно, если в CSS calc правильно настроен)
  slider.style.transform = `translateX(-100%)`;
}

function updateSlider() {
  currentSlide++;
  slider.style.transition = "transform 0.6s ease-in-out";
  slider.style.transform = `translateX(-${(currentSlide + 1) * 100}%)`;

  if (currentSlide >= sliderData.length) {
    setTimeout(() => {
      slider.style.transition = "none";
      slider.style.transform = `translateX(-100%)`;
      currentSlide = 0;
    }, 600); // должен совпадать с CSS transition
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderSlider();
  setInterval(updateSlider, 3000);
});

