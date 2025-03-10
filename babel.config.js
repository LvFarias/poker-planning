module.exports = {
	presets: [
		'@babel/preset-env',
		'@babel/preset-typescript',
		['@babel/preset-react', { runtime: 'automatic' }],
	],
	plugins: [
		'babel-plugin-transform-scss',
		'@babel/plugin-proposal-class-properties',
		'babel-plugin-transform-vite-meta-env',
	],
};
