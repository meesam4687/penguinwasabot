const oakdexPokedex = require("oakdex-pokedex");
const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("pokemon")
    .setDescription("Get info on a pokemon")
    .addStringOption((option) =>
      option
        .setName("pokemonname")
        .setDescription("Name of the pokemon")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    let pokeInput = interaction.options.getString("pokemonname");
    const pokem = oakdexPokedex.findPokemon(
      pokeInput.toLowerCase().charAt(0).toUpperCase() +
        pokeInput.toLowerCase().slice(1)
    );
    if (pokem === null) {
      interaction.editReply({ content: "Pokemon not Found", ephemeral: true });
      return;
    }
    var evo;
    pokem.evolutions[0] ? (evo = pokem.evolutions[0].to) : (evo = "None");
    const pokemon = pokeInput.toLowerCase();
    const pokeEmbed = new Discord.EmbedBuilder()
      .setTitle(`${pokem.names.en}`)
      .addFields(
        { name: "Type", value: pokem.types[0], inline: true },
        { name: "Evolves Into", value: evo, inline: true },
        { name: "឵឵឵          ឵឵      ", value: "឵឵឵          ឵឵      " },
        { name: "Height", value: `${pokem.height_eu}`, inline: true },
        { name: "Weight", value: `${pokem.weight_eu}`, inline: true },
        { name: "឵឵឵          ឵឵      ", value: "឵឵឵          ឵឵      " },
        { name: "HP", value: `${pokem.base_stats.hp}`, inline: true },
        { name: "ATK", value: `${pokem.base_stats.atk}`, inline: true },
        { name: "DEF", value: `${pokem.base_stats.def}`, inline: true }
      )
      .setThumbnail(
        `https://www.smogon.com/dex/media/sprites/xy/${pokemon.replace(
          / /g,
          "_"
        )}.gif`
      )
      .setTimestamp();
    interaction.editReply({ embeds: [pokeEmbed] });
  },
};
