module.exports = {
    name: 'prefix',
    run: async (client, message, args) => {
        if(!args.join(" ")) return message.reply("I cant keep an empty prefix!");
        client.db.set(`customprefix_${message.author.id}`, args[0]);
        message.reply(`Prefix set to ${args[0]}`);
    }
}