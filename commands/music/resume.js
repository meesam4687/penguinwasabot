const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resume the current song"),
  async execute(interaction) {
    const player = interaction.client.moonlinkManager.players.get(
      interaction.guild.id
    );

    if (!player) {
      return interaction.reply("There is nothing playing in this server!");
    }

    if (interaction.member.voice.channel?.id !== player.voiceChannelId) {
      return interaction.reply(
        "You need to be in the same voice channel as the bot to use this command!"
      );
    }

    if (!player.paused) {
      return interaction.reply("The player is not paused!");
    }

    player.resume();

    interaction.reply("Resumed playback.");
  },
};
