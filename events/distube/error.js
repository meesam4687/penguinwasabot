const Discord = require("discord.js")
module.exports = {
  name: "error",
  async execute(error, queue){
	  if(error.code === 'VOICE_MISSING_PERMS'){
		  queue.textChannel.send('I can\'t Join that Voice Channel')
		  return;
	  }
	  queue.textChannel.send(`An Error Occured While Executing That Command \n||${error}||`)
          console.log(error)
  },
}