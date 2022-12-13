const Discord = require("discord.js")
module.exports = {
  name: "error",
  async execute(channel, error){
	  if(error.code === 'VOICE_MISSING_PERMS'){
		  channel.send('I can\'t Join that Voice Channel')
		  return;
	  }
	  channel.send(`An Error Occured While Executing That Command \n||${error}||`)
          console.log(error)
  },
}