'use server';

import { jwtVerify } from 'jose';

interface IToken {
	id: string;
	iat: number;
	exp: number;
}

export async function jwtVerifyServer(accessToken: string) {
	try {
		const { payload }: { payload: IToken } = await jwtVerify(
			accessToken,
			new TextEncoder().encode(`${process.env.JWT_SECRET}`),
		);

		return payload;
	} catch (error) {
		if (error instanceof Error && error.message.includes('exp claim timestammp checkfailed')) {
			console.log('истек токен');
			return null;
		}

		console.log('ошибка при верификации токена');
		return null;
	}
}
