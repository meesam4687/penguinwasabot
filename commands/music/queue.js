const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('queue')
        .setDescription('Check the current bot queue'),
    async execute(interaction) {
        const player = interaction.client.moonlinkManager.players.get(interaction.guild.id);

        if (!player) {
            return interaction.reply('There is nothing playing in this server!');
        }

        if (!player.current && player.queue.size === 0) {
            return interaction.reply('There are no tracks in the queue!');
        }

        const formatDuration = (ms) => {
            const seconds = Math.floor((ms / 1000) % 60);
            const minutes = Math.floor((ms / (1000 * 60)) % 60);
            const hours = Math.floor(ms / (1000 * 60 * 60));

            return `${hours ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };

        const embed = new Discord.EmbedBuilder()
            .setTitle('Current Queue')
            .setColor('#0099ff');

        if (player.current) {
            embed.setDescription(`**Now Playing:**\n[${player.current.title}] | \`${formatDuration(player.current.duration)}\``);
        }

        if (player.queue.size > 0) {
            const tracks = player.queue.tracks.map((track, index) => {
                return `${index + 1}. [${track.title}](${track.uri}) | \`${formatDuration(track.duration)}\``;
            });

            embed.addFields({
                name: 'Up Next:',
                value: tracks.slice(0, 10).join('\n'),
            });

            if (player.queue.size > 10) {
                embed.addFields({
                    name: 'And more...',
                    value: `${player.queue.size - 10} more tracks in the queue`,
                });
            }
        }

        interaction.reply({ embeds: [embed] });
    },
};