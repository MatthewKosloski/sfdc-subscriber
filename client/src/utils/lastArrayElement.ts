export default function<T>(arr: T[]): T {
	return arr[arr.length - 1] as T;
}