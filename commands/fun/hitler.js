const imgGen = require("discord-image-generation");
const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('hitler')
        .setDescription('Generate a "worse than hitler" meme from avatars')
        .addUserOption((o) =>
            o
                .setName("user")
                .setDescription("The Target")
                .setRequired(true)
        ),
    async execute(interaction) {
        let tgt = interaction.options.getUser('user')
        var av = tgt.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new imgGen.Hitler().getImage(av);
        let attach = new Discord.AttachmentBuilder(img, "hitler.png");
        interaction.reply({ files: [attach] })
    },
};
