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
        interaction.client.usedPlayCommand = true
        const query = interaction.options.getString('songname')
        let searchResult = await interaction.client.ytPlugin.search(query)
        if (!interaction.member.voice.channel) return interaction.reply({ content: 'Join a VC', ephemeral: true });
        interaction.client.distube.play(interaction.member.voice.channel, searchResult[0], {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction
        })
        await interaction.deferReply()
        interaction.client.distube.on('playSong', async (queue, song) => {
            if(!interaction.client.usedPlayCommand) return;
            queue.client.distube.startduration = new Date()
            const playEmbed = new Discord.EmbedBuilder()
                .setTitle(`Now Playing ${song.name} 🎶`)
                .setDescription(`⌚ Song Duration: \`${song.formattedDuration}\``)
                .setImage(song.thumbnail)
                .setTimestamp()
                .setFooter({ text: `Requested by: ${song.user.username}` })
            const mesgRow = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("stopbtn")
                        .setLabel("⏹️")
                        .setStyle(Discord.ButtonStyle.Primary),
                    new Discord.ButtonBuilder()
                        .setCustomId("pausebtn")
                        .setLabel("⏸️")
                        .setStyle(Discord.ButtonStyle.Primary),
                    new Discord.ButtonBuilder()
                        .setCustomId("skpbtn")
                        .setLabel("⏩")
                        .setStyle(Discord.ButtonStyle.Primary)
                );
            const mesgRowR = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("stopbtn")
                        .setLabel("⏹️")
                        .setStyle(Discord.ButtonStyle.Primary),
                    new Discord.ButtonBuilder()
                        .setCustomId("pausebtn")
                        .setLabel("▶️")
                        .setStyle(Discord.ButtonStyle.Primary),
                    new Discord.ButtonBuilder()
                        .setCustomId("skpbtn")
                        .setLabel("⏩")
                        .setStyle(Discord.ButtonStyle.Primary)
                );
            interaction.editReply({ embeds: [playEmbed], components: [mesgRow] });
            interaction.client.usedPlayCommand = false
        });
    },
};
