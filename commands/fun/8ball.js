const Discord = require('discord.js');
function ball() {
var responses = ['No', 'Yes', 'Idk'];
return responses[Math.floor(Math.random() * responses.length)];
}

module.exports = {
  name: "8ball",
  run: async (client, message, args) => {
  if (!(args instanceof Array && args.length)){
    return message.reply(`Question wher? For now the answer of everything is 42`)
  }
  const balllEmbed = new Discord.MessageEmbed()
  	.setColor('#ffac00')
    .setTitle(`8Ball`)
    .setDescription(`The Ball Says \`${ball()}\``)
    .setThumbnail('https://cdn.discordapp.com/emojis/747353630314725376.gif')
    .setTimestamp()

  message.reply({ embeds: [balllEmbed] })
}
}