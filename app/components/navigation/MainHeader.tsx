import Logo from '../util/Logo'

export default function MainHeader() {
	return (
		<header className="main-header">
			<Logo />
			<nav className="main-nav">
				<ul>
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="/pricing">Pricing</a>
					</li>
					<li>
						<a href="/expenses">Expenses</a>
					</li>
				</ul>
			</nav>
			<nav id="cta-nav">
				<ul>
					<li>
						<a href="/auth" className="cta">
							Login
						</a>
					</li>
				</ul>
			</nav>
		</header>
	)
}
