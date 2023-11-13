import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'

export const meta: MetaFunction = () => [
	{ title: 'Edit Expense' },
	{ name: 'description', content: 'Edit details for an expense' },
]

export default function Expenses() {
	const id = useLoaderData<typeof loader>()
	// TODO: get expense based on id and pre-populate form
	console.log('Expense ID:', id)
	return (
		<Modal>
			<ExpenseForm />
		</Modal>
	)
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id
	return id
}
