import type { MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import ExpensesList from '~/components/expenses/ExpensesList'
import type { Expense } from '~/components/expenses/types'

const DUMMY_EXPENSES: Array<Expense> = [
	{
		id: 'e1',
		title: 'First Expense',
		amount: 12.99,
		date: new Date().toISOString(),
	},
	{
		id: 'e2',
		title: 'Second Expense',
		amount: 16.99,
		date: new Date().toISOString(),
	},
]

export const meta: MetaFunction = () => [
	{ title: 'My Expenses' },
	{ name: 'description', content: 'A central place to track your expenses!' },
]

export default function ExpensesLayout() {
	return (
		<>
			<Outlet />
			<main>
				<ExpensesList expenses={DUMMY_EXPENSES} />
			</main>
		</>
	)
}
