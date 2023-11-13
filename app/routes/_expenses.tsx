import type { LinksFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import styles from '~/styles/expenses.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export default function _ExpensesLayout() {
	return <Outlet />
}
