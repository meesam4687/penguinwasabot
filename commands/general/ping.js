module.exports = {
    name: "ping",
    run: async (client, message, args) => {
        message.channel.send("Pinging...").then(m => {
            m.edit(`Pong! Bot ping is ${client.ws.ping}ms`);
        });
    }
}