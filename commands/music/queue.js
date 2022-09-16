const Discord = require('discord.js')
module.exports = {
    name: "queue",
    aliases: ["q"],
    run: async (client, message, args) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`Nothing is Being Played`)
      const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
      const queueEmbed = new Discord.MessageEmbed()
	      .setColor('#34dbeb')
	      .setTitle(`Server Queue`)
        .setDescription(q)
	      .setTimestamp()
      message.channel.send({ embeds: [queueEmbed] })
    }
}