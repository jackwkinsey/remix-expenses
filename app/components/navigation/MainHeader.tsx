import { Link, NavLink } from '@remix-run/react'
import Logo from '~/components/util/Logo'

export default function MainHeader() {
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
			<nav id="cta-nav">
				<ul>
					<li>
						<Link to="/auth" className="cta">
							Login
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}
