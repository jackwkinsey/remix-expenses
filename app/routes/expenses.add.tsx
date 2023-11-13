import type { MetaFunction } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'
import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'

export const meta: MetaFunction = () => [
	{ title: 'Add New Expense' },
	{ name: 'description', content: 'Add a new expense to track.' },
]

export default function Expenses() {
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
