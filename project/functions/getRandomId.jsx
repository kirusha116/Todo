export default function getRandomId() {

	let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

	let res = '';

	for (let i = 0; i < 8; i++) {
		res += chars[Math.floor(Math.random() * chars.length)];
	}

	return res;
}