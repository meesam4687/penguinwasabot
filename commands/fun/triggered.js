const DIG = require("discord-image-generation");
const Discord = require('discord.js');
module.exports = {
  name: "triggered",
  run: async (client, message, args) => {
    if(!message.mentions.users.first()){
      var av = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
    } else {
      var av = message.mentions.users.first().displayAvatarURL({dynamic: false, format: 'png'})
    }
    let img = await new DIG.Triggered().getImage(av);
    let attach = new Discord.MessageAttachment(img, "trigr.gif");
    message.channel.send({files: [attach]})
  }
}