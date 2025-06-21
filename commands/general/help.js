const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('help')
        .setDescription('Get some help'),
    async execute(interaction) {
        const p = "/"
        const infoEmbed = new Discord.EmbedBuilder()
            .setColor('#57a3bd')
            .setTitle('Help')
            .setURL('https://www.youtube.com/watch?v=0iaNqJN5MTM')
            .setDescription(`Bot is being re-written`)
        interaction.reply({ embeds: [infoEmbed] }).catch(console.error)
    },
};
