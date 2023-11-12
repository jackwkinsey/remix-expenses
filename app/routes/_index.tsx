import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Remix Expenses' },
		{ name: 'description', content: 'A central place to track your expenses!' },
	]
}

export default function Index() {
	return (
		<>
			<h1>Remix Expenses - Home</h1>
		</>
	)
}
