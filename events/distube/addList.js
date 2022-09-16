const Discord = require("discord.js")
module.exports = {
  name: "addList",
  async execute(queue, playlist){
    queue.textChannel.send(
      `Added playlist ${playlist.name} to the queue`
    )
  },
}