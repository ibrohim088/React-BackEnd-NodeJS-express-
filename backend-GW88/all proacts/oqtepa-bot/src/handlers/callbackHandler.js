const { foodMenu } = require("../keyboards/foodMenu");
const { mainMenu } = require("../keyboards/mainMenu.js");
const Cart = require("../Models/Cart.js");

/**
 * @param {import('telegraf').Telegraf} bot
 */
module.exports = (bot) => {
  bot.on("callback_query", async (ctx) => {
    const callbackData = ctx.callbackQuery.data;
    const chatId = ctx.callbackQuery.message.chat.id;

    if (callbackData === "main_menu") {
      await ctx.editMessageText("🍽️ Asosiy menu", {
        reply_markup: { inline_keyboard: foodMenu },
      });
    }

    if (callbackData.startsWith("select_food:")) {
      const food = callbackData.split(":")[1];
      const existOrder = await Cart.findOne({
        food,
        chatId,
        status: "pending",
      });
      if (existOrder) {
        await Cart.findOneAndUpdate({ chatId }, { quantity: 1, price: 10000 });
      } else {
        await Cart.create({
          chatId,
          product: food,
          quantity: 1,
          price: "10000",
        });
      }

      await ctx.editMessageText(`Siz ${food}dan (1) tanladingiz!`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "➖", callback_data: `cart:${food}:decrement` },
              { text: "❌", callback_data: `cart:${food}:cancel` },
              { text: "➕", callback_data: `cart:${food}:increment` },
            ],
            [{ text: "Ortga 🔙", callback_data: "foods" }],
          ],
        },
      });
    }

    if (callbackData === "foods") {
      await ctx.editMessageText("🍽️ Oziq-ovqatlar menyusi:", {
        reply_markup: {
          inline_keyboard: foodMenu,
        },
      });
    }

    // Handle cart actions
    if (callbackData.startsWith("cart:")) {
      let [_, food, action] = callbackData.split(":");

      let cart = await Cart.findOne({
        product: food,
        chatId,
        status: "pending",
      });

      if (!cart) {
        cart = await Cart.create({
          product: food,
          chatId,
          quantity: 1,
          price: 10000,
        });
      }

      if (action === "increment") {
        cart.quantity += 1;
      } else if (action === "decrement") {
        cart.quantity = Math.max(1, cart.quantity - 1);
      } else if (action === "cancel") {
        await Cart.deleteOne({ product: food, chatId });
        return ctx.editMessageText("Taomlar ro'yxati:", {
          reply_markup: { inline_keyboard: foodMenu },
        });
      }

      await cart.save();

      await ctx.editMessageText(
        `Siz ${food} dan (${cart.quantity}) tanladingiz!`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "➖", callback_data: `cart:${food}:decrement` },
                { text: "❌", callback_data: `cart:${food}:cancel` },
                { text: "➕", callback_data: `cart:${food}:increment` },
              ],
              [{ text: "Buyurtma berish", callback_data: `order:${cart._id}` }],
            ],
          },
        }
      );
    }

    if (callbackData.startsWith("order:")) {
      let [_, cartId] = callbackData.split(":");
      const cart = await Cart.findById(cartId);
      await Cart.updateOne({ _id: cartId }, { status: "processing" });
      await ctx.editMessageText(
        `Sizning buyurtmangiz uchun mumkin olingan to'plam narxi: ${
          cart.quantity * 10000
        } so'm`,
        {
          reply_markup: {
            inline_keyboard: mainMenu,
          },
        }
      );
    }
  });
};
