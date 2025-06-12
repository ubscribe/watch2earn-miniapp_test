import { supabase } from './supabase.js';

document.addEventListener("DOMContentLoaded", async () => {
  // ✅ Telegram WebApp инициализация
  Telegram.WebApp.ready();

  // ✅ Попытка expand (если доступно)
  if (Telegram?.WebApp?.expand) {
    Telegram.WebApp.expand();
  }

  // ✅ Безопасный вызов fullscreen через задержку
  setTimeout(() => {
    if (Telegram?.WebApp?.requestFullscreen) {
      Telegram.WebApp.requestFullscreen();
    }
  }, 300);

  // ✅ Получаем данные пользователя из Telegram
  const tgUser = Telegram?.WebApp?.initDataUnsafe?.user;
  if (tgUser) {
    const username = tgUser.username || `tg${tgUser.id}`;
    localStorage.setItem("username", username);

    try {
      // Проверяем, есть ли пользователь в базе
      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single();

      if (!existingUser) {
        const referrer = localStorage.getItem("ref") || null;

        const { error: insertError } = await supabase
          .from("users")
          .insert([{ username, referrer }]);

        if (referrer) {
          await supabase.rpc("add_points_to_referrer", { ref_username: referrer });
        }

        if (!insertError) {
          console.log("👤 User auto-registered:", username);
        }
      } else {
        console.log("✅ User already registered:", username);
      }
    } catch (err) {
      console.error("🔥 Supabase error:", err.message);
    }
  }

  // ----------------- Слайдер -----------------
  renderSlider();
  setInterval(updateSlider, 3000);

  // ----------------- Майн-прогресс -----------------
  setInterval(updateMiningProgress, 3000);

  // ----------------- Анимация заливки -----------------
  const barFill = document.getElementById("bar-fill");
  if (barFill) {
    let width = 0;
    const target = 100;
    const speed = 1;
    const interval = setInterval(() => {
      if (width >= target) {
        clearInterval(interval);
      } else {
        width += speed;
        barFill.style.width = `${width}%`;
      }
    }, 15);
  }
});

// ----------------- Slider -----------------

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
  const lastClone = createSlide(sliderData[sliderData.length - 1]);
  slider.appendChild(lastClone);
  sliderData.forEach(item => {
    slider.appendChild(createSlide(item));
  });
  const firstClone = createSlide(sliderData[0]);
  slider.appendChild(firstClone);
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
      slider.style.transition = "none";
      currentSlide = 0;
      slider.style.transform = `translateX(-100%)`;
    }
    isTransitioning = false;
  }, { once: true });
}

// ----------------- Майнинг -----------------

let totalMined = 0;
const maxSupply = 1000000000;

function updateMiningProgress() {
  const minedThisTick = Math.floor(Math.random() * 100000);
  totalMined += minedThisTick;
  if (totalMined > maxSupply) totalMined = maxSupply;

  const percentage = (totalMined / maxSupply) * 100;
  document.getElementById("mining-fill").style.width = `${percentage}%`;
  document.getElementById("mined-count").textContent = totalMined.toLocaleString();
}

// ----------------- Добавить на главный экран -----------------

function addToHome() {
  if (Telegram.WebApp?.addToHomeScreen) {
    Telegram.WebApp.addToHomeScreen();
  } else {
    alert("Telegram не поддерживает эту функцию на вашем устройстве.");
  }
}
