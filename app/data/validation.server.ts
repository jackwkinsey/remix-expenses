import type { ExpenseFormData } from './expenses.server'

function isValidTitle(value: string): boolean {
	if (!value) {
		return false
	}
	return value.trim().length > 0 && value.trim().length <= 30
}

function isValidAmount(value: string): boolean {
	if (!value) {
		return false
	}

	const amount = parseFloat(value)
	return !isNaN(amount) && amount > 0
}

function isValidDate(value: string): boolean {
	if (!value) {
		return false
	}
	return new Date(value).getTime() < new Date().getTime()
}

export type ValidationErrors = {
	amount: string
	date: string
	title: string
}

export function validateExpenseInput(input: ExpenseFormData) {
	let validationErrors: ValidationErrors = {
		amount: '',
		date: '',
		title: '',
	}

	if (!isValidTitle(input.title)) {
		validationErrors.title =
			'Invalid expense title. Must be at least 1 character long and at most 30 characters long.'
	}

	if (!isValidAmount(input.amount)) {
		validationErrors.amount =
			'Invalid amount. Must be a number greater than zero.'
	}

	if (!isValidDate(input.date)) {
		validationErrors.date = 'Invalid date. Must be a date before today.'
	}

	if (
		validationErrors.amount ||
		validationErrors.date ||
		validationErrors.title
	) {
		throw validationErrors
	}
}
