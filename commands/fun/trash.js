const imgGen = require("discord-image-generation");
const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('trash')
        .setDescription('Someones avatar is trash')
        .addUserOption((o) =>
            o
                .setName("user")
                .setDescription("The Target")
                .setRequired(true)
        ),
    async execute(interaction) {
        let tgt = interaction.options.getUser('user')
        var av = tgt.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new imgGen.Trash().getImage(av);
        let attach = new Discord.AttachmentBuilder(img, "inverted.png");
        interaction.reply({ files: [attach] })
    },
};
