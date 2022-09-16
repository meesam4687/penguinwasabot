const { DiscordTogether } = require('discord-together');
const Discord = require('discord.js');
module.exports = {
  name: "youtube",
  aliases: ["yt"],
  run: async (client, message, args) => {
    if (message.author.bot || !message.guild) return;
    if (!message.mentions.has(message.client.user)) return;
    if (!message.content.includes(client.user.id)) return;
    if(!message.member.voice.channel) return message.reply("Join a VC First");
    try {
      client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
        const row = new Discord.MessageActionRow()
          .addComponents(
            new Discord.MessageButton()
              .setLabel('Start')
              .setStyle('LINK')
              .setURL(invite.code)
              .setEmoji('994896305384063018')
          );
        const youtubeEmbed = new Discord.MessageEmbed()
          .setTitle(`Click To Start`)
          .setDescription('Note: It Doesnt Work On Phone')
          .setURL(`${invite.code}`)
          .setColor('#fc0320')
        return message.channel.send({ embeds: [youtubeEmbed] , components: [row]}).catch(console.error);
      });
    } catch (e) {
      console.error(e)
      message.channel.send(`Error: \`${e}\``)
    }
  }
}
