const Discord = require('discord.js');
const { QuickDB } = require('quick.db');

const db = new QuickDB();
module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('snipe')
		.setDescription('Fetch the most recently deleted message in this channel'),
	async execute(interaction) {
		let msg = await db.get(`snipemsg_${interaction.channel.id}`)
		let senderid = await db.get(`snipesender_${interaction.channel.id}`)
		let pfp = await db.get(`snipepfp_${interaction.channel.id}`)
		var mesg = msg
		if (!msg) {
			return interaction.reply({ content: `Well I Did Not Find Any Deleted Message In This Channel, Lol`, ephemeral: true })
		}
		if (msg.length > 200) {
			var mesg = `${msg.substr(0, 200)}.......`;
		}
		let embed = new Discord.EmbedBuilder()
			.setTitle(senderid)
			.setDescription(mesg.replace(/(https?:\/\/)?(www\.)?((discordapp\.com\/invite)|(discord\.gg))\/(\w+)|https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, "*link*"))
			.setFooter({ text: 'Sniped, lol' })
		interaction.reply({ embeds: [embed] })
	},
};
