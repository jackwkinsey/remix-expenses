import type { LoaderFunctionArgs } from '@vercel/remix'
import { requireUserSession } from '~/data/auth.server'
import { getExpenses } from '~/data/expenses.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userId: string = await requireUserSession(request)
	return getExpenses(userId)
}
