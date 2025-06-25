const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("The song you want to play")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { channel } = interaction.member.voice;
    await interaction.deferReply();
    if (!channel) {
      return interaction.editReply("You need to join a voice channel first!");
    }

    const player = interaction.client.moonlinkManager.createPlayer({
      guildId: interaction.guild.id,
      voiceChannelId: channel.id,
      textChannelId: interaction.channel.id,
      autoPlay: false,
    });

    player.connect();
    const query = interaction.options.getString("query");
    const searchResult = await interaction.client.moonlinkManager.search({
      query: query,
      requester: interaction.user.id,
    });
    if (!searchResult.tracks.length) {
      return interaction.editReply("No results found!");
    }

    switch (searchResult.loadType) {
      case "playlist":
        player.queue.add(searchResult.tracks);

        interaction.editReply({
          content: `Added playlist **${searchResult.playlistInfo.name}** to the queue.`,
        });

        if (!player.playing) {
          player.play();
        }
        break;

      case "search":
      case "track":
        const addEmbed = new Discord.EmbedBuilder()
          .setTitle(
            `🎶 ${searchResult.tracks[0].title} has been added to the queue.`
          )
          .setThumbnail(searchResult.tracks[0].artworkUrl)
          .setTimestamp()
          .setFooter({ text: "Added by " + interaction.user.username });
        player.queue.add(searchResult.tracks[0]);

        interaction.editReply({
          embeds: [addEmbed],
        });

        if (!player.playing) {
          player.play();
        }
        break;

      case "empty":
        interaction.editReply("No matches found for your query!");
        break;

      case "error":
        interaction.editReply(
          `Error loading track: ${searchResult.error || "Unknown error"}`
        );
        break;
    }
  },
};
