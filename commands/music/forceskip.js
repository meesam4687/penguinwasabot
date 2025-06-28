const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("forceskip")
    .setDescription("Force skip the current track (you are evil)"),
  async execute(interaction) {
    await interaction.deferReply();
    if (
      interaction.member.permissions.has(
        Discord.PermissionsBitField.Flags.MANAGE_MESSAGES
      )
    ) {
      const player = interaction.client.moonlinkManager.players.get(
        interaction.guild.id
      );
      if (!player) {
        return interaction.editReply("There is nothing playing in this server!");
      }
      if (interaction.member.voice.channel?.id !== player.voiceChannelId) {
        return interaction.editReply(
          "You need to be in the same voice channel as the bot to use this command!"
        );
      }
      if (!player.current) {
        return interaction.editReply("There is nothing playing right now!");
      }
      const currentTrack = player.current;
      if (player.queue.size === 0) {
        player.destroy();
        return interaction.editReply(`Skipped: **${currentTrack.title}**`);
      } else {
        player.skip();
        interaction.editReply(`Skipped: **${currentTrack.title}**`);
      }
    } else {
      interaction.editReply("You do not have permission to use this command.");
    }
  },
};
