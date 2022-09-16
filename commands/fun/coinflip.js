function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const coinflip = ['Heads', 'Tails', 'MIDDLE :OOOOOOOOO']
function flip(){
return coinflip[Math.floor(Math.random() * coinflip.length)];
}
module.exports = {
  name: "coinflip",
  aliases: ["flip", "cflip"],
  run: async (client, message, args) => {
    let gif = "https://cdn.dribbble.com/users/722835/screenshots/2360005/coin_dr.gif"
    let msg = await message.channel.send(gif)
    await wait(2000)
    msg.edit(flip())
  }
}