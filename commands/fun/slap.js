const imgGen = require("discord-image-generation");
const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("slap")
    .setDescription("Slap Someone")
    .addUserOption((o) =>
      o.setName("user").setDescription("The Target").setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    let tgt = interaction.options.getUser("user");
    var av = tgt.displayAvatarURL({ dynamic: false, format: "png" });
    let img = await new imgGen.Batslap().getImage(
      av,
      interaction.user.displayAvatarURL({ dynamic: false, extension: "png" })
    );
    let attach = new Discord.AttachmentBuilder(img, "batslap.png");
    await interaction.editReply({ files: [attach] });
  },
};
