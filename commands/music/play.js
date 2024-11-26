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
        //interaction.client.usedPlayCommand = true
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
// In case I forget, the editing original interaction is due to there being two event listeners
// TODO: Do the same thing using a single event listener