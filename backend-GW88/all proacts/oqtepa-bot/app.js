 require("dotenv").config();
const { Telegraf } = require("telegraf");
const db = require("./src/db/index");
const start = require("./src/commands/start");
const callBackHandlers = require("./src/handlers/callbackHandler");
const contactHandlers = require("./src/handlers/contactHandler");

const bot = new Telegraf(process.env.BOT_TOKEN);

start(bot);
callBackHandlers(bot);
contactHandlers(bot);

bot.launch();
db();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
