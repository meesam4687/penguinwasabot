const imgGen = require("discord-image-generation");
const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("beautiful")
    .setDescription('Generate a "this is beautiful" meme from avatars')
    .addUserOption((o) =>
      o.setName("user").setDescription("The Target").setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    let tgt = interaction.options.getUser("user");
    var av = tgt.displayAvatarURL({ dynamic: false, extension: "png" });
    let img = await new imgGen.Beautiful().getImage(av);
    let attach = new Discord.AttachmentBuilder(img, "beautiful.png");
    await interaction.editReply({ files: [attach] });
  },
};
