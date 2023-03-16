const Discord = require('discord.js');
const convert = require('convert-seconds');
const progressbar = require('string-progressbar');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Check the song currently being played'),
  async execute(interaction) {
    let queue = interaction.client.distube.getQueue(interaction)
    if (!queue) return interaction.reply('Nothing Playing.')
    let song = queue.songs[0]
    let currentdur = new Date()
    let secs = ((currentdur - interaction.client.distube.startduration) / 1000)
    let bar = progressbar.splitBar(song.duration, secs, [10])[0];
    let total = song.formattedDuration;
    let remaining = `${convert(Math.round(song.duration - secs)).minutes}:${convert(Math.round(song.duration - secs)).seconds}`
    const npEmbed = new Discord.EmbedBuilder()
      .setColor('#34dbeb')
      .setTitle(`Now Playing ${queue.songs[0].name}`)
      .setThumbnail(song.thumbnail)
      .setDescription(`\n\`${remaining}\` ${bar} \`${total}\``)
      .setTimestamp()
    interaction.reply({ embeds: [npEmbed] });
  },
};
