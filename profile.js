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
    } else if (handleEl) {
      handleEl.textContent = "@anonymous";
    }
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
});

// Invite and help functions
function invite() {
  alert("🔗 Share your referral link via Telegram");
}

function help() {
  alert("❓ Visit @support_bot or check our FAQ.");
}

