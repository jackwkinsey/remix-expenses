import type { LinksFunction, MetaFunction } from '@remix-run/node'
import AuthForm from '~/components/auth/AuthForm'
import styles from '~/styles/auth.css'

export const meta: MetaFunction = () => [
	{ title: 'Login' },
	{ name: 'description', content: 'Log in to track your expenses!' },
]

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export default function AuthPage() {
	return <AuthForm />
}
