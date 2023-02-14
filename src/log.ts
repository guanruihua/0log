import { getTypeStr } from './util'

function logParams(list: unknown[]) {
	const result: unknown[] = []
	list.forEach(item => {
		result.push(item)
		result.push(getTypeStr(item))
	})
	return result
}

export function log(...rest: unknown[]) {
	console.log(...logParams(rest))
}

export function debug(...rest: unknown[]) {
	console.debug(...logParams(rest))
}

export function error(...rest: unknown[]) {
	console.debug(...logParams(rest))
}

export function info(...rest) {
	console.info(...logParams(rest))
	return;
}

export function assert(assertion: boolean, ...rest: unknown[]) {
	console.assert(assertion, ...logParams(rest))
	return;
}

export function trace(...rest) {
	console.trace(...logParams(rest))
	return;
}