const imgGen = require("discord-image-generation");
const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('invert')
        .setDescription('Generate an inverted image')
        .addUserOption((o) =>
            o
                .setName("user")
                .setDescription("The Target")
                .setRequired(true)
        ),
    async execute(interaction) {
        let tgt = interaction.options.getUser('user')
        var av = tgt.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new imgGen.Invert().getImage(av);
        let attach = new Discord.MessageAttachment(img, "inverted.png");
        interaction.reply({ files: [attach] })
    },
};