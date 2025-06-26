const Discord = require("discord.js");
const fetch = require("isomorphic-unfetch");
const { getData } = require("spotify-url-info")(fetch);

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
    let query = interaction.options.getString("query");
    let spotifyTrackRegex =
      /^(https?:\/\/)?(open\.spotify\.com\/track\/|spotify:track:)([a-zA-Z0-9]{22})/;
    let spotifyPlaylistRegex =
      /^(https?:\/\/)?(open\.spotify\.com\/playlist\/|spotify:playlist:)([a-zA-Z0-9]{22})/;
    let spotifyAlbumRegex =
      /^(https?:\/\/)?(open\.spotify\.com\/album\/|spotify:album:)([a-zA-Z0-9]{22})/;
    if (spotifyTrackRegex.test(query)) {
      try {
        let data = await getData(query);
        if (data.type === "track") {
          query = data.name + " " + data.artists[0].name;
        }
      } catch (error) {
        return interaction.editReply(
          "There was an error fetching the Spotify data. Please try again."
        );
      }
    } else if (
      spotifyPlaylistRegex.test(query) ||
      spotifyAlbumRegex.test(query)
    ) {
      try {
        let data = await getData(query);
        for (const track of data.trackList) {
          query = track.title + " " + track.subtitle;
          const searchResult = await interaction.client.moonlinkManager.search({
            query: query,
            requester: interaction.user.id,
          });
          if (searchResult.tracks.length) {
            player.queue.add(searchResult.tracks[0]);
          }
        }
        interaction.editReply({
          content: `Added playlist **${data.name}** to the queue.`,
        });
        if (!player.playing) {
          player.play();
        }
      } catch (error) {
        console.error("Error fetching Spotify playlist:", error);
        return interaction.editReply(
          "There was an error fetching the Spotify playlist. Please try again."
        );
      }
    } else {
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
    }
  },
};
