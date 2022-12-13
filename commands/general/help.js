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
            .setDescription(`
            Commands Available :
          `)
            .addFields(
                { name: '━━ 🎶 ・ Music commands ━━', value: `\`${p}play\`, \`${p}stop\`, \`${p}skip\`, \`${p}forceskip\`, \`${p}queue\`, \`${p}nowplaying\`, \`${p}pause\`, \`${p}resume\`, \`${p}remove\`, \`${p}filter\`` },
                { name: '឵឵  ឵឵  ឵឵', value: '឵឵  ឵឵  ឵឵' },
                { name: '━━ 🤖 ・ General commands ━━', value: `\`${p}ping\`, \`${p}help\`, \`${p}snipe\`` },
                { name: '឵឵  ឵឵  ឵឵', value: '឵឵  ឵឵  ឵឵' },
                { name: '━━ 🏓 ・ Fun commands ━━', value: `\`${p}8ball\`, \`${p}beautiful\`, \`${p}coinflip\`, \`${p}hitler\`, \`${p}invert\`, \`${p}invert\`, \`${p}meme\`, \`${p}pokemon\`, \`${p}say\`, \`${p}slap\`, \`${p}trash\`, \`${p}triggered\`, \`${p}wanted\`` },
            )
        interaction.reply({ embeds: [infoEmbed] }).catch(console.error)
    },
};
