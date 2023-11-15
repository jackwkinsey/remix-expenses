import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'
import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { getExpenseById } from '~/data/expenses.server'

export const meta: MetaFunction = () => [
	{ title: 'Edit Expense' },
	{ name: 'description', content: 'Edit details for an expense' },
]

export default function EditExpensePage() {
	const navigate = useNavigate()

	function closeHandler() {
		navigate('..')
	}

	return (
		<Modal onClose={closeHandler}>
			<ExpenseForm />
		</Modal>
	)
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id || ''
	return getExpenseById(id)
}
