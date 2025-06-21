const Discord = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');
const { REST } = require("@discordjs/rest")
const { Manager } = require('moonlink.js');
require('dotenv').config();
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildMessages, // |> Privilleged Intent Required for Snipe.
    Discord.GatewayIntentBits.MessageContent // |> Delete /events/messageDelete.js and /commands/fun/snipe.js if you want to remove these
  ]
});

client.moonlinkManager = new Manager({
  nodes: [
    {
      host: process.env.LAVAHOST,
      port: process.env.LAVAPORT,
      password: process.env.LAVAPASSWORD,
      secure: false,
    },
  ],

  sendPayload: (guildId, payload) => {
    const guild = client.guilds.cache.get(guildId);
    if (guild) guild.shard.send(JSON.parse(payload));
  },
  autoPlay: true,
});

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

const moonlinkEventsPath = path.join(__dirname, 'events/moonlink');
const moonlinkEventFiles = fs.readdirSync(moonlinkEventsPath).filter(file => file.endsWith('.js'));

for (const file of moonlinkEventFiles) {
  const moonlinkFilePath = path.join(moonlinkEventsPath, file);
  const moonlinkEvent = require(moonlinkFilePath);
  if (moonlinkEvent.once) {
    client.once(moonlinkEvent.name, (...args) => moonlinkEvent.execute(...args));
  } else {
    client.on(moonlinkEvent.name, (...args) => moonlinkEvent.execute(...args));
  }
}

client.on('raw', (packet) => {
  client.moonlinkManager.packetUpdate(packet);
});

client.login(process.env.TOKEN)

const express = require("express")()
express.all('/', function (req, res) {
  res.send("Server Running")
})
express.listen(process.env.PORT, console.log("Server Started"))