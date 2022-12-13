const Discord = require('discord.js');

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop any music thats playing'),
	async execute(interaction) {
		let queue = interaction.client.distube.getQueue(interaction)
		if (!interaction.member.voice.channel) return interaction.reply({ content: "Join a VC First", ephemeral: true })
		if (!queue) return interaction.reply("Nothing playing")
		interaction.client.distube.stop(interaction)
		interaction.reply({ content: "Stopped" })
	},
}