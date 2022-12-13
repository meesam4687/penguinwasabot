const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove a song from the queue')
        .addIntegerOption(option => option.setName('int').setDescription('Number in queue').setRequired(true)),
    async execute(interaction) {
        let opt = interaction.options.getInteger('int');
        const queue = interaction.client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({ content: `Nothing is Being Played`, ephemeral: true }).catch(console.error)
        if (queue.length < opt) return interaction.reply("Was quite funny that you tried to do that");
        let removed = queue.songs.splice(opt, opt);
        interaction.reply(`Removed from the queue`).catch(console.error)
    },
};