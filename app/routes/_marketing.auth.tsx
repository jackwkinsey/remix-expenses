import type {
	ActionFunctionArgs,
	LinksFunction,
	MetaFunction,
} from '@vercel/remix'
import AuthForm from '~/components/auth/AuthForm'
import {
	signup,
	type UserCredentialsFormData,
	type CredentialsError,
	login,
} from '~/data/auth.server'
import { validateUserCredentialsInput } from '~/data/validation.server'
import styles from '~/styles/auth.css'

export const meta: MetaFunction = ({ params, location, data, matches }) => {
	const isSignUpMode = location.search === '?mode=signup'
	return [
		{ title: isSignUpMode ? 'Sign Up' : 'Login' },
		{
			name: 'description',
			content: 'Log in or sign up to track your expenses!',
		},
	]
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export default function AuthPage() {
	return <AuthForm />
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const { searchParams } = new URL(request.url)
	const authMode = searchParams.get('mode') || 'login'
	const formData = await request.formData()
	const userCredentialsData = Object.fromEntries(
		formData
	) as UserCredentialsFormData

	try {
		validateUserCredentialsInput(userCredentialsData)
	} catch (error) {
		return error
	}

	try {
		if (authMode === 'login') {
			return await login(userCredentialsData)
		} else {
			return await signup(userCredentialsData)
		}
	} catch (error) {
		const e = error as CredentialsError
		return { credentials: e.message }
	}
}
