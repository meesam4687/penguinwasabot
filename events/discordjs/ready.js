module.exports = {
  name: "ready",
  async execute(client){
    client.user.setActivity("with Penguins", {
      type: "PLAYING",
    }),
    client.channels.cache.get('905388276356104195').send('Bot Started'),
	  console.log('------Commands Loaded------ \n\nReady! \n' + `Logged in as ${client.user.username}`);
  },
}
