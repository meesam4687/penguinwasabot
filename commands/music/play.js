module.exports = {
  name: "play",
  aliases: ["p"],
  run: async (client, message, args) => {
    const string = args.join(" ")
    if (!string) return message.channel.send(`Please enter a song url or query to play.`)
    try {
      let voicechannel = message.member.voice.channel
      if(!voicechannel){
        message.channel.send(`Join a Voice Channel First.`)
        return;
      }
      client.distube.play(message, string)
    } catch (e) {
      message.channel.send(`An Error Occured \n||${e}||`)
    }
  }
}