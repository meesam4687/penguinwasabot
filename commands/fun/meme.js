const Discord = require('discord.js');
const { getPost, getImage } = require('random-reddit');
module.exports = {
  name: "meme",
  run: async (client, message, args) => {
    if(message.channel.id !== '854715779017343007' && message.guild.id === '765125984323633161') return message.reply('No *memes* in general 🗿.\nGo to <#854715779017343007>')
    const post = await getPost('memes')
    let title = post.title
    let img = post.url
    let memeEmbed = new Discord.MessageEmbed()
      .setTitle(title)
      .setImage(img)
      .setFooter({ text: 'The  M e m e' })
      .setColor('RANDOM')
    message.channel.send({ embeds: [memeEmbed] })
  }
}