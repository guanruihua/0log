import { color } from 'rh-color'
import { type } from 'check-it-type'
import { __0__log__config__ } from '../config'
import { ObjectType } from 'abandonjs'

export function getTypeStr(value: unknown, format = true, config: ObjectType = {}) {

	const { DATE = false, TYPE = false } = { ...__0__log__config__, ...config }

	const supplement: string[] = []

	if (TYPE) supplement.push(type(value))
	if (DATE) {
		const date = new Date()
		const timeStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`
		supplement.push(timeStr)
	}
	const str = `<${supplement.join(', ')}>`
	if (format === false) {
		return str
	}

	return color(str, 'Grey')
}