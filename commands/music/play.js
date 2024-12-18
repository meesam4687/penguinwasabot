const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption(option =>
            option.setName('songname')
                .setDescription('Name of the song you want to play')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply()
        const query = interaction.options.getString('songname')
        let searchResult = await interaction.client.ytPlugin.search(query)
        if (!interaction.member.voice.channel) return interaction.reply({ content: 'Join a VC', ephemeral: true });
        interaction.client.distube.play(interaction.member.voice.channel, searchResult[0], {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction
        })
        interaction.editReply("Added to Queue")
    },
};