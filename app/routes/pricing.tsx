import type { LinksFunction, MetaFunction } from '@remix-run/node'
import styles from '~/styles/marketing.css'

export const meta: MetaFunction = () => [
	{ title: 'Pricing' },
	{ name: 'description', content: 'A central place to track your expenses!' },
]

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export default function Pricing() {
	return (
		<>
			<h1>Remix Expenses - Pricing</h1>
		</>
	)
}
