import { user_index } from '$lib/constants/index.js';
import { handle_server_error } from '$lib/util/handle_server_error.js';
import { client } from '$lib/util/redis/index.js';
import { eup } from '$lib/util/user/create/eup.js';
import { hash } from 'argon2';
import { code } from '$lib/util/user/auth/check.js';
import type { Cookies } from '@sveltejs/kit';

const login = ({ cookies, locals, id }: { cookies: Cookies; locals: App.Locals; id: string }) => {
	cookies.set('code', `${code(id)}`, { path: '/' });
	locals.user = id;
};

export const POST = async ({ cookies, request, locals }) => {
	try {
		const { e, u, p } = await request.json();
		if (e) {
			const res = await client.ft.search(user_index, `@u:"${u}"`, {
				LIMIT: { from: 0, size: 1 }
			});
			console.log('new user search res', res);
			if (res.total) return new Response('user already exists', { status: 400 });
			const id = await eup({ e, u, p: await hash(p) });
			const cn = code(id as string);
			login({cookies, locals, id});
			return new Response(id);
		} else {
			const password_hash = await hash(p);
			const res = await client.ft.search(user_index, `@u:"${u}"`, {
				LIMIT: { from: 0, size: 1 },
				RETURN: ['u', 'p']
			});
			if (!res.total) return new Response('user not found');
			const user = res.documents[0].value;
			if (user.value?.p !== password_hash) {
				return new Response('wrong password', { status: 400 });
			}
			login({ cookies, locals, id: user?.id as string });
			return new Response(user.value.u as string);
		}
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
