const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("say")
    .setDescription("Make the bot say something")
    .addStringOption((option) =>
      option
        .setName("msg")
        .setDescription("What you want me to say")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const message = interaction.options.getString("msg");
    interaction.editReply(message);
  },
};
