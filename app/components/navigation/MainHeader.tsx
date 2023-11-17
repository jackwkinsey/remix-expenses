import { Form, Link, NavLink, useLoaderData } from '@remix-run/react'
import Logo from '~/components/util/Logo'

export default function MainHeader() {
	const userId = useLoaderData<typeof String>()

	const ctaButton = userId ? (
		<Form method="post" action="/logout" className="logout-form">
			<button className="cta-alt">Logout</button>
		</Form>
	) : (
		<Link to="/auth" className="cta">
			Login
		</Link>
	)

	return (
		<header className="main-header">
			<Logo />
			<nav className="main-nav">
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/pricing">Pricing</NavLink>
					</li>
				</ul>
			</nav>
			<nav className="cta-nav">
				<ul>
					<li>{ctaButton}</li>
				</ul>
			</nav>
		</header>
	)
}
