module.exports = {
	apps: [
		{
			name: 'kingplay-fe',
			script: 'build/index.js',
			node_args: '-r dotenv/config',
			env: {
				NODE_ENV: 'development',
				PORT: 9001
			},
			env_production: {
				NODE_ENV: 'production',
				PORT: 9000
			}
		}
	]
};
