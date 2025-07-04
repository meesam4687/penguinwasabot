const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check the bot ping."),
  async execute(interaction) {
    await interaction.deferReply();
    await interaction.editReply(
      `Pong! The bot ping is ${interaction.client.ws.ping}ms`
    );
  },
};
