const imgGen = require("discord-image-generation");
const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slap Someone')
        .addUserOption((o) =>
            o
                .setName("user")
                .setDescription("The Target")
                .setRequired(true)
        ),
    async execute(interaction) {
        let tgt = interaction.options.getUser('user')
        var av = tgt.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new imgGen.Batslap().getImage(av, interaction.user.displayAvatarURL({ dynamic: false, format: 'png' }));
        let attach = new Discord.MessageAttachment(img, "batslap.png");
        interaction.reply({ files: [attach] })
    },
};