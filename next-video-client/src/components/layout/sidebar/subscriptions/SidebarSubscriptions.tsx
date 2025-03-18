import type { ISidebarSubChannel } from '@/types/sidebar-data.types';
import { SubscriptionItem } from './SubscriptionItem';

interface ISidebarSubscriptionsProps {
	title?: string;
	items: ISidebarSubChannel[];
}

export function SidebarSubscriptions({ items }: ISidebarSubscriptionsProps) {
	return (
		<ul>
			{items.map(item => (
				<SubscriptionItem
					key={item.label}
					item={item}
				/>
			))}
		</ul>
	);
}
