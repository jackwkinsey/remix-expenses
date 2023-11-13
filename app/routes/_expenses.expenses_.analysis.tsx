import type { MetaFunction } from '@remix-run/node'
import Chart from '~/components/expenses/Chart'
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics'
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
	{ title: 'Analyze Expenses' },
	{ name: 'description', content: 'A central place to track your expenses!' },
]

export default function ExpensesAnalysisPage() {
	return (
		<main>
			<Chart expenses={DUMMY_EXPENSES} />
			<ExpenseStatistics expenses={DUMMY_EXPENSES} />
		</main>
	)
}
