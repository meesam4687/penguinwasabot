const Discord = require('discord.js');

module.exports = {
        data: new Discord.SlashCommandBuilder()
                .setName('resume')
                .setDescription('Resume the queue'),
        async execute(interaction) {
                const queue = interaction.client.distube.getQueue(interaction)
                if (!queue) return interaction.reply(`You never played anything in the first place`).catch(console.error)
                if (!queue.paused) return interaction.reply('Its not paused').catch(console.error)
                queue.resume()
                interaction.reply("Resumed").catch(console.error)
        },
};