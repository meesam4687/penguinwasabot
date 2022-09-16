module.exports = {
    name: "pause",
    aliases: ["hold"],
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`Nothing playing...........e`)
        if(queue.paused) return message.reply('Its already paused...');
        queue.pause()
        message.channel.send("Queue Paused")
    }
}