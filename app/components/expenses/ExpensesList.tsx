import ExpenseListItem from './ExpenseListItem'
import type { Expense } from './types'

type ExpensesListProps = {
	expenses: Array<Expense>
}

function ExpensesList({ expenses }: ExpensesListProps) {
	return (
		<ol className="expenses-list">
			{expenses.map(expense => (
				<li key={expense.id}>
					<ExpenseListItem
						id={expense.id}
						title={expense.title}
						amount={expense.amount}
					/>
				</li>
			))}
		</ol>
	)
}

export default ExpensesList
