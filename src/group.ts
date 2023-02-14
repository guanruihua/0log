
export function group(...rest) {
	console.group(rest[0])
	for (let i = 1; i < rest.length; i++)
		console.log(rest[i])
	console.groupEnd()
}

export function groupCollapsed(...rest) {
	console.groupCollapsed(rest[0])
	for (let i = 1; i < rest.length; i++)
		console.log(rest[i])
	console.groupEnd()
}