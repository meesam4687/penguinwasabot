const Discord = require("discord.js");
const { getPost, getImage } = require("random-reddit");

function randomArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("meme")
    .setDescription("Get a random meme"),
  async execute(interaction) {
    let subs = ["memes", "meme", "holup", "shitposting", "dankmemes"];
    let memeObj = await getPost(randomArray(subs));
    let memesEmbed = new Discord.EmbedBuilder()
      .setTitle(memeObj.title)
      .setImage(memeObj.url)
      .setTimestamp()
      .setAuthor({
        name: "Requested by " + interaction.user.username.toString(),
        iconURL: interaction.user.displayAvatarURL(),
      });
    await interaction.reply({ embeds: [memesEmbed] });
  },
};
