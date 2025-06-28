const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("remove")
    .setDescription("Remove a song from the queue")
    .addIntegerOption((option) =>
      option.setName("int").setDescription("Number in queue").setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    let opt = interaction.options.getInteger("int");
    const player = interaction.client.moonlinkManager.players.get(
      interaction.guild.id
    );
    if (!player) {
      return interaction.editReply({
        content: "No music playing in this server",
        ephemeral: true,
      });
    }
    if (opt < 1 || opt > player.queue.size) {
      return interaction.editReply({
        content: "Yeah, that wont work",
        ephemeral: true,
      });
    }
    let track = player.queue.get(opt - 1);
    player.queue.remove(opt - 1);
    interaction.editReply({ content: `Removed **${track.title}** from the queue` });
  },
};
