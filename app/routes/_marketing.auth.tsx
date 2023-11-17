import {
	redirect,
	type ActionFunctionArgs,
	type LinksFunction,
	type MetaFunction,
} from '@remix-run/node'
import AuthForm from '~/components/auth/AuthForm'
import {
	signup,
	type UserCredentialsFormData,
	type CredentialsError,
} from '~/data/auth.server'
import { validateUserCredentialsInput } from '~/data/validation.server'
import styles from '~/styles/auth.css'

export const meta: MetaFunction = () => [
	{ title: 'Login' },
	{ name: 'description', content: 'Log in to track your expenses!' },
]

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
			// TODO: login logic
			console.log('login with credentials:', userCredentialsData)
		} else {
			await signup(userCredentialsData)
			return redirect('/expenses')
		}
	} catch (error) {
		const e = error as CredentialsError
		if (e.status === 422) {
			return { credentials: e.message }
		}
	}

	return redirect('/auth')
}
