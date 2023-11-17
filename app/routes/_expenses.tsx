import { type LinksFunction, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import ExpensesHeader from '~/components/navigation/ExpensesHeader'
import { requireUserSession } from '~/data/auth.server'
import styles from '~/styles/expenses.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export default function _ExpensesLayout() {
	return (
		<>
			<ExpensesHeader />
			<Outlet />
		</>
	)
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	await requireUserSession(request)
}
