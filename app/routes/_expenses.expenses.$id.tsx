import {
	redirect,
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
	type MetaFunction,
} from '@vercel/remix'
import { useNavigate } from '@remix-run/react'
import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { getUserFromSession, requireUserSession } from '~/data/auth.server'
import {
	type ExpenseFormData,
	getExpenseById,
	updateExpense,
	deleteExpense,
} from '~/data/expenses.server'
import { validateExpenseInput } from '~/data/validation.server'

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

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	const userId: string = await requireUserSession(request)
	return getExpenseById(params.id || '', userId)
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const userId: string = await getUserFromSession(request)
	const id = params.id || ''
	if (request.method === 'DELETE') {
		await deleteExpense(id, userId)
		return { deletedId: id }
	} else if (request.method === 'PATCH') {
		const formData = await request.formData()
		const expenseData = Object.fromEntries(formData) as ExpenseFormData

		try {
			validateExpenseInput(expenseData)
		} catch (error) {
			return error
		}

		await updateExpense(id, expenseData, userId)

		return redirect('/expenses')
	}
}
