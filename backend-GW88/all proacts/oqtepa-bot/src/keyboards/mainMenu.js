module.exports.mainMenu = [
  [{ text: "🗒️ Oziq ovqatlar menyusi", callback_data: "foods" }],
  [{ text: "🍔 Browse Menu", web_app: { url: "https://evos.uz" } }],
  [
    { text: "Buyurtmalarim", callback_data: "orders" },
    { text: "Chegirmalar", callback_data: "discount" },
  ],
  [
    { text: "Asosiy menyu", callback_data: "main_menu" },
    { text: "Sozlamar", callback_data: "settings" },
  ],
];
