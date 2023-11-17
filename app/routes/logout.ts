import { json, type ActionFunctionArgs } from '@remix-run/node'
import { destroyUserSession } from '~/data/auth.server'

export const action = ({ request }: ActionFunctionArgs) => {
	if (request.method !== 'POST') {
		throw json({ message: 'Invalid request method' }, { status: 400 })
	}

	return destroyUserSession(request)
}