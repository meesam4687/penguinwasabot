const Discord = require("discord.js")
const wait = require("util").promisify(setTimeout)
module.exports = {
  name: "playSong",
  async execute(queue, song){
    queue.client.distube.startduration = new Date()
    const playEmbed = new Discord.MessageEmbed()
	    .setColor('RANDOM')
	    .setTitle(`Now Playing ${song.name} 🎶`)
      .setDescription(`⌚ Song Duration: \`${song.formattedDuration}\``)
	    .setImage(song.thumbnail)
	    .setTimestamp()
      .setFooter({text: `Requested by: ${song.user.username}`})
    const mesgRow = new Discord.MessageActionRow()
    .addComponents(
     new Discord.MessageButton()
      .setCustomId("stopbtn")
      .setLabel("⏹️")
      .setStyle("PRIMARY"),
     new Discord.MessageButton()
      .setCustomId("pausebtn")
      .setLabel("⏸️")
      .setStyle("PRIMARY"),
     new Discord.MessageButton()
      .setCustomId("skpbtn")
      .setLabel("⏩")
      .setStyle("PRIMARY")
    );
    const mesgRowR = new Discord.MessageActionRow()
    .addComponents(
     new Discord.MessageButton()
      .setCustomId("stopbtn")
      .setLabel("⏹️")
      .setStyle("PRIMARY"),
     new Discord.MessageButton()
      .setCustomId("pausebtn")
      .setLabel("▶️")
      .setStyle("PRIMARY"),
     new Discord.MessageButton()
      .setCustomId("skpbtn")
      .setLabel("⏩")
      .setStyle("PRIMARY")
    );
    queue.textChannel.send({ embeds: [playEmbed], components: [mesgRow] })
  },
}
