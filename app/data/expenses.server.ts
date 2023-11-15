import { prisma } from './database.server'

type ExpenseFormData = {
	title: string
	amount: string
	date: string
}

export async function addExpense(expenseData: ExpenseFormData) {
	try {
		return await prisma.expense.create({
			data: {
				title: expenseData.title,
				amount: +expenseData.amount,
				date: new Date(expenseData.date),
			},
		})
	} catch (error) {
		console.error(error)
		throw error
	}
}
