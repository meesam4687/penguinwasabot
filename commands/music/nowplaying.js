const Discord = require('discord.js')
const convert = require('convert-seconds');
const progressbar = require('string-progressbar');
module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  run: async (client, message, args) => {
  let queue = client.distube.getQueue(message)
  if (!queue) return message.reply('Nothing Playing.')
  let song = queue.songs[0]
  let currentdur = new Date()
  let secs = ((currentdur - client.distube.startduration) / 1000)
  let bar = progressbar.splitBar(song.duration, secs, [13])[0];
  let total = song.formattedDuration;
  let remaining = `${convert(Math.round(song.duration - secs)).minutes}:${convert(Math.round(song.duration - secs)).seconds}`
  const npEmbed = new Discord.MessageEmbed()
    .setColor('#34dbeb')
    .setTitle(`Now Playing ${queue.songs[0].name}`)
    .setThumbnail(song.thumbnail)
    .setDescription(`\n\`${remaining}\` ${bar} \`${total}\``)
    .setTimestamp()
  message.channel.send({ embeds: [npEmbed] });
}
}