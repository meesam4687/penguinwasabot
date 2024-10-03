const Discord = require("discord.js")
module.exports = {
  name: "addSong",
  async execute(queue, song){
    if(queue.client.usedPlayCommand) return;
    const addEmbed = new Discord.EmbedBuilder()
	    .setTitle(`🎶 ${song.name} has been added to the queue.`)
      .setThumbnail(song.thumbnail)
	    .setTimestamp()
	    .setFooter({ text: 'Added by ' + song.user.username });
      queue.textChannel.send({ embeds: [addEmbed] })
  },
}