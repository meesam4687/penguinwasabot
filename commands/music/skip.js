const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current song in the queue'),
    async execute(interaction) {
        const player = interaction.client.moonlinkManager.players.get(interaction.guild.id);
        if (!player) {
            return interaction.reply('There is nothing playing in this server!');
        }
        if (interaction.member.voice.channel?.id !== player.voiceChannelId) {
            return interaction.reply('You need to be in the same voice channel as the bot to use this command!');
        }
        if (!player.current) {
            return interaction.reply('There is nothing playing right now!');
        }
        const currentTrack = player.current;
        player.skip();

        interaction.reply(`Skipped: **${currentTrack.title}**`);
    },
};