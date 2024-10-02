const Discord = require("discord.js")
module.exports = {
  name: "error",
  async execute(error, queue){
	  if(error.code === 'VOICE_MISSING_PERMS'){
		  queue.textChannel.send('I can\'t Join that Voice Channel')
		  return;
	  }
	  if(error.code === 'FFMPEG_EXITED'){
		  queue.textChannel.send('YouTube is cracking down on bots that fetch songs, hence I wasnt able to fetch the audio and play the song.')
		  return;
	  }
	  queue.textChannel.send(`An Error Occured While Executing That Command \n||${error}||`)
          console.log(error)
  },
}