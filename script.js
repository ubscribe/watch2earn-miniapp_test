// === Slider Data ===
const sliderData = [
  {
    title: "Users",
    value: "1,248,900",
    icon: "👥"
  },
  {
    title: "Token Price",
    value: "$0.0142",
    icon: "💰"
  },
  {
    title: "YouTube Revenue",
    value: "$0.00",
    icon: "▶️"
  }
];

let currentSlide = 0;
const slider = document.getElementById("info-slider");

function renderSlider() {
  slider.innerHTML = "";
  sliderData.forEach((item) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `
      <div class="slide-title">${item.icon} <strong>${item.title}</strong></div>
      <div class="slide-value">${item.value}</div>
    `;
    slider.appendChild(slide);
  });
}

function updateSlider() {
  currentSlide = (currentSlide + 1) % sliderData.length;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderSlider();
  setInterval(updateSlider, 3000);
});
