import type { ReactNode } from 'react'
import { FaExclamationCircle } from 'react-icons/fa'

type ErrorProps = {
	title: string
	children: ReactNode
}

export default function Error({ title, children }: ErrorProps) {
	return (
		<div className="error">
			<div className="icon">
				<FaExclamationCircle />
			</div>
			<h2>{title}</h2>
			{children}
		</div>
	)
}
