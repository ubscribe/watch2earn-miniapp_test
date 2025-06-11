const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

// 🔐 Вставь сюда свой токен
const token = '8115130502:AAHVv8Vz6m08vaRmHUCFEZboO-aQS8Oqrs0';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const videoPath = path.join(__dirname, 'assets', 'intro.mp4');

  const keyboard = {
    reply_markup: {
      keyboard: [
        [{ text: 'Home' }, { text: 'Balance' }, { text: 'Gigs' }]
      ],
      resize_keyboard: true
    },
    caption: 'Welcome fren'
  };

  bot.sendVideo(chatId, fs.createReadStream(videoPath), keyboard);
});

