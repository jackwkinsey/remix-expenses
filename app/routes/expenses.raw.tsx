import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Download Expenses Data' },
		{ name: 'description', content: 'A central place to track your expenses!' },
	]
}

export default function Expenses() {
	return (
		<>
			<h1>Download Raw Expenses Data</h1>
		</>
	)
}
