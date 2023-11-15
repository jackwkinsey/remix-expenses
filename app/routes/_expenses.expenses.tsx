import { type MetaFunction } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { FaDownload, FaPlus } from 'react-icons/fa'
import ExpensesList from '~/components/expenses/ExpensesList'
import { getExpenses } from '~/data/expenses.server'

export const meta: MetaFunction = () => [
	{ title: 'My Expenses' },
	{ name: 'description', content: 'A central place to track your expenses!' },
]

export default function ExpensesLayout() {
	const expenses = useLoaderData<typeof loader>()
	return (
		<>
			<Outlet />
			<main>
				<section className="expenses-actions">
					<Link to="add">
						<FaPlus />
						<span>Add Expense</span>
					</Link>
					<a href="/expenses/raw">
						<FaDownload />
						<span>Download Expenses Data</span>
					</a>
				</section>
				<ExpensesList expenses={expenses} />
			</main>
		</>
	)
}

export const loader = () => {
	return getExpenses()
}
