const DIG = require("discord-image-generation");
const Discord = require('discord.js');
module.exports = {
  name: "slap",
  run: async (client, message, args) => {
    let avatar1 = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
    let mention = message.mentions.users.first();
    if(!mention) return message.reply('Mention someone first, noob')
    let avatar2 = mention.displayAvatarURL({dynamic: false, format: 'png'});
    let img = await new DIG.Batslap().getImage(avatar1, avatar2);
    let attach = new Discord.MessageAttachment(img, "batslap.png");
    message.channel.send({files: [attach]})
  }
}