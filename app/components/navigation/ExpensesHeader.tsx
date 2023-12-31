import { Form, NavLink } from '@remix-run/react'

import Logo from '~/components/util/Logo'

export default function ExpensesHeader() {
	return (
		<header className="main-header">
			<Logo />
			<nav className="main-nav">
				<ul>
					<li>
						<NavLink to="/expenses" end>
							Manage Expenses
						</NavLink>
					</li>
					<li>
						<NavLink to="/expenses/analysis">Analyze Expenses</NavLink>
					</li>
				</ul>
			</nav>
			<nav className="cta-nav">
				<Form method="post" action="/logout" className="logout-form">
					<button className="cta-alt">Logout</button>
				</Form>
			</nav>
		</header>
	)
}
