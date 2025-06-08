// === Slider Data ===
const sliderData = [
  {
    title: "Users",
    value: "1,248,900",
  },
  {
    title: "Token Price",
    value: "$0.0142",
  },
  {
    title: "YouTube Revenue",
    value: "$73,540.21",
  },
];

// === Insert slider content ===
let currentSlide = 0;
const slider = document.getElementById("info-slider");

function renderSlider() {
  sliderData.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `<div class="slide-title">${item.title}</div><div class="slide-value">${item.value}</div>`;
    slider.appendChild(slide);
  });
}

// === Update slider position ===
function updateSlider() {
  currentSlide = (currentSlide + 1) % sliderData.length;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// === Initialize on page load ===
document.addEventListener("DOMContentLoaded", () => {
  renderSlider();
  setInterval(updateSlider, 3000);
});
