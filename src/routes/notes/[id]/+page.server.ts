import { handle_server_error } from '$lib/util/handle_server_error';
import { client } from '$lib/util/redis';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, request }) => {
	try {
		const note = await client.json.get(params.id);
        console.debug('note', note)
        if (!note) throw error(404, 'Note not found')
		return note;
	} catch (e) {
		handle_server_error(request, e);
	}
};
