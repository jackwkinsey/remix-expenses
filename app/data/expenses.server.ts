import { prisma } from './database.server'

export type ExpenseFormData = {
	amount: string
	date: string
	title: string
}

export async function addExpense(expenseData: ExpenseFormData, userId: string) {
	if (!userId) {
		throw new Error('Cannot create an expense without a user. Please try again')
	}
	const { amount, date, title } = expenseData
	try {
		return await prisma.expense.create({
			data: {
				title: title.trim(),
				amount: +amount,
				date: new Date(date),
				User: { connect: { id: userId } },
			},
		})
	} catch (error) {
		throw new Error('Failed to create the new expense. Please try again later.')
	}
}

export async function getExpenses(userId: string) {
	if (!userId) {
		throw new Error('Failed to get list of expenses. Please try again later.')
	}
	try {
		const expenses = await prisma.expense.findMany({
			orderBy: { date: 'desc' },
			where: { userId },
		})
		return expenses
	} catch (error) {
		throw new Error('Failed to get list of expenses. Please try again later.')
	}
}

export async function getExpenseById(id: string, userId: string) {
	if (!userId) {
		throw new Error('Failed to get the expense. Please try again later.')
	}
	try {
		const expense = await prisma.expense.findFirst({
			where: { id, userId },
		})
		return expense
	} catch (error) {
		throw new Error('Failed to get the expense. Please try again later.')
	}
}

export async function updateExpense(
	id: string,
	expenseData: ExpenseFormData,
	userId: string
) {
	if (!userId) {
		throw new Error('Failed to update the expense. Please try again later.')
	}
	try {
		const { amount, date, title } = expenseData
		return await prisma.expense.update({
			where: { id, userId },
			data: { amount: +amount, date: new Date(date), title: title.trim() },
		})
	} catch (error) {
		throw new Error('Failed to update the expense. Please try again later.')
	}
}

export async function deleteExpense(id: string, userId: string) {
	if (!userId) {
		throw new Error('Failed to the delete expense. Please try again later.')
	}
	try {
		return await prisma.expense.delete({ where: { id, userId } })
	} catch (error) {
		throw new Error('Failed to the delete expense. Please try again later.')
	}
}
