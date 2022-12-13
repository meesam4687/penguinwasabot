module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready!\nLogged in as ${client.user.tag}`);
	},
};