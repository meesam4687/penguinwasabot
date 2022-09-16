const { Formatters } = require("discord.js");
module.exports = {
    name: "loop",
    aliases: ["repeat"],
    run: async (client, message, args) => {
      let options = ["on", "off"]
      let p = 'pw!'
      const queue = client.distube.getQueue(message)
      if(!args[0] || !options.includes(args[0].toLowerCase())) return message.reply(`Enter a Valid Option (on or off). Example: ${Formatters.codeBlock([`${p}loop on`])}`)
      if (!queue) return message.channel.send(`There is nothing playing!`)
      let mode = null
      switch (args[0].toLowerCase()) {
        case "off":
          mode = 0
          break
        case "on":
          mode = 2
          break
      }
      mode = client.distube.setRepeatMode(message, mode)
      mode = mode === 2 ? "On" : "Off"
      message.channel.send(`Loop \`${mode}\``)
  }
}