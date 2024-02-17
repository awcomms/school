import { client } from '..';
import { note_id_prefix, note_index } from '$lib/constants';
import { SchemaFieldTypes, VectorAlgorithms } from 'redis';

export const note = async () => {
	try {
		// await client.ft.dropIndex(note_index)
		console.debug('-notes-all', await client.ft.search(note_index, "*"));
		// console.debug('--all-keys', await client.keys("*"));
		// for (const i of await client.keys(note_id_prefix + "*")) {
		// 	await client.json.del(i);
		// }
		console.debug('-note-keys', await client.keys(note_id_prefix + "*"));
		await client.ft.create(
			note_index,
			{
				'$.v': {
					AS: 'v',
					type: SchemaFieldTypes.VECTOR,
					ALGORITHM: VectorAlgorithms.FLAT,
					TYPE: 'FLOAT32',
					DIM: 3072,
					DISTANCE_METRIC: 'COSINE'
				},
				'$.s': {
					AS: 's',
					type: SchemaFieldTypes.TEXT
				},
				'$.g': {
					AS: 'g',
					type: SchemaFieldTypes.TEXT
				},
				'$.t': {
					AS: 't',
					type: SchemaFieldTypes.TEXT
				},
				'$.y': {
					AS: 'y',
					type: SchemaFieldTypes.TEXT
				}
			},
			{
				ON: 'JSON',
				PREFIX: note_id_prefix,
				NOHL: true
			}
		);
	} catch (e) {
		console.error('redis setup error:', e);
	}
};
