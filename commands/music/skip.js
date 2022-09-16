const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');
module.exports = {
  name: "skip",
  aliases: ["s"],
  run: async (client, message, args) => {
	const row = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('primary')
			.setLabel('Skip')
			.setStyle('PRIMARY'),
	);
var voters = []
if(!message.member.voice.channel) return message.reply('Join a VC');
let ids = message.member.voice.channel.members.map(user => user.id)
const peeps = ids.length - 1
const queue = client.distube.getQueue(message)

if(!message.member.voice.channel) return message.channel.send('Join a VC First');
if (!queue) return message.channel.send(`There is nothing in the queue right now!`);

if(ids.length <= 3){
        if(queue.songs.length > 1){
          client.distube.skip(message)
          message.channel.send(`Skipped!`)
          return;
        };
         if(queue.songs.length >= 1){
          client.distube.stop(message)
          message.channel.send('Skipped!')
          return;
        };
};

const skipEmbed = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setTitle(`VoteSkip`)
  .setDescription(`React to the Message \nRequired Votes ${Math.ceil(peeps / 2)}`)
	.setTimestamp()

message.channel.send({ embeds: [skipEmbed], components: [row] });

const filter = i => i.customId === 'primary' && i.user.bot === false && voters.includes(i.user.id) === false;

const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

collector.on('collect', async i => {
	if (i.customId === 'primary') {
		await i.update({ embeds: [skipEmbed], components: [row] });
    await i.channel.send(`<@${i.user.id}> Voted`);
    voters.push(i.user.id);
    console.log(collector.collected.size)
    if(collector.collected.size === Math.ceil(peeps / 2)){
      collector.stop()
    }
	}
});
collector.on('end', collected => {
  console.log(`Collected ${collected.size} items`)
  if(collected.size === Math.ceil(peeps / 2)){
          if(queue.songs.length > 1){
            client.distube.skip(message)
            message.channel.send(`Skipped!`)
            return;
          }
          if(queue.songs.length >= 1){
            client.distube.stop(message)
            message.channel.send('Skipped!')
            return;
          }
  } else { 
	message.channel.send('Did Not Get Enough Votes To Skip')
	  return;
  }
})
}
}