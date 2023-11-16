import {
	Form,
	Link,
	useActionData,
	useLoaderData,
	useNavigation,
	useParams,
} from '@remix-run/react'
import { FaTimes } from 'react-icons/fa'
import type { ExpenseValidationErrors } from '~/data/validation.server'
import type { loader } from '~/routes/_expenses.expenses.$id'

export default function ExpenseForm() {
	const today = new Date().toISOString().slice(0, 10) // yields something like 2023-09-10
	const params = useParams()
	const validationErrors = useActionData() as ExpenseValidationErrors
	const expense = useLoaderData<typeof loader>()
	const expenseDate = expense?.date
		? new Date(expense.date).toISOString().slice(0, 10)
		: ''
	const navigation = useNavigation()
	const isSubmitting = navigation.state !== 'idle'

	if (params.id && !expense) {
		return (
			<div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}
				>
					<Link to="..">
						<FaTimes />
					</Link>
				</div>
				<p style={{ textAlign: 'center' }}>Invalid expense id.</p>
			</div>
		)
	}

	const validationErrorMessages = validationErrors && (
		<ul>
			{Object.values(validationErrors).map(error => {
				if (!error) {
					return null
				}
				return <li key={error}>{error}</li>
			})}
		</ul>
	)

	return (
		<Form method={expense ? 'patch' : 'post'} className="form expense-form">
			<p>
				<label htmlFor="title">Expense Title</label>
				<input
					type="text"
					id="title"
					name="title"
					required
					maxLength={30}
					defaultValue={expense?.title}
				/>
			</p>

			<div className="form-row">
				<p>
					<label htmlFor="amount">Amount</label>
					<input
						type="number"
						id="amount"
						name="amount"
						min="0"
						step="0.01"
						required
						defaultValue={expense?.amount}
					/>
				</p>
				<p>
					<label htmlFor="date">Date</label>
					<input
						type="date"
						id="date"
						name="date"
						max={today}
						required
						defaultValue={expenseDate}
					/>
				</p>
			</div>
			{validationErrorMessages}
			<div className="form-actions">
				<button disabled={isSubmitting}>
					{isSubmitting ? 'Saving...' : 'Save Expense'}
				</button>
				<Link to="..">Cancel</Link>
			</div>
		</Form>
	)
}
