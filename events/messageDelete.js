const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
  name: "messageDelete",
  async execute(message) {
    if (message.author.bot) return;
    await db.set(`snipemsg_${message.channel.id}`, message.content);
    await db.set(`snipesender_${message.channel.id}`, message.author.username);
    await db.set(
      `snipepfp_${message.channel.id}`,
      message.author.displayAvatarURL()
    );
  },
};
