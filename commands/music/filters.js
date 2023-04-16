const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('filter')
        .setDescription('Set a filter to the current song')
        .addStringOption(option =>
            option.setName('filter')
                .setDescription('Name of the filter')
                .setRequired(true)),
    async execute(interaction) {
        let filtername = interaction.options.getString('filter')
        const queue = interaction.client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({ content: "Nothing Playing Right Now.", ephemeral: true })
        if (filtername === "off" && queue.filters) queue.filters.clear()
        else if (Object.keys(interaction.client.distube.filters).includes(filtername)) queue.filters.add(filtername)
        else if (filtername) return interaction.reply({ content: "Not a Filter", ephemeral: true })
        interaction.reply(`Filter is Set to : ${queue.filters}`)
    },
};