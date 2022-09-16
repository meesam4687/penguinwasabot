const Discord = require("discord.js")
module.exports = {
  name: "playList",
  async execute(queue, playlist, song){
    queue.textChannel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.size} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\``
    )
  },
}