import { Telegraf } from "telegraf";
import db from "./src/db/index.js";
import User from "./src/User/Schema.js";
import Cart from "./src/User/Cart.js";

const bot = new Telegraf("8051941096:AAG98JTNGB-4m_lbY2g5L-Wl49fVFxziriM");

bot.start(async (ctx) => {
    const chatId = ctx.message.chat.id;
    const user = await User.findOne({ chatId });
    if (!user) {
        await User.create({ chatId, fullname: ctx.message.chat.first_name });
    }
    const keyboard = user?.phone
        ? [[{ text: "Asosiy menyu" }]]
        : [[{ text: "Raqamingizni ulashda", request_contact: true }]];
    ctx.reply("Assalomu alaykum , I'm Oqtepa Bot. Send /help for more information.", {
        reply_markup: {
            keyboard,
            resize_keyboard: true
        },
    });

});

bot.on("contact", async (ctx) => {
    const chatId = ctx.message.chat.id;
    const contact = ctx.message.contact.phone_number;
    console.log(contact);
    const user = await User.findOneAndUpdate(
        { chatId },
        {
            chatId,
            fullname: ctx.message.chat.first_name,
            phone: contact,
        },
        { upsert: true, new: true }
    );
    ctx.reply("Raqamingiz muvaffaqiyatli tizimga qo'shildi!" + user.phone, {
        reply_markup: {
            keyboard: [[{ text: "Asosiy menyu" }]],
        },
    });
})

const footerButtons = [{ text: "Ortga 🔙", callback_data: "back" }];
const mainMenu = [
    [{ text: "Oziq ovqatlar menyuse", callback_data: "foods" }],
    [{ text: "🍔Brozer Menu", web_app: {url: 'https://evos.uz'} }],
    [
        { text: "Xaridlar menyuse", callback_data: "orders" },
        { text: "Chegirmalar", callback_data: "discounts" },
    ],
    [
        { text: "Asosiy menuy", callback_data: "main_menuy" },
        { text: "Sozlamalar", callback_data: "settings" },
    ],
    footerButtons
];
bot.hears("Asosiy menyu", async (ctx) => {
    ctx.reply("Asosiy menyu", {
        reply_markup: {
            inline_keyboard: mainMenu,
        },
    });
});

bot.on("callback_query", async (ctx) => {
    const callbackData = ctx.callbackQuery.data;
    const message = ctx.callbackQuery.message.message_id;
    const chatId = ctx.callbackQuery.message.from.chatId;
    const user = await User.findOne({ chatId });
    console.log(ctx);

    if (callbackData === "back") {
        console.log("back");
        await ctx.answerCbQuery();
        await ctx.editMessageText(" Asosiy menyu", {
            reply_markup: {
                inline_keyboard: mainMenu,
            },
        });
    }
    if (callbackData === "foods") {
        await ctx.answerCbQuery();
        await User.findOneAndUpdate({ chatId }, { action: "foods" });
        await ctx.editMessageText("Oziq ovqatlar menyuse", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Shashlik", callback_data: "select_food:kebab" },
                        { text: "Osh", callback_data: "select_food:plov" },
                        { text: "Somsa", callback_data: "select_food:somsa" }
                    ],
                    [{ text: "Ortga 🔙", callback_data: "main menu" }],
                ],
            },
        });
    }
    console.log(callbackData);
    if (callbackData.startsWith("select_food:")) {

        const [_, food] = callbackData.split(":");
        await ctx.answerCbQuery();

        const existOrder = await Cart.findOne({ food, chatId, status: "pending" });
        console.log(existOrder);
        !existOrder
            ? await Cart.findOneAndUpdate({ chatId }, { quantity: 1 }, { price: 10000 })
            : await Cart.create({ chatId, product: food, quantity: 1, price: "10000" }),
            await ctx.editMessageText(`Siz ${food} tanladingiz`, {
                reply_markup: {
                    inline_keyboard: [[
                        { text: "➖", callback_data: `cart:${food}:-1` },
                        { text: "❌", callback_data: `cart:${food}:cancel` },
                        { text: "➕", callback_data: `cart:${food}:+1` },
                    ],
                    [{ text: "Ortga 🔙", callback_data: "main menu" }],
                    ]
                },
            });
    };
    if (callbackData.startsWith("cart")) {
        let [_, food, count = 0] = callbackData.split(":");
        count = parseInt(count, 10);
        console.log(count);

        if (count > 0) {
            //?+ 1 increment
            return await ctx.editMessageText(`Siz ${food} dan ${!isNaN(count) && count} tanladingiz`, {
                reply_markup: {
                    inline_keyboard: [[
                        { text: `➖`, callback_data: `cart:${food}:${count}` },
                        { text: `❌`, callback_data: `cart:${food}:cancel` },
                        { text: `➕ ${count}`, callback_data: `cart:${food}:${count + 1}` },
                    ],
                    [{ text: "Ortga 🔙", callback_data: "main menu" }],
                    ]
                },
            });
        }
        //! - decrement
        // await ctx.editMessageText(`Siz ${food} dan ${!isNaN(count) && count} tanladingiz`, {
        //     reply_markup: {
        //         inline_keyboard: [[
        //             { text: `➖`, callback_data: `cart:${food}:${count -1} ` },
        //             { text: `❌`, callback_data: `cart:${food}:cancel` },
        //             { text: `➕ ${count}`, callback_data: `cart:${food}:${count + 1}` },
        //         ],
        //         [{ text: "Ortga 🔙", callback_data: "main menu" }],
        //         ]
        //     },
        // });
    };
});
bot.launch();
db();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
