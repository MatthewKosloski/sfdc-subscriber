/**
 * Indicates if there exists a member in an array of objects such
 * that the member has a property with a particular value.
 *
 * @example
 * 		type Person = {name: string, age: number}
 * 		const people: Person[] = [{name: 'Matt', age: 21}, {name: 'Darrell', age: 45}];
 * 		const hasDarrel: boolean = hasObjectWithPropVal<Person>(people, 'name', 'Darrell');
 * 		console.log(hasDarrel); -> true
 *
 * @param arr The array of objects
 * @param prop The property on an object in the array
 * @param val The value of the property
 */
function hasObjectWithPropVal<T>(arr: T[], prop: keyof T, val: T[typeof prop]): boolean {
	return arr.some((obj: T) => obj[prop] === val);
};

export default hasObjectWithPropVal;