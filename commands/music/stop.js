const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stop playing music and clear the queue"),
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

    player.stop();
    player.queue.clear();
    player.destroy();
    interaction.reply("Stopped playback and cleared the queue.");
  },
};
