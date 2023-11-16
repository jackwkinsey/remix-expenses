import type { ExpenseFormData } from './expenses.server'
import type { UserCredentialsFormData } from './user.server'

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

function isValidEmail(value: string): boolean {
	const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(value)
}

function isValidPassword(value: string): boolean {
	const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&_+=]).{8,}$/
	return passwordRegex.test(value)
}

export type ExpenseValidationErrors = {
	amount: string
	date: string
	title: string
}
export function validateExpenseInput(input: ExpenseFormData) {
	let validationErrors: ExpenseValidationErrors = {
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

export type UserCredentialsValidationErrors = {
	email: string
	password: string
}
export function validateUserCredentialsInput(input: UserCredentialsFormData) {
	let validationErrors: UserCredentialsValidationErrors = {
		email: '',
		password: '',
	}

	if (!isValidEmail(input.email)) {
		validationErrors.email = 'Invalid email. Please provide a valid email.'
	}

	if (!isValidPassword(input.password)) {
		validationErrors.password =
			'Invalid password. Passwords must contain: \n - at least 8 characters \n - at least one capital letter \n - at least one special character (!@#$%^&_+=)'
	}

	if (validationErrors.email || validationErrors.password) {
		throw validationErrors
	}
}
