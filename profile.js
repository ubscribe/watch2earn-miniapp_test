document.addEventListener("DOMContentLoaded", () => {
  // Проверяем Telegram WebApp API
  if (window.Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe.user) {
    const user = Telegram.WebApp.initDataUnsafe.user;

    // Обновление аватара
    const avatarImg = document.getElementById("profile-avatar");
    if (user.photo_url) {
      avatarImg.src = user.photo_url;
    }

    // Имя пользователя
    const nameEl = document.querySelector(".username");
    if (user.first_name) {
      nameEl.textContent = user.first_name;
    }

    // @username
    const handleEl = document.querySelector(".user-handle");
    if (user.username) {
      handleEl.textContent = `@${user.username}`;
    } else {
      handleEl.textContent = "@unknown";
    }
  }

  // Задания и баланс
  const tasks = [
    { key: 'watch_video', reward: 100, statusId: 'watch-status' },
    { key: 'share', reward: 200, statusId: 'share-status' },
    { key: 'follow', reward: 300, statusId: 'follow-status' },
    { key: 'like', reward: 200, statusId: 'like-status' }
  ];

  let total = 0;
  tasks.forEach(task => {
    const done = localStorage.getItem(`task_${task.key}`) === 'done';
    if (done) {
      document.getElementById(task.statusId).textContent = '✅';
      total += task.reward;
    }
  });

  document.getElementById("total-balance").textContent = `$${total}`;
});

