const Discord = require('discord.js')
module.exports = {
    name: "remove",
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`Nothing is Being Played`)
        if(!args[0]){
            let remov = queue.songs.pop()
            message.channel.send(`Removed \`${remov.name}\` from the queue.`)
            return;
        }
        let removed = queue.songs.splice(args[0], args[0]);
        message.channel.send(`Removed \`${removed.name}\` from the queue`)
    }
}