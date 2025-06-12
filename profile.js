document.addEventListener("DOMContentLoaded", () => {
  // Telegram user data
  if (window.Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe.user) {
    const user = Telegram.WebApp.initDataUnsafe.user;

    const avatarImg = document.getElementById("profile-avatar");
    if (avatarImg && user.photo_url) {
      avatarImg.src = user.photo_url;
    }

    const nameEl = document.querySelector(".username");
    if (nameEl && user.first_name) {
      nameEl.textContent = user.first_name;
    }

    const handleEl = document.querySelector(".user-handle");
    if (handleEl && user.username) {
      handleEl.textContent = `@${user.username}`;
      localStorage.setItem("username", user.username); // ✅ Сохраняем username
    } else if (handleEl) {
      handleEl.textContent = "@anonymous";
      localStorage.setItem("username", "anonymous"); // ✅ Чтобы invite всё равно работал
    }

    // Task rewards and progress
    const tasks = [
      { key: 'watch_video', reward: 100, statusId: 'watch-status' },
      { key: 'share', reward: 200, statusId: 'share-status' },
      { key: 'follow', reward: 300, statusId: 'follow-status' },
      { key: 'like', reward: 200, statusId: 'like-status' }
    ];

    let total = 0;
    tasks.forEach(task => {
      const done = localStorage.getItem(`task_${task.key}`) === 'done';
      if (done && document.getElementById(task.statusId)) {
        document.getElementById(task.statusId).textContent = '✅';
        total += task.reward;
      }
    });

    const balanceEl = document.getElementById("total-balance");
    if (balanceEl) {
      balanceEl.textContent = `$${total}`;
    }
  } // ← закрываем if (Telegram...)
}); // ← закрываем DOMContentLoaded


// Invite and help functions
function invite() {
  const handle = document.querySelector(".user-handle")?.textContent.replace('@', '') || 'anonymous';
  const refLink = `https://leafy-hamster-2d0d18.netlify.app/?ref=${handle}`;
  document.getElementById("ref-link").value = refLink;
  document.getElementById("invite-modal").classList.remove("hidden");
}

function help() {
  alert("❓ Visit @support_bot or check our FAQ.");
}
function copyReferral() {
  const input = document.getElementById("ref-link");
  input.select();
  document.execCommand("copy");
  alert("Referral link copied to clipboard!");
}

function closeInviteModal() {
  document.getElementById("invite-modal").classList.add("hidden");
}
