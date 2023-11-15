import { prisma } from './database.server'

export type ExpenseFormData = {
	amount: string
	date: string
	title: string
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

export async function getExpenses() {
	try {
		const expenses = await prisma.expense.findMany({
			orderBy: { date: 'desc' },
		})
		return expenses
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function getExpenseById(id: string) {
	try {
		const expense = await prisma.expense.findFirst({
			where: { id },
		})
		return expense
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function updateExpense(id: string, expenseData: ExpenseFormData) {
	try {
		const { amount, date, title } = expenseData
		return await prisma.expense.update({
			where: { id },
			data: { amount: +amount, date: new Date(date), title },
		})
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function deleteExpense(id: string) {
	try {
		return await prisma.expense.delete({ where: { id } })
	} catch (error) {
		console.error(error)
		throw error
	}
}
