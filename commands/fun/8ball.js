const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Ask the 8ball for yes no responses")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("The question you wanna ask")
        .setRequired(true)
    ),
  async execute(interaction) {
    function ball() {
      const responses = ["Yes", "No", "Maybe", "Probably", "Probably not"];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    const ballEmbed = new Discord.EmbedBuilder()
      .setColor("#ffac00")
      .setTitle(`8Ball`)
      .setDescription(`The Ball Says \`${ball()}\``)
      .setThumbnail("https://cdn.discordapp.com/emojis/747353630314725376.gif")
      .setTimestamp();
    interaction.reply({ embeds: [ballEmbed] });
  },
};
