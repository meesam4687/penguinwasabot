const { Permissions } = require('discord.js');
module.exports = {
    name: "forceskip",
    aliases: ["fs"],
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
        try {
          if(message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)){
          if(queue.songs.length > 1){
            client.distube.skip(message)
            message.channel.send(`Skipped!`)
            return;
          };
          if(queue.songs.length >= 1){
            client.distube.stop(message)
            message.channel.send('Skipped!')
            return;
          };
          } else {
            message.channel.send('You are not powerful enough to do that')
            return;
          }
        } catch (e) {
            message.channel.send(`${e}`)
        }
    }
}