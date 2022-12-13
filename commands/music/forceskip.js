const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('forceskip')
        .setDescription('Forcefully skip the song (you are extremely evil)'),
    async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction)
        if (!queue) return interaction.reply(`There is nothing in the queue right now!`).catch(console.error)
        try {
            if (interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
                if (queue.songs.length > 1) {
                    interaction.client.distube.skip(interaction)
                    interaction.reply(`Skipped!`).catch(console.error)
                    return;
                };
                if (queue.songs.length >= 1) {
                    interaction.client.distube.stop(interaction)
                    interaction.reply('Skipped!').catch(console.error)
                    return;
                };
            } else {
                interaction.reply('You are not powerful enough to do that').catch(console.error)
                return;
            }
        } catch (e) {
            interaction.reply({ content: `${e}`, ephemeral: true }).catch(console.error)
        }
    },
};