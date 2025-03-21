import { NextResponse, type NextRequest } from 'next/server';
import { getTokensFromRequest } from './utils/get-tokens-from-request';
import { redirectToLogin } from './utils/redirect-to-login';
import { jwtVerifyServer } from './utils/jwt-verify';

export async function protectStudio(request: NextRequest) {
	const tokens = await getTokensFromRequest(request);

	if (!tokens) return redirectToLogin(request);

	const verifiedData = await jwtVerifyServer(tokens.accessToken);

	if (!verifiedData) return redirectToLogin(request);

	return NextResponse.next();
}
