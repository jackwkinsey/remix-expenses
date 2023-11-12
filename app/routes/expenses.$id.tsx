import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Expense Details' },
		{ name: 'description', content: 'A central place to track your expenses!' },
	]
}

export default function Expenses() {
	const id = useLoaderData<typeof loader>()
	return (
		<>
			<h1>My Expenses - {id}</h1>
		</>
	)
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id
	return id
}
