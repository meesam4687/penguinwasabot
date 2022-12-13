const Discord = require('discord.js');

module.exports = {
        data: new Discord.SlashCommandBuilder()
                .setName('pause')
                .setDescription('Pause the song'),
        async execute(interaction) {
                const queue = interaction.client.distube.getQueue(interaction)
                if (!queue) return interaction.reply(`Nothing playing...........e`).catch(console.error)
                if (queue.paused) return message.reply('Its already paused...').catch(console.error)
                queue.pause()
                interaction.reply("Queue Paused").catch(console.error)
        },
};