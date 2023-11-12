import type { MetaFunction, LinksFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import styles from '~/styles/expenses.css'

export const meta: MetaFunction = () => [
	{ title: 'My Expenses' },
	{ name: 'description', content: 'A central place to track your expenses!' },
]

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export default function ExpensesLayout() {
	return (
		<main>
			<p>Shared Element!</p>
			<Outlet />
		</main>
	)
}
