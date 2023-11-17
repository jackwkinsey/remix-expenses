import {
	redirect,
	type ActionFunctionArgs,
	type MetaFunction,
} from '@vercel/remix'
import { useNavigate } from '@remix-run/react'
import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { getUserFromSession } from '~/data/auth.server'
import { type ExpenseFormData, addExpense } from '~/data/expenses.server'
import { validateExpenseInput } from '~/data/validation.server'

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
	const userId: string = await getUserFromSession(request)

	try {
		validateExpenseInput(expenseData)
	} catch (error) {
		return error
	}

	await addExpense(expenseData, userId)

	return redirect('/expenses')
}
