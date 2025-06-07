const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// 1️⃣ Вставь свой токен бота
const token = 'YOUR_BOT_TOKEN_HERE';

// 2️⃣ Запускаем бота
const bot = new TelegramBot(token, { polling: true });

// 3️⃣ Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // 4️⃣ Отправка видео
  bot.sendVideo(chatId, fs.createReadStream('welcome.mp4'), {
    caption: 'Welcome fren to $UBSCRIBE 🔺',
  }).then(() => {
    // 5️⃣ После видео — сообщение с кнопками
    bot.sendMessage(chatId, '🚀 Let\'s go, Sub!\n\nChoose an option below:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🏠 Home", web_app: { url: "https://YOUR-NETLIFY-APP.netlify.app/" } }],
          [{ text: "💰 Balance", web_app: { url: "https://YOUR-NETLIFY-APP.netlify.app/profile.html" } }],
          [{ text: "🎯 Gigs", web_app: { url: "https://YOUR-NETLIFY-APP.netlify.app/watch.html" } }],
        ]
      }
    });
  });
});
