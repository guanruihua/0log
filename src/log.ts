import { getTypeStr } from './util'
import { isBrowser } from './config'
import { isArray, isNumber, isObject, isString, type } from 'asura-eye'
import { stringify } from 'abandonjs'
import { color } from 'rh-color'

function logParams(list: unknown[]) {
	const result: unknown[] = []

	// if (isBrowser) {
	// 	if (list.length === 1) {
	// 		return [getTypeStr(list[0]), list[0]]
	// 	}
	// }
	list.forEach(item => {
		result.push(item)
		result.push(getTypeStr(item))
	})
	return result
}

export function log(...rest: unknown[]) {
	if (isBrowser) {
		const len = rest.length
		const formatItem = (value: unknown, depth: number = 0) => {
			if (isString(value)) {
				const res = color(stringify(value, null, 2), 'Cyan') + color(` <${type(value)}>`, 'Green', 'Italic')
				if (depth === 0) {
					return res
				}
				return res.replace(/^/gm, new Array(depth).fill('  ').join(''))
			}
			if (isNumber(value)) {
				const res = color(stringify(value, null, 2), 'Magenta') + color(` <${type(value)}>`, 'Green', 'Italic')
				if (depth === 0) {
					return res
				}
				return res.replace(/^/gm, new Array(depth).fill('  ').join(''))
			}
			if (isObject(value)) {
				let resList = ['{']
				for (const key in value) {
					resList.push(`  ${color(key, 'Yellow')}: ${formatItem(value[key])}`)
				}
				resList.push('}')
				const res = resList.join('\n')
				if (depth === 0) {
					return res
				}
				return res.replace(/^/gm, new Array(depth).fill('  ').join(''))
			}
			if (isArray(value)) {
				return `[\n ${value.map(i => formatItem(i, depth + 1)).join(',\n')}\n]` + color(` <${type(value)}:${value.length}>`, 'Green', 'Italic')
			}
			return stringify(value, null, 2) + color(` <${type(value)}>`, 'Green', 'Italic')
		}
		const getFormatStr = () => {
			if (len === 0) {
				const val = rest[0]
				if (isString(val)) {
					return color(stringify(val, null, 2), 'Cyan') + color(` <${type(val)}>`, 'Green', 'Italic')
				}
			}
			return rest.map(i => formatItem(i)).join('\n')
			// const str = color(stringify(val, null, 2), 'Cyan') +
			// 	color(` <${type(val)}>`, 'Green')
			// const str = (stringify(val.map(i => color(stringify(i), 'Bright')), null, 2), 'Cyan') +
			// 	color(` <${type(val)}>`, 'Green')
			// return stringify(rest, null, 2)
		}
		console.log(getFormatStr())
		return;
	}
	console.log(...logParams(rest))
}

export function debug(...rest: unknown[]) {
	console.debug(...logParams(rest))
}

export function error(...rest: unknown[]) {
	console.error(...logParams(rest))
}

export function info(...rest) {
	console.info(...logParams(rest))
}

export function assert(assertion: boolean, ...rest: unknown[]) {
	console.assert(assertion, ...logParams(rest))
}

export function trace(...rest) {
	console.trace(...logParams(rest))
}