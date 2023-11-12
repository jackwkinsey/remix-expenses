import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Pricing' },
		{ name: 'description', content: 'A central place to track your expenses!' },
	]
}

export default function Pricing() {
	return (
		<>
			<h1>Remix Expenses - Pricing</h1>
		</>
	)
}
