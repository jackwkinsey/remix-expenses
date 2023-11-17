import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import Chart from '~/components/expenses/Chart'
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics'
import { requireUserSession } from '~/data/auth.server'
import { getExpenses } from '~/data/expenses.server'

export const meta: MetaFunction = () => [
	{ title: 'Analyze Expenses' },
	{ name: 'description', content: 'A central place to track your expenses!' },
]

export default function ExpensesAnalysisPage() {
	const expenses = useLoaderData<typeof loader>()

	if (!expenses || !expenses.length) {
		return (
			<main>
				<section className="no-expenses">
					<h1>No expenses found to analyze</h1>
					<p>
						Start <Link to="add">adding some</Link> today to view analytics.
					</p>
				</section>
			</main>
		)
	}

	return (
		<main>
			<Chart expenses={expenses} />
			<ExpenseStatistics expenses={expenses} />
		</main>
	)
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userId: string = await requireUserSession(request)
	return getExpenses(userId)
}
