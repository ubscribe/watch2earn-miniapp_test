import { supabase } from './supabase.js';

document.addEventListener("DOMContentLoaded", async () => {
  // ✅ Telegram WebApp инициализация
  Telegram.WebApp.ready();

  // ✅ Расширяем WebApp
  if (Telegram.WebApp.expand) {
    Telegram.WebApp.expand();
  }

  // ✅ Подписка на события fullscreen
  Telegram.WebApp.onEvent("fullscreenChanged", (isFullscreen) => {
    console.log("📲 Fullscreen changed:", isFullscreen);
  });

  Telegram.WebApp.onEvent("fullscreenFailed", () => {
    console.warn("❌ Fullscreen failed or not supported");
  });

  // ✅ Пробуем запустить fullscreen через Telegram
  setTimeout(() => {
    try {
      if (Telegram.WebApp.requestFullscreen) {
        Telegram.WebApp.requestFullscreen();
        console.log("✅ Fullscreen requested");
      } else {
        console.warn("⚠️ Telegram.WebApp.requestFullscreen не поддерживается");
      }
    } catch (err) {
      console.error("🚫 Fullscreen error:", err);
    }
  }, 300);

  // ✅ Получаем Telegram-пользователя
  const tgUser = Telegram.WebApp.initDataUnsafe?.user;
  if (tgUser) {
    const username = tgUser.username || `tg${tgUser.id}`;
    localStorage.setItem("username", username);

    try {
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

  // ✅ Инициализация слайдера
  const slider = document.getElementById("slider");
  if (slider) {
    renderSlider(slider);
    setInterval(() => updateSlider(slider), 3000);
  }

  // ✅ Майн-прогресс
  setInterval(updateMiningProgress, 3000);

  // ✅ Анимация заливки
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

function renderSlider(slider) {
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

function updateSlider(slider) {
  if (!slider || isTransitioning) return;
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

// ----------------- Майн-прогресс -----------------

let totalMined = 0;
const maxSupply = 1000000000;

function updateMiningProgress() {
  const minedThisTick = Math.floor(Math.random() * 100000);
  totalMined += minedThisTick;
  if (totalMined > maxSupply) totalMined = maxSupply;

  const percentage = (totalMined / maxSupply) * 100;
  const fill = document.getElementById("mining-fill");
  const count = document.getElementById("mined-count");

  if (fill) fill.style.width = `${percentage}%`;
  if (count) count.textContent = totalMined.toLocaleString();
}

// ----------------- Добавить на главный экран -----------------

function addToHome() {
  if (Telegram.WebApp?.addToHomeScreen) {
    Telegram.WebApp.addToHomeScreen();
  } else {
    alert("Telegram не поддерживает эту функцию на вашем устройстве.");
  }
}
