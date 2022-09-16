const oakdexPokedex = require('oakdex-pokedex');
const Discord = require('discord.js');
module.exports = {
  name: "pokemon",
  run: async (client, message, args) => {
    if(args[0] === undefined){
      message.reply("There is no *nameless* pokemon (You did search for an empty space ¯\\_(ツ)_/¯)")
      return;
    }
    const pokem = oakdexPokedex.findPokemon(args[0].toLowerCase().charAt(0).toUpperCase() + args[0].toLowerCase().slice(1))

  if(pokem === null){
    message.reply(`Pokemon not Found`)
    return;
  }
  if(pokem.evolutions[0] === undefined){
    var evo = 'None'
  }
  if(pokem.evolutions[0] !== undefined){
    var evo = pokem.evolutions[0].to
  }
  const pokemon = args[0].toLowerCase()
    const pokeEmbed = new Discord.MessageEmbed()
  	.setColor('RANDOM')
    .setTitle(`${pokem.names.en}`)
    .addFields(
		{ name: 'Type', value: pokem.types[0], inline: true },
    { name: 'Evolves Into', value: evo, inline: true},
    { name: '឵឵឵          ឵឵      ', value: '឵឵឵          ឵឵      '},
    { name: 'Height', value: `${pokem.height_eu}`, inline: true },
    { name: 'Weight', value: `${pokem.weight_eu}`, inline: true },
    { name: '឵឵឵          ឵឵      ', value: '឵឵឵          ឵឵      '},
    { name: 'HP', value: `${pokem.base_stats.hp}`, inline: true },
    { name: 'ATK', value: `${pokem.base_stats.atk}`, inline: true },
    { name: 'DEF', value: `${pokem.base_stats.def}`, inline: true }
	)
    .setThumbnail(`https://www.smogon.com/dex/media/sprites/xy/${pokemon.replace(/ /g,"_")}.gif`)
    .setTimestamp()
  message.reply({ embeds: [pokeEmbed] })

  }
}