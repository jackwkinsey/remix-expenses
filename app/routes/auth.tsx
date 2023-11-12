import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Login' },
		{ name: 'description', content: 'A central place to track your expenses!' },
	]
}

export default function Auth() {
	return (
		<>
			<h1>Remix Expenses - User Authentication</h1>
		</>
	)
}
