module.exports = {
    name: 'nodeError',
    once: false,
    execute(node) {
        console.error(`Node ${node.identifier} encountered an error:`, error);
    },
};