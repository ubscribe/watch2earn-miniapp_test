let correctCode = "";

// Открытие видео-модального окна
function openVideoTask(expectedCode) {
  correctCode = expectedCode;
  document.getElementById("video-modal").classList.remove("hidden");
  document.getElementById("code-input").value = "";
  document.getElementById("result-message").textContent = "";
}

// Закрытие модального окна
function closeModal() {
  document.getElementById("video-modal").classList.add("hidden");
  const iframe = document.getElementById("youtube-video");
  iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
}

// Проверка введённого кода
function checkCode() {
  const input = document.getElementById("code-input").value.trim().toUpperCase();
  const result = document.getElementById("result-message");

  if (input === correctCode) {
    result.textContent = "✅ Code accepted! 100 $UBSCRIBE added.";
    result.style.color = "#0f0";
    localStorage.setItem("task_watch_video", "done");
    disableClaimButton("Watch 1 video");
  } else {
    result.textContent = "❌ Incorrect code. Try again.";
    result.style.color = "#f00";
  }
}

// Обработка простых заданий (без проверки, на доверии)
function claimSimpleTask(taskKey) {
  if (localStorage.getItem(`task_${taskKey}`) === "done") {
    alert("✅ Already claimed.");
    return;
  }

  const confirmClaim = confirm("Are you sure you completed this task?");
  if (confirmClaim) {
    localStorage.setItem(`task_${taskKey}`, "done");
    alert(`✅ Task "${taskKey}" completed! Tokens added.`);
    disableClaimButton(taskKey);
  }
}

// Отключение кнопки Claim у уже выполненного задания
function disableClaimButton(taskKey) {
  const buttons = document.querySelectorAll(".task-card");
  buttons.forEach(card => {
    const label = card.querySelector("strong")?.textContent || "";
    if (
      label.toLowerCase().includes(taskKey.toLowerCase()) ||
      (taskKey === "watch_video" && label.toLowerCase().includes("watch"))
    ) {
      const btn = card.querySelector("button");
      if (btn) {
        btn.disabled = true;
        btn.textContent = "✅ Done";
        btn.style.background = "#444";
        btn.style.color = "#999";
        btn.style.cursor = "default";
      }
    }
  });
}

// При загрузке страницы — проверка выполненных задач
window.addEventListener("DOMContentLoaded", () => {
  const tasks = ["watch_video", "share", "follow", "like"];
  tasks.forEach(taskKey => {
    if (localStorage.getItem(`task_${taskKey}`) === "done") {
      disableClaimButton(taskKey);
    }
  });
});
