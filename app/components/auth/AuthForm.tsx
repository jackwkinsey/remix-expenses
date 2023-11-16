import { Form, Link, useNavigation, useSearchParams } from '@remix-run/react'
import { FaLock, FaUserPlus } from 'react-icons/fa'

export default function AuthForm() {
	const navigation = useNavigation()
	const [searchParams] = useSearchParams()
	const authMode = searchParams.get('mode') || 'login'

	const submitButtonCaption = authMode === 'login' ? 'Login' : 'Sign Up'
	const toggleButtonCaption =
		authMode === 'login' ? 'Create a new user' : 'Log in with existing user'
	const toggleMode = authMode === 'login' ? '?mode=signup' : '?mode=login'

	const isSubmitting = navigation.state !== 'idle'

	return (
		<Form method="post" className="form auth-form">
			<div className="icon-img">
				{authMode === 'login' ? <FaLock /> : <FaUserPlus />}
			</div>
			<p>
				<label htmlFor="email">Email Address</label>
				<input type="email" id="email" name="email" required />
			</p>
			<p>
				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" minLength={7} />
			</p>
			<div className="form-actions">
				<button disabled={isSubmitting}>
					{isSubmitting ? 'Authenticating...' : submitButtonCaption}
				</button>
				<Link to={toggleMode}>{toggleButtonCaption}</Link>
			</div>
		</Form>
	)
}
