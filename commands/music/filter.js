const filterConfig = require("../../filter_config.json");
const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("filter")
    .setDescription("Apply a filter to the player")
    .addStringOption((option) =>
      option
        .setName("filter")
        .setDescription("Choose a filter to apply")
        .setRequired(true)
        .addChoices(
          { name: "Nightcore", value: "nightcore" },
          { name: "Vaporwave", value: "vaporwave" },
          { name: "Bass Boost", value: "bassboost" },
          { name: "8D Audio", value: "8d" },
          { name: "Off", value: "off" }
        )
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const player = interaction.client.moonlinkManager.players.get(
      interaction.guild.id
    );
    let filter = interaction.options.getString("filter");
    if (!player) {
      return interaction.editReply({
        content: "Nothing playing in this server.",
        ephemeral: true,
      });
    }
    if (filter === "off") {
      if (interaction.client.filterState === "off") {
        return interaction.editReply({
          content: "Filter is already disabled.",
          ephemeral: true,
        });
      }
      player.filters.resetFilters();
      interaction.client.filterState = "off";
      return interaction.editReply({
        content: "Disabled filter.",
      });
    } else if (filterConfig[filter].type === "timescale") {
      if (interaction.client.filterState !== "off") {
        player.filters.resetFilters();
      }
      player.filters.setTimescale({
        speed: filterConfig[filter].speed,
        pitch: filterConfig[filter].pitch,
        rate: filterConfig[filter].rate,
      });
      interaction.client.filterState = "timescale";
      interaction.editReply({
        content: `Applied **${filter}** to the queue.`,
      });
    } else if (filterConfig[filter].type === "equalizer") {
      if (interaction.client.filterState !== "off") {
        player.filters.resetFilters();
      }
      player.filters.setEqualizer(
        filterConfig[filter].bands.map((band) => ({
          band: band.band,
          gain: band.gain,
        }))
      );
      interaction.client.filterState = "equalizer";
      interaction.editReply({
        content: `Applied **${filter}** to the queue.`,
      });
    } else if (filterConfig[filter].type === "rotation") {
      if (interaction.client.filterState !== "off") {
        player.filters.resetFilters();
      }
      player.filters.setRotation({
        rotationHz: filterConfig[filter].rotationHz,
      });
      interaction.client.filterState = "rotation";
      interaction.editReply({
        content: `Applied **${filter}** to the queue.`,
      });
    }
  },
};
