import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
	return [
		{ title: 'My Expenses' },
		{ name: 'description', content: 'A central place to track your expenses!' },
	]
}

export default function Expenses() {
	return (
		<>
			<h1>My Expenses</h1>
		</>
	)
}
