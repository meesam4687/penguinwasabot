const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('queue')
        .setDescription('Check the song queue.'),
    async execute(interaction) {
        let queue = interaction.client.distube.getQueue(interaction)
        if (!interaction.member.voice.channel) return interaction.reply({ content: "Join a VC First", ephemeral: true })
        if (!queue) return interaction.reply("Nothing Playing")
        const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
        let queueEmbed = new Discord.EmbedBuilder()
            .setColor('#34dbeb')
            .setTitle(`Server Queue`)
            .setDescription(q)
            .setTimestamp()
        interaction.reply({ embeds: [queueEmbed] })
    },
};