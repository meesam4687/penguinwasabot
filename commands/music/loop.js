const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("loop")
    .setDescription("Loop the song currently playing")
    .addStringOption((option) =>
      option
        .setName("option")
        .setDescription("On or Off")
        .setRequired(true)
        .addChoices(
          { name: "On", value: "track" },
          { name: "Off", value: "off" }
        )
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const player = interaction.client.moonlinkManager.players.get(
      interaction.guild.id
    );
    player.setLoop(interaction.options.getString("option"));
    const loopStatus =
      interaction.options.getString("option") === "track"
        ? "enabled"
        : "disabled";
    interaction.editReply({ content: `Loop ${loopStatus}` });
  },
};
