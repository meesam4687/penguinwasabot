const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Can\'t decide on something? Flip a coin!'),
    async execute(interaction) {
        const cflip = ['Heads', 'Tails']
        function flip() {
            function oneinhun(){
                return Math.floor(Math.random() * 1001)
            }
            var value;
            let int = Math.floor(Math.random() * cflip.length)
            var value = cflip[int];
            if(oneinhun() === 239){
                value = "MIDDLE! HOLY SHIT"
            }
            return value;
        }
        interaction.reply(flip())
    },
};