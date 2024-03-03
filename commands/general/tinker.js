const Discord = require('discord.js');

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('tinker')
		.setDescription('Tinker with the bot settings'),
    .addStringOption(option =>
        option.setName('inp')
            .setDescription('Command to Execute')
            .setRequired(true)),
	async execute(interaction) {
    if(interaction.user.id !== '809702164724449290'){
      await interaction.reply("You can\'t run this command unfortunately");
      return;
    }
    let input = interaction.options.getString('inp')
    await eval(input);
    interaction.reply("Executed");
	},
};
