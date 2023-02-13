import { color } from 'rh-color'
import { type } from 'check-it-type'

export function getTypeStr(value: unknown) {
	return color(`<${type(value)}>`, 'Grey')
}