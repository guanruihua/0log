import { ObjectType, stringify } from 'abandonjs'
import { isArray, isObject } from 'asura-eye'
import { getTypeStr } from './util'

function logParams(params: unknown) {
	const result: ObjectType = {}
	if (isArray(params) || isObject(params)) {
		for (const i in params) {
			const item = params[i]
			result[i] = {
				'Values': item,
				'Values<String>': stringify(item),
				'<Type>': getTypeStr(item, false, { DATE: false }),
			}
		}
	}
	return result
}

export function table(params: unknown) {
	if (isArray(params) || isObject(params)) {
		console.table(logParams(params))
	}
}