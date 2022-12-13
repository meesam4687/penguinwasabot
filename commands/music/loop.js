const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('loop')
        .setDescription('Loop the song currently playing')
        .addStringOption(option =>
            option.setName('option')
                .setDescription('On or Off')
                .setRequired(true)
                .addChoices(
                    { name: 'On', value: 'on' },
                    { name: 'Off', value: 'off' },
                )),
    async execute(interaction) {
        const choice = interaction.options.getString('option');
        const queue = interaction.client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({ content: "The queue is empty", ephemeral: true }).catch(console.error)
        let mode = null
        switch (choice) {
            case "off":
                mode = 0
                break
            case "on":
                mode = 2
                break
        }
        mode = interaction.client.distube.setRepeatMode(interaction, mode)
        mode = mode === 2 ? "On" : "Off"
        interaction.reply(`Loop \`${mode}\``).catch(console.error)
    },
};