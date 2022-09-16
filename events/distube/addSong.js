const Discord = require("discord.js")
module.exports = {
  name: "addSong",
  async execute(queue, song){
    const addEmbed = new Discord.MessageEmbed()
	    .setColor('RANDOM')
	    .setTitle(`🎶 ${song.name} has been added to the queue.`)
      .setThumbnail(song.thumbnail)
	    .setTimestamp()
	    .setFooter({ text: 'Added by ' + song.user.username });
      queue.textChannel.send({ embeds: [addEmbed] })
  },
}