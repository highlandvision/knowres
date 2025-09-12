module.exports = function (api) {
	api.cache(true);
	const presets = [
		'@babel/preset-env', {
			"targets": ">10.25%",
			modules: false,
			debug: true
		}
	];
	return {
		presets
	}
}