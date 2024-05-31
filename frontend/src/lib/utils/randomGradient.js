/* 	randomGradient utility
 *	2024 © Atlaspad Launchpad
 *  Yigid BALABAN <fyb@fybx.dev
 */
export default () => {
	const createHex = () => {
		let code = '';
		let digits = '0123456789abcdef';

		for (let i = 0; i < 6; i++) code += digits.charAt(Math.floor(Math.random() * digits.length));
		return code;
	};

	const deg = Math.floor(Math.random() * 360);

	return `linear-gradient(${deg}deg, #${createHex()}, #${createHex()})`;
};
