import bcrypt from 'bcryptjs'
import { prisma } from './database.server'

export type CredentialsError = {
	message: string
	status: number
}

export type UserCredentialsFormData = {
	email: string
	password: string
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

	await prisma.user.create({ data: { email, password: passwordHash } })
}
