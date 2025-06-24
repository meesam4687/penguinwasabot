const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses the currently playing music"),
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
    if (player.paused) {
      return interaction.reply("The player is already paused!");
    }
    player.pause();

    interaction.reply("Paused the player.");
  },
};
