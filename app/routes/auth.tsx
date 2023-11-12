import type { LinksFunction, MetaFunction } from '@remix-run/node'
import styles from '~/styles/auth.css'

export const meta: MetaFunction = () => [
	{ title: 'Login' },
	{ name: 'description', content: 'A central place to track your expenses!' },
]

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export default function Auth() {
	return (
		<>
			<h1>Remix Expenses - User Authentication</h1>
		</>
	)
}
