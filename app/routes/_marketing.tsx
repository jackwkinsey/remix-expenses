import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import MainHeader from '~/components/navigation/MainHeader'
import { getUserFromSession } from '~/data/auth.server'
import styles from '~/styles/marketing.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export default function _MarketingLayout() {
	return (
		<>
			<MainHeader />
			<Outlet />
		</>
	)
}

export const loader = ({ request }: LoaderFunctionArgs) => {
	return getUserFromSession(request)
}
