import { Link } from '@remix-run/react'

export default function Logo() {
	return (
		<h1 className="logo">
			<Link to="/">RemixExpenses</Link>
		</h1>
	)
}
