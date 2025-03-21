import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { HeaderAvatar } from './HeaderAvatar';
import { LogoutButton } from '@/ui/logout-button/LogoutButton';
import { LogInButton } from '@/ui/login-button/LogInButton';

export function HeaderProfile() {
	const { isLoggedIn } = useSelector((state: RootState) => state.auth)

	return (
		<div>
			{isLoggedIn
				? (<div className='flex items-center gap-2'>
					<HeaderAvatar />
					<LogoutButton isLoggedIn={isLoggedIn} />
				</div>)
				: (<LogInButton />)
			}
		</div>
	);
}
