const { mainMenu } = require("../keyboards/mainMenu");
const User = require("../Models/Users");
/**
 * @param {import('telegraf').Telegraf} bot
 */
module.exports = (bot) => {
  bot.start(async (ctx) => {
    const chatId = ctx.message.chat.id;
    const user = await User.findOne({ chatId });

    if (!user) {
      await User.create({ chatId, fullname: ctx.message.chat.first_name });
    }
    console.log(user);

    if (user?.phone) {
      ctx.reply("Hello! I'm OQTEPA BOT. Send /help for more information.", {
        reply_markup: {
          remove_keyboard: true,
          inline_keyboard: mainMenu,
        },
      });
} else {
  ctx.reply("Hello! I'm OQTEPA BOT. Send /help for more information.", {
    reply_markup: {
      keyboard: [
        [{ text: "Raqamingizni ulashing", request_contact: true }],
      ],
    },
  });
}
  });
};
