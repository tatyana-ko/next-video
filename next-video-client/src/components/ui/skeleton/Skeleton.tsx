import type { CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';

interface ISceletonProps {
	quantity: number;
	style?: CSSProperties;
	className?: string;
}

export function Skeleton({ quantity = 1, style, className = '' }: ISceletonProps) {
	return (
		<>
			{Array.from({ length: quantity }).map((_, i) => (
				<div
					key={i}
					className={twMerge('bg-gray-700 rounded-sm h-10 mb-2.5 animate-pulse', className)}
					style={style}
				/>
			))}
		</>
	);
}
