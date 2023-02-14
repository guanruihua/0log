import { table } from '..'

table({
	a: 1,
	b: '2',
	d: {
		a: 1,
		b: '2',
		c: '5',
	},
	e: function () { },
	f: Infinity
})

table(["apples", "oranges", "bananas"])

const people = [["John", "Smith"], ["Jane", "Doe"], ["Emily", "Jones"]]
table(people)