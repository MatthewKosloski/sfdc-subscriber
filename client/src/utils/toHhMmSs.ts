import pad from './pad';

/**
 * Converts a UTC timestamp that has the format
 * YYYY-MM-DDTHH:MM:SSZ to HH:SS with padded zeros.
 *
 */
export default (timestamp: string): string => {
	const d = new Date(timestamp);
	const hours = d.getHours();
	const minutes = d.getMinutes();
	const seconds = d.getSeconds();

	const hh = pad(hours);
	const mm = pad(minutes);
	const ss = pad(seconds);

	return `${hh}:${mm}:${ss}`;
};