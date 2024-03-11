const Discord = require('discord.js');
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const path = require('node:path');
const fs = require('node:fs');
const { REST } = require("@discordjs/rest")
require('dotenv').config();
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildMessages, // |> Privilleged Intent Required for Snipe.
    Discord.GatewayIntentBits.MessageContent // |> Delete /events/messageDelete.js and /commands/fun/snipe.js if you want to remove these
  ]
});
client.distube = new DisTube(client, {
  leaveOnStop: true,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: true,
  plugins: [
    new SpotifyPlugin(),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})
client.commands = new Discord.Collection();
const cmds = []

const musicCommandsPath = path.join(__dirname, 'commands/music');
const musicCommandFiles = fs.readdirSync(musicCommandsPath).filter(file => file.endsWith('.js'));
for (const file of musicCommandFiles) {
  const filePath = path.join(musicCommandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
  cmds.push(command.data)
}

const generalCommandsPath = path.join(__dirname, 'commands/general');
const generalCommandFiles = fs.readdirSync(generalCommandsPath).filter(file => file.endsWith('.js'));
for (const file of generalCommandFiles) {
  const filePath = path.join(generalCommandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
  cmds.push(command.data)
}

const funCommandsPath = path.join(__dirname, 'commands/fun');
const funCommandFiles = fs.readdirSync(funCommandsPath).filter(file => file.endsWith('.js'));
for (const file of funCommandFiles) {
  const filePath = path.join(funCommandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
  cmds.push(command.data)
}

const rest = new REST().setToken(process.env.TOKEN);
rest.put(Discord.Routes.applicationCommands(process.env.CLIENT_ID), { body: cmds })
  .then((data) => console.log(`Successfully registered ${data.length} commands.`))
  .catch(console.error);

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

const distubeEventsPath = path.join(__dirname, 'events/distube');
const distubeEventFiles = fs.readdirSync(distubeEventsPath).filter(file => file.endsWith('.js'));

for (const file of distubeEventFiles) {
  const distubeFilePath = path.join(distubeEventsPath, file);
  const devent = require(distubeFilePath);
  if (devent.once) {
    client.distube.once(devent.name, (...args) => devent.execute(...args));
  } else {
    client.distube.on(devent.name, (...args) => devent.execute(...args));
  }
}

client.login(process.env.TOKEN)

const express = require("express")()
express.all('/', function(req, res) {
  res.send("Server Running")
})
express.listen(process.env.PORT, console.log("Server Started"))
