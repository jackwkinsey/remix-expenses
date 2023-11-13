import { Link } from '@remix-run/react'
import Logo from '../util/Logo'

export default function MainHeader() {
	return (
		<header className="main-header">
			<Logo />
			<nav className="main-nav">
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/pricing">Pricing</Link>
					</li>
					<li>
						<Link to="/expenses">Expenses</Link>
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
