module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Ready!\nLogged in as ${client.user.tag}`);
    client.moonlinkManager.init(client.user.id);
    client.filterState = "off";
    console.log(`Moonlink Manager initialized for ${client.user.tag}`);
  },
};
