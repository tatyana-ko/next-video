import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface ITitleProps {
	children: ReactNode;
	Icon?: LucideIcon;
}

export function Title({ children, Icon }: ITitleProps) {
	return (
		<div className='flex items-center gap-1 mb-3'>
			{Icon && <Icon color='red' />}
			<h2 className='text-xl font-semibold'>{children}</h2>
		</div>
	);
}
