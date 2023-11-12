import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => [
	{ title: 'Add New Expense' },
	{ name: 'description', content: 'A central place to track your expenses!' },
]

export default function Expenses() {
	return (
		<>
			<h1>Add New Expense</h1>
		</>
	)
}
