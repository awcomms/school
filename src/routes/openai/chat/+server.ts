import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { openai } from '$lib/util/openai';
import { handle_server_error } from '$lib/util/handle_server_error';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const d = await request.json();
		return json(await openai.chat.completions.create(d));
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
