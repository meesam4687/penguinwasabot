const Discord = require('discord.js')
const db = require('quick.db')
module.exports = {
  name: "snipe",
  run: async (client, message, args) => {
  let msg = db.get(`snipemsg_${message.channel.id}`)
  let senderid = db.get(`snipesender_${message.channel.id}`)
  let pfp = db.get(`snipepfp_${message.channel.id}`)
  var mesg = msg
  if(!msg) {
    return message.channel.send(`Well I Did Not Find Any Deleted Message In This Channel, Lol`)
  }
  if(msg.length > 200){
    var mesg = `${msg.substr(0, 200)}.......`;
  }
  let embed = new Discord.MessageEmbed()
    
    .setAuthor(db.get(`snipesender_${message.channel.id}`), pfp)
    .setDescription(mesg.replace(/(https?:\/\/)?(www\.)?((discordapp\.com\/invite)|(discord\.gg))\/(\w+)|https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g , "*link*"))
    .setColor("RANDOM")
    .setFooter({ text: 'Sniped, lol' })
  message.channel.send({ embeds: [embed] })
  }
}