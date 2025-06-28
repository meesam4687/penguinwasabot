const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("help")
    .setDescription("Get some help"),
  async execute(interaction) {
    await interaction.deferReply();
    let musicCommands = [];
    try {
      musicCommands = fs
        .readdirSync(path.join(__dirname, "../music/"))
        .filter((file) => file.endsWith(".js"))
        .map((file) => `\`/${path.parse(file).name}\``);
    } catch (err) {
      console.error("Error reading music commands:", err);
    }

    let generalCommands = [];
    try {
      generalCommands = fs
        .readdirSync(path.join(__dirname, "../general/"))
        .filter((file) => file.endsWith(".js"))
        .map((file) => `\`/${path.parse(file).name}\``);
    } catch (err) {
      console.error("Error reading general commands:", err);
    }

    let funCommands = [];
    try {
      funCommands = fs
        .readdirSync(path.join(__dirname, "../fun/"))
        .filter((file) => file.endsWith(".js"))
        .map((file) => `\`/${path.parse(file).name}\``);
    } catch (err) {
      console.error("Error reading fun commands:", err);
    }
    const p = "/";
    const infoEmbed = new Discord.EmbedBuilder()
      .setColor("#57a3bd")
      .setTitle("Help")
      .setURL("https://www.youtube.com/watch?v=0iaNqJN5MTM")
      .setDescription(`List of commands:`)
      .addFields(
        { name: "━━ 🎶 ・ Music commands ━━", value: musicCommands.join(", ") },
        {
          name: "━━ 🤖 ・ General commands ━━",
          value: generalCommands.join(", "),
        },
        { name: "━━ 🏓 ・ Fun commands ━━", value: funCommands.join(", ") }
      );
    interaction.editReply({ embeds: [infoEmbed] }).catch(console.error);
  },
};
