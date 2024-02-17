import { oai } from './oai';

export const embed = (v: string) => oai(v);

export const embed_to_buffer = async (v: string) =>
	Buffer.from(new Float32Array(await oai(v)).buffer);
