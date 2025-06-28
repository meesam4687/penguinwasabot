const Discord = require("discord.js");
let convert = require("convert-seconds");
const progressbar = require("string-progressbar");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Check the current playing song"),
  async execute(interaction) {
    await interaction.deferReply();
    const player = interaction.client.moonlinkManager.players.get(
      interaction.guild.id
    );
    if (!player || !player.current) {
      return interaction.editReply(
        "There is no song currently playing in this server!"
      );
    }
    if (interaction.member.voice.channel?.id !== player.voiceChannelId) {
      return interaction.editReply(
        "You need to be in the same voice channel as the bot to use this command!"
      );
    }
    const currentTrack = player.current;
    let bar = progressbar.splitBar(
      Math.floor(currentTrack.duration / 1000),
      Math.floor(currentTrack.position / 1000),
      [10]
    );
    const npEmbed = new Discord.EmbedBuilder()
      .setColor("#34dbeb")
      .setTitle(`Now Playing ${currentTrack.title}`)
      .setThumbnail(currentTrack.artworkUrl)
      .setDescription(
        `\`${convert(Math.floor(currentTrack.position / 1000)).minutes}:${
          convert(Math.floor(currentTrack.position / 1000)).seconds
        }\` ${bar[0]} \`${
          convert(Math.floor(currentTrack.duration / 1000)).minutes
        }:${convert(Math.floor(currentTrack.duration / 1000)).seconds}\``
      )
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });
    interaction.editReply({
      embeds: [npEmbed],
    });
  },
};
