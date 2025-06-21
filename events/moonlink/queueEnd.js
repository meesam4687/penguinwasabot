module.exports = {
    name: 'queueEnd',
    once: false,
    execute(player) {
        setTimeout(() => {
            if (!player.playing && player.queue.size === 0) {
                player.destroy();
            }
        }, 30000);
    },
};