const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current song'),
    async execute(interaction) {
        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('Skip')
                    .setStyle(Discord.ButtonStyle.Primary),
            );
        var voters = []
        if (!interaction.member.voice.channel) return interaction.reply({ content: 'Join a VC', ephemeral: true });
        let ids = interaction.member.voice.channel.members.map(user => user.id)
        const peeps = ids.length - 1
        const queue = interaction.client.distube.getQueue(interaction)

        if (!interaction.member.voice.channel) return interaction.reply({ content: 'Join a VC', ephemeral: true }).catch(console.error)
        if (!queue) return interaction.reply({ content: 'Nothing being played', ephemeral: true }).catch(console.error)

        if (ids.length <= 3) {
            if (queue.songs.length > 1) {
                interaction.client.distube.skip(interaction)
                interaction.reply(`Skipped!`)
                return;
            };
            if (queue.songs.length >= 1) {
                interaction.client.distube.stop(interaction)
                interaction.reply('Skipped!')
                return;
            };
        };

        const skipEmbed = new Discord.EmbedBuilder()
            .setTitle(`VoteSkip`)
            .setDescription(`React to the Message \nRequired Votes ${Math.ceil(peeps / 2)}`)
            .setTimestamp()

        interaction.reply({ embeds: [skipEmbed], components: [row] }).catch(console.error)

        const filter = i => i.customId === 'primary' && i.user.bot === false && voters.includes(i.user.id) === false;

        const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: Discord.ComponentType.Button, time: 15000 });

        collector.on('collect', async i => {
            if (i.customId === 'primary') {
                await i.update({ embeds: [skipEmbed], components: [row] });
                await i.channel.send(`<@${i.user.id}> Voted`);
                voters.push(i.user.id);
                console.log(collector.collected.size)
                if (collector.collected.size === Math.ceil(peeps / 2)) {
                    collector.stop()
                }
            }
        });
        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`)
            if (collected.size === Math.ceil(peeps / 2)) {
                if (queue.songs.length > 1) {
                    interaction.client.distube.skip(message)
                    interaction.channel.send(`Skipped!`)
                    return;
                }
                if (queue.songs.length >= 1) {
                    interaction.client.distube.stop(message)
                    interaction.channel.send('Skipped!')
                    return;
                }
            } else {
                interaction.channel.send('Did Not Get Enough Votes To Skip').catch(console.error)
                return;
            }
        })
    },
};