const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Can\'t decide on something? Flip a coin!'),
    async execute(interaction) {
        const cflip = ['Heads', 'Tails']
        function flip() {
            let int = Math.floor(Math.random() * cflip.length)
            if (Math.random() === 0.8484170789233052) {
                return "MIDDLE! Holy Shit"
            }
            return coinflip[int];
        }
        interaction.reply(flip())
    },
};