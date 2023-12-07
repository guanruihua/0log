import { getTypeStr } from './util'
import { isBrowser } from './config'
import { isArray, isNumber, isObject, isString, type } from 'asura-eye'
import { stringify } from 'abandonjs'
import { color } from 'rh-color'

function logParams(list: unknown[]) {
	const result: unknown[] = []
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
				const res = color(stringify(value, null, 2), 'Cyan', 'Bright') + color(` <${type(value)}>`, 'Green', 'Italic')
				if (depth === 0) {
					return res
				}
				return res.replace(/^/gm, new Array(depth).fill('  ').join(''))
			}

			if (isNumber(value)) {
				const res = color(stringify(value, null, 2), 'Bright') + color(` <${type(value)}>`, 'Green', 'Italic')
				if (depth === 0) {
					return res
				}
				return res.replace(/^/gm, new Array(depth).fill('  ').join(''))
			}

			if (isObject(value)) {
				let resList = ['{']
				for (const key in value) {
					resList.push(`  ${color(key, 'Blue', 'Bright')}: ${formatItem(value[key])}`)
				}
				resList.push('}')
				const res = resList.join('\n')
				if (depth === 0) {
					return res
				}
				return res.replace(/^/gm, new Array(depth).fill('  ').join(''))
			}

			if (isArray(value)) {
				return `[\n ${value.map(i => formatItem(i, depth + 1)).join(',\n')}\n]`
			}

			const getResValue = () => {
				let val = stringify(value, null, 2)
				if (val[0] === '{' && val[val.length - 1] === '}') {
					try {
						const obj = JSON.parse(JSON.stringify(value))
						if (isObject(obj)) {
							val = formatItem(obj)
						}

					} catch (error) {
						// eslint-disable-line
					}
				}
				return val.replaceAll('\\"', '')

			}
			const resValue = getResValue()

			return resValue + color(` <${type(value)}>`, 'Green', 'Italic')
		}
		const getFormatStr = () => {
			if (len === 0) {
				const val = rest[0]
				if (isString(val)) {
					return color(stringify(val, null, 2), 'Cyan', 'Bright') + color(` <${type(val)}>`, 'Green', 'Italic')
				}
			}
			return rest.map(i => formatItem(i)).join('\n')
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