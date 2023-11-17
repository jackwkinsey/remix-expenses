import bcrypt from 'bcryptjs'
import { prisma } from './database.server'
import { createCookieSessionStorage, redirect } from '@remix-run/node'

const SESSION_SECRET = process.env.SESSION_SECRET

if (!SESSION_SECRET) {
	throw new Error('Server error!')
}

const sessionStorage = createCookieSessionStorage({
	cookie: {
		secure: process.env.NODE_ENV === 'production',
		secrets: [SESSION_SECRET],
		sameSite: 'lax',
		maxAge: 30 * 24 * 60 * 60, // 30 days
		httpOnly: true,
	},
})

export type CredentialsError = {
	message: string
	status: number
}

export type UserCredentialsFormData = {
	email: string
	password: string
}

async function createUserSession(userId: string, redirectPath: string) {
	const session = await sessionStorage.getSession()
	session.set('userId', userId)
	return redirect(redirectPath, {
		headers: {
			'Set-Cookie': await sessionStorage.commitSession(session),
		},
	})
}

export async function getUserFromSession(request: Request) {
	const session = await sessionStorage.getSession(request.headers.get('Cookie'))
	const userId = session.get('userId')

	if (!userId) {
		return null
	}

	return userId
}

export async function destroyUserSession(request: Request) {
	const session = await sessionStorage.getSession(request.headers.get('Cookie'))

	return redirect('/', {
		headers: {
			'Set-Cookie': await sessionStorage.destroySession(session),
		},
	})
}

export async function signup({ email, password }: UserCredentialsFormData) {
	const existingUser = await prisma.user.findFirst({ where: { email } })

	if (existingUser) {
		const error: CredentialsError = {
			message: 'A user with the provided email address exists already.',
			status: 422,
		}
		throw error
	}

	const passwordHash = await bcrypt.hash(password, 12)

	const user = await prisma.user.create({
		data: { email, password: passwordHash },
	})

	return createUserSession(user.id, '/expenses')
}

export async function login({ email, password }: UserCredentialsFormData) {
	const existingUser = await prisma.user.findFirst({ where: { email } })

	if (!existingUser) {
		const error: CredentialsError = {
			message: 'Invalid login. Please check your credentials and try again.',
			status: 401,
		}
		throw error
	}

	const passwordCorrect = await bcrypt.compare(password, existingUser.password)

	if (!passwordCorrect) {
		const error: CredentialsError = {
			message: 'Invalid login. Please check your credentials and try again.',
			status: 401,
		}
		throw error
	}

	return createUserSession(existingUser.id, '/expenses')
}
