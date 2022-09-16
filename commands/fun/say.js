module.exports = {
  name: "say",
  run: async (client, message, args) =>{
    const string = `${message.content.slice(7).trim()}`;
let allowedids = [
  '809702164724449290',
  '808184733158604800'
]
var prefix = 'pw!'
if(allowedids.includes(message.author.id)){
let id = message.id
if (!(args instanceof Array && args.length)) {
      return message.channel.send(`What do I have to say?`)
}
message.channel.send(`${message.content.slice(eval(+prefix.length + +3)).trim()}`)
message.fetch(id).then(msg => msg.delete());
return;
}
const substring = ["fuck", "Fuck", "bitch", "Bitch", "dick", "Dick", "bastard", "Bastard", "Asshole", "asshole"];

  if(string.includes(substring[0])){
    message.channel.send('I\'m a good Bot')
    return;
  }
  if(string.includes(substring[1])){
    message.channel.send('I\'m a good Bot')
    return;
  }
  if(string.includes(substring[2])){
    message.channel.send('I\'m a good Bot')
    return;
  }
  if(string.includes(substring[3])){
    message.channel.send('I\'m a good Bot')
    return;
  }
  if(string.includes(substring[4])){
    message.channel.send('I\'m a good Bot')
    return;
  }
  if(string.includes(substring[5])){
    message.channel.send('I\'m a good Bot')
    return;
  }
  if(string.includes(substring[6])){
    message.channel.send('I\'m a good Bot')
    return;
  }
  if(string.includes(substring[7])){
    message.channel.send('I\'m a good Bot')
    return;
  }
  if(string.includes(substring[8])){
    message.channel.send('I\'m a good Bot')
    return;
  }
  if(string.includes(substring[9])){
    message.channel.send('I\'m a good Bot')
    return;
  }
  let id = message.id
  if (!(args instanceof Array && args.length)) {
            return message.channel.send(`*Empty Spais*`)
        }
  message.channel.send(`${message.content.slice(eval(+prefix.length + +3)).trim().replace(/(https?:\/\/)?(www\.)?((discordapp\.com\/invite)|(discord\.gg))\/(\w+)|https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*) | https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/g , "*link*")} - By **${message.author.username}**`)
  message.fetch(id).then(msg => msg.delete()).catch(console.error);
  }
}