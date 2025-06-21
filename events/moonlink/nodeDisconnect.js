module.exports = {
    name: 'nodeDisconnect',
    once: false,
    execute(node) {
        console.log(`Node ${node.identifier} disconnected`);
    },
};