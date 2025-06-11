// start-bot.js
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

// Заменить на свой токен бота
const token = '8115130502:AAHVv8Vz6m08vaRmHUCFEZboO-aQS8Oqrs0';  // ⚠️ Замени на свой

// Создаём бота
const bot = new TelegramBot(token, { polling: true });

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const videoPath = path.join(__dirname, 'assets', 'intro.mp4');

  const options = {
    caption: 'Welcome fren',
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Home', callback_data: 'home' },
          { text: 'Balance', callback_data: 'balance' },
          { text: 'Gigs', callback_data: 'gigs' }
        ]
      ]
    }
  };

  bot.sendVideo(chatId, fs.createReadStream(videoPath), options);
});

// Обработка кнопок
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'home') {
    bot.sendMessage(chatId, '🏠 You clicked Home.');
  } else if (data === 'balance') {
    bot.sendMessage(chatId, '💰 Your balance is 0 $UBSCRIBE.');
  } else if (data === 'gigs') {
    bot.sendMessage(chatId, '🕹 Gigs are coming soon!');
  }

  bot.answerCallbackQuery(query.id);
});
