// rollup.config.js
import json from '@rollup/plugin-json';

export default {
	plugins: [
		json({
			compact: true
		})
	]
};
