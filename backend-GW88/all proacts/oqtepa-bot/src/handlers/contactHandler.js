const { mainMenu } = require("../keyboards/mainMenu.js");
const User = require("../Models/Users.js");

/**
 * @param {import('telegraf').Telegraf} bot
 */
module.exports = (bot) => {
  bot.on("contact", async (ctx) => {
    const chatId = ctx.message.chat.id;
    const contact = ctx.message.contact.phone_number;

    await User.findOneAndUpdate(
      { chatId },
      {
        fullname: ctx.message.contact.first_name,
        phone: contact,
      },
      { upsert: true }
    );

    ctx.reply("Raqamingiz muvaffaqiyatli tizimga qo'shildi!", {
      reply_markup: {
        keyboard: [],
        inline_keyboard: mainMenu,
      },
    });
  });
};
