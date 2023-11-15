import {
	redirect,
	type ActionFunctionArgs,
	type MetaFunction,
} from '@remix-run/node'
import { useNavigate } from '@remix-run/react'
import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { type ExpenseFormData, addExpense } from '~/data/expenses.server'

export const meta: MetaFunction = () => [
	{ title: 'Add New Expense' },
	{ name: 'description', content: 'Add a new expense to track.' },
]

export default function AddExpensePage() {
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

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const expenseData = Object.fromEntries(formData) as ExpenseFormData
	console.log(
		JSON.stringify(formData, null, 2),
		JSON.stringify(expenseData, null, 2)
	)
	await addExpense(expenseData)

	return redirect('/expenses')
}
