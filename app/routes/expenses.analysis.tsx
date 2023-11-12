import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => [
	{ title: 'Analyze Expenses' },
	{ name: 'description', content: 'A central place to track your expenses!' },
]

export default function Expenses() {
	return (
		<>
			<h1>Analyze My Expenses</h1>
		</>
	)
}
