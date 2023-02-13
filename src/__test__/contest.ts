import { _BaseValueMap_ } from 'unit-testing-js'

const rest = [
	undefined,
	null
]

export const all = rest.concat(
	_BaseValueMap_.get('@SIMPLE_PARAM')
)