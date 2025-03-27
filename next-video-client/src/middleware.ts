import type { NextRequest } from 'next/server';
import { STUDIO_PAGE } from './config/studio-page.config';
import { protectStudio } from './server-actions/middlewares/protect-studio.middleware';
import { PUBLIC_PAGE } from './config/public-page.config';
import { protectLoginPages } from './server-actions/middlewares/protect-login.middleware';

export async function middleware(request: NextRequest) {
	const url = new URL(request.url);
	const pathname = url.pathname;

	if (pathname.includes(STUDIO_PAGE.HOME) || pathname.includes(PUBLIC_PAGE.SUBSCRIPTIONS))
		return protectStudio(request);

	if (pathname.includes(PUBLIC_PAGE.AUTH)) return protectLoginPages(request);
}

export const config = {
	matcher: ['/studio/:path*', '/auth/:path*', '/subscriptions/:path*'],
};
