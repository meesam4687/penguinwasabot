module.exports = {
    name: 'nodeConnect',
    once: false,
    execute(node) {
        console.log(`Node ${node.identifier} connected`);
    },
};