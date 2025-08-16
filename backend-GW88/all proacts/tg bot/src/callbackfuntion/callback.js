// bot.on("callback_query", async (ctx) => {
//     const callbackData = ctx.callbackQuery.data;
//     const message = ctx.callbackQuery.message.message_id;
//     const chatId = ctx.callbackQuery.message.from.chatId;
//     const user = await User.findOne({ chatId });
//     console.log(ctx);

//     if (callbackData === "back") {
//         console.log("back");
//         await ctx.answerCbQuery();
//         await ctx.editMessageText(" Asosiy menyu", {
//             reply_markup: {
//                 inline_keyboard: mainMenu,
//             },
//         });
//     }
//     if (callbackData === "foods") {
//         await ctx.answerCbQuery();
//         await User.findOneAndUpdate({ chatId }, { action: "foods" });
//         await ctx.editMessageText("Oziq ovqatlar menyuse", {
//             reply_markup: {
//                 inline_keyboard: [
//                     [
//                         { text: "Shashlik", callback_data: "select_food:kebab" },
//                         { text: "Osh", callback_data: "select_food:plov" },
//                         { text: "Somsa", callback_data: "select_food:somsa" }
//                     ],
//                     [{ text: "Ortga 🔙", callback_data: "main menu" }],
//                 ],
//             },
//         });
//     }
//     console.log(callbackData);
//     if (callbackData.startsWith("select_food:")) {

//         const [_, food] = callbackData.split(":");
//         await ctx.answerCbQuery();

//         const existOrder = await Cart.findOne({ food, chatId, status: "pending" });
//         console.log(existOrder);
//         !existOrder
//             ? await Cart.findOneAndUpdate({ chatId }, { quantity: 1 }, { price: 10000 })
//             : await Cart.create({ chatId, product: food, quantity: 1, price: "10000" }),
//             await ctx.editMessageText(`Siz ${food} tanladingiz`, {
//                 reply_markup: {
//                     inline_keyboard: [[
//                         { text: "➖", callback_data: `cart:${food}:-1` },
//                         { text: "❌", callback_data: `cart:${food}:cancel` },
//                         { text: "➕", callback_data: `cart:${food}:+1` },
//                     ],
//                     [{ text: "Ortga 🔙", callback_data: "main menu" }],
//                     ]
//                 },
//             });
//     };
//     if (callbackData.startsWith("cart")) {
//         let [_, food, count = 0] = callbackData.split(":");
//         count = parseInt(count, 10);
//         console.log(count);

//         if (count > 0) {
//             //?+ 1 increment
//             return await ctx.editMessageText(`Siz ${food} dan ${!isNaN(count) && count} tanladingiz`, {
//                 reply_markup: {
//                     inline_keyboard: [[
//                         { text: `➖`, callback_data: `cart:${food}:${count}` },
//                         { text: `❌`, callback_data: `cart:${food}:cancel` },
//                         { text: `➕ ${count}`, callback_data: `cart:${food}:${count + 1}` },
//                     ],
//                     [{ text: "Ortga 🔙", callback_data: "main menu" }],
//                     ]
//                 },
//             });
//         }
//         //! - decrement
//         // await ctx.editMessageText(`Siz ${food} dan ${!isNaN(count) && count} tanladingiz`, {
//         //     reply_markup: {
//         //         inline_keyboard: [[
//         //             { text: `➖`, callback_data: `cart:${food}:${count -1} ` },
//         //             { text: `❌`, callback_data: `cart:${food}:cancel` },
//         //             { text: `➕ ${count}`, callback_data: `cart:${food}:${count + 1}` },
//         //         ],
//         //         [{ text: "Ortga 🔙", callback_data: "main menu" }],
//         //         ]
//         //     },
//         // });
//     };
// });