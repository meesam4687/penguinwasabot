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
        const songName = interaction.options.getString('songname')
        if (!interaction.member.voice.channel) return interaction.reply({ content: 'Join a VC', ephemeral: true });
        interaction.client.distube.play(interaction.member.voice.channel, songName, {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction
        })
        interaction.reply({ content: "Added" })
    },
};
