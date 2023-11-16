import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useRouteError,
} from '@remix-run/react'
import type { ReactNode } from 'react'
import sharedStyles from '~/styles/shared.css'
import Error from '~/components/util/Error'

export const meta: MetaFunction = () => [
	{ title: 'Remix Expenses' },
	{ name: 'description', content: 'A central place to track your expenses!' },
]

export const links: LinksFunction = () => [
	...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
	{ rel: 'stylesheet', href: sharedStyles },
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap',
	},
]

type DocumentProps = {
	title?: string
	children: ReactNode
}
function Document({ title, children }: DocumentProps) {
	return (
		<html lang="en">
			<head>
				{title && <title>{title}</title>}
				<Meta />
				<Links />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	)
}

export function ErrorBoundary() {
	const error = useRouteError() as Error
	console.error('ERROR:', error)

	if (isRouteErrorResponse(error)) {
		return (
			<Document title={error.statusText}>
				<main>
					<Error title={error.statusText}>
						<p>
							{error.data?.message ||
								'Something went wrong. Please try again later.'}
						</p>
						<p>
							Back to <Link to="/">safety</Link>.
						</p>
					</Error>
				</main>
			</Document>
		)
	}

	return (
		<Document title="An error occurred!">
			<main>
				<Error title="An error occurred!">
					<p>
						{error.message || 'Something went wrong. Please try again later.'}
					</p>
					<p>
						Back to <Link to="/">safety</Link>.
					</p>
				</Error>
			</main>
		</Document>
	)
}
