import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => [
	{ title: 'Download Expenses Data' },
	{ name: 'description', content: 'A central place to track your expenses!' },
]

export default function DownloadRawExpensesDataPage() {
	return (
		<>
			<h1>Download Raw Expenses Data</h1>
		</>
	)
}
