import { note_id_prefix, note_index as index } from '$lib/constants';
import { embed } from '$lib/util/embedding/embed';
import { handle_server_error } from '$lib/util/handle_server_error';
import { client } from '$lib/util/redis';
import { search } from '$lib/util/redis/search';
import { sanitize_string } from '$lib/util/sanitize';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		let { g, t, y, s, c, h } = await request.json();
		// console.debug('args', { g, t, y, s, c, h })
		const v = await embed(JSON.stringify({ grade: g, term: t, year: y, subject: s, content: t }));
		const id = `${note_id_prefix}${await client.incr('last_note_id')}`
		g = sanitize_string(g);
		s = sanitize_string(s);
		y = sanitize_string(y);
		c = sanitize_string(c);
		t = sanitize_string(t);
		h = sanitize_string(h);
		await client.json.set(id, '$', {
			g,
			t,
			y,
			s,
			c,
			h,
			v
		});
		return new Response(id);
	} catch (error) {
		throw handle_server_error(request, error);
	}
};

export const GET: RequestHandler = async ({ url, request }) => {
	try {
		const g = url.searchParams.get('g');
		const t = url.searchParams.get('t');
		const y = url.searchParams.get('y');
		const s = url.searchParams.get('s');
		const q = url.searchParams.get('q');
		const res = await search({
			query: `@g:"${g}" @t:"${t}" @y:"${y}" @s:"${s}" @q:"${q}"`,
			index,
			page: 0
		});
		return json(res);
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
