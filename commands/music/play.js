const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('The song you want to play')
                .setRequired(true)),
    async execute(interaction) {
        const { channel } = interaction.member.voice;
        await interaction.deferReply();
        if (!channel) {
            return interaction.editReply('You need to join a voice channel first!');
        }

        const player = interaction.client.moonlinkManager.createPlayer({
            guildId: interaction.guild.id,
            voiceChannelId: channel.id,
            textChannelId: interaction.channel.id,
            autoPlay: true,
        });

        player.connect();
        const query = interaction.options.getString('query');
        const searchResult = await interaction.client.moonlinkManager.search({
            query: query,
            requester: interaction.user.id
        });
        if (!searchResult.tracks.length) {
            return interaction.editReply('No results found!');
        }

        switch (searchResult.loadType) {
            case 'playlist':
                player.queue.add(searchResult.tracks);

                interaction.editReply({
                    content: `Added playlist **${searchResult.playlistInfo.name}** with ${searchResult.tracks.length} tracks to the queue.`,
                });

                if (!player.playing) {
                    player.play();
                }
                break;

            case 'search':
            case 'track':
                player.queue.add(searchResult.tracks[0]);

                interaction.editReply({
                    content: `Added **${searchResult.tracks[0].title}** to the queue.`,
                });

                if (!player.playing) {
                    player.play();
                }
                break;

            case 'empty':
                message.editReply('No matches found for your query!');
                break;

            case 'error':
                message.editReply(`Error loading track: ${searchResult.error || 'Unknown error'}`);
                break;
        }
    },
};