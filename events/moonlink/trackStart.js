module.exports = {
    name: 'trackStart',
    once: false,
    execute(player, track) {
        const channel = client.channels.cache.get(player.textChannelId);
        if (channel) {
            channel.send(`Now playing: **${track.title}**`);
        }
    },
};