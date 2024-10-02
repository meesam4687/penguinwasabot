const Discord = require('discord.js')
module.exports = {
    name: 'playSong',
    once: false,
    execute(queue, song) {
        if(queue.client.usedPlayCommand) return;
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
        queue.textChannel.send({ embeds: [playEmbed], components: [mesgRow] })
    },
};