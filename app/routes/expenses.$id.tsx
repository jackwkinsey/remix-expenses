import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'

export const meta: MetaFunction = () => [
	{ title: 'Edit Expense' },
	{ name: 'description', content: 'Edit details for an expense' },
]

export default function Expenses() {
	const navigate = useNavigate()
	const id = useLoaderData<typeof loader>()

	function closeHandler() {
		navigate('..')
	}

	// TODO: get expense based on id and pre-populate form
	console.log('Expense ID:', id)

	return (
		<Modal onClose={closeHandler}>
			<ExpenseForm />
		</Modal>
	)
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id
	return id
}
