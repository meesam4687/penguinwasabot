module.exports = {
    name: "filter",
    aliases: ["filters"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`Nothing Playing`)
        if (args[0] === "off" && queue.filters) client.distube.setFilter(message, queue.filters)
        else if (Object.keys(client.distube.filters).includes(args[0])) client.distube.setFilter(message, args[0])
        else if (args[0]) return message.channel.send(`Not a filter`)
        message.channel.send(`Filter is Set to : ${queue.filters}`)
    }
}