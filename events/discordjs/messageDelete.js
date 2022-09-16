const db = require("quick.db")
module.exports = {
  name: "messageDelete",
  async execute(message) {
    if (message.author.bot) return;
    db.set(`snipemsg_${message.channel.id}`, message.content)
    db.set(`snipesender_${message.channel.id}`, message.author.username)
    db.set(`snipepfp_${message.channel.id}`, message.author.displayAvatarURL())
  },
}