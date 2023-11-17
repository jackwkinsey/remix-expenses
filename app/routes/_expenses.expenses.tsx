import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { FaDownload, FaPlus } from 'react-icons/fa'
import ExpensesList from '~/components/expenses/ExpensesList'
import { requireUserSession } from '~/data/auth.server'
import { getExpenses } from '~/data/expenses.server'

export const meta: MetaFunction = () => [
	{ title: 'My Expenses' },
	{ name: 'description', content: 'A central place to track your expenses!' },
]

export default function ExpensesLayout() {
	const expenses = useLoaderData<typeof loader>()
	const expensesListView =
		expenses && expenses.length ? (
			<ExpensesList expenses={expenses} />
		) : (
			<section className="no-expenses">
				<h1>No expenses found</h1>
				<p>
					Start <Link to="add">adding some</Link> today.
				</p>
			</section>
		)
	return (
		<>
			<Outlet />
			<main>
				<section className="expenses-actions">
					<Link to="add">
						<FaPlus />
						<span>Add Expense</span>
					</Link>
					<a href="/expenses/raw" target="_blank">
						<FaDownload />
						<span>Download Expenses Data</span>
					</a>
				</section>
				{expensesListView}
			</main>
		</>
	)
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	await requireUserSession(request)
	return getExpenses()
}
